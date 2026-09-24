// Vercel serverless function — receives Calendly's invitee.created webhook,
// checks whether the booker has already used their weekly session allowance
// for their membership tier, and if so, cancels the new booking and emails
// Sam. Deliberately stateless: no database. Calendly's own /scheduled_events
// API (filtered by invitee_email + date range) is the source of truth for
// "how many sessions has this person already got this week" — querying it
// live avoids ever drifting out of sync with reality (e.g. if someone
// cancels directly inside Calendly's own UI, our count is still correct
// next time, with nothing for us to keep updated).
//
// Tier -> weekly limit is config, not data: each tier is its own Calendly
// event type, so "which event type fired" IS the tier signal. Gold has no
// entry here because it's unlimited — nothing to enforce.

// Default function timeout is 10s, and this handler deliberately sleeps for
// 10s before its last email — give it headroom.
export const config = { maxDuration: 30 };

const TIER_LIMITS = [
  {
    name: 'Bronze',
    eventTypeUri: process.env.CALENDLY_BRONZE_EVENT_TYPE_URI,
    weeklyLimit: 1,
  },
  {
    name: 'Silver',
    eventTypeUri: process.env.CALENDLY_SILVER_EVENT_TYPE_URI,
    weeklyLimit: 3,
  },
];

const CALENDLY_API = 'https://api.calendly.com';

async function verifySignature(rawBody, header, signingKey) {
  if (!header) return false;
  const tMatch = header.match(/(?:^|,)t=(\d+)/);
  const vMatch = header.match(/(?:^|,)v1=([0-9a-f]+)/);
  if (!tMatch || !vMatch) return false;
  const timestamp = tMatch[1];
  const providedSignature = vMatch[1];

  const crypto = await import('node:crypto');
  const expected = crypto
    .createHmac('sha256', signingKey)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('hex');

  if (expected.length !== providedSignature.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(providedSignature, 'hex'))) {
    return false;
  }

  // Reject anything older than 5 minutes — replay protection.
  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  return ageSeconds <= 5 * 60;
}

// Monday 00:00:00 -> next Monday 00:00:00, in UK local time (the business's
// own timezone), expressed as UTC ISO strings for the Calendly API.
function currentWeekBoundsUK() {
  const now = new Date();
  const ukNow = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
  const day = ukNow.getDay(); // 0 = Sunday
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(ukNow);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - diffToMonday);
  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);
  return { minStartTime: monday.toISOString(), maxStartTime: nextMonday.toISOString() };
}

async function countActiveBookingsThisWeek(email, eventTypeUri, apiToken, organizationUri) {
  const { minStartTime, maxStartTime } = currentWeekBoundsUK();
  const params = new URLSearchParams({
    organization: organizationUri,
    invitee_email: email,
    status: 'active',
    min_start_time: minStartTime,
    max_start_time: maxStartTime,
    count: '100',
  });

  const res = await fetch(`${CALENDLY_API}/scheduled_events?${params}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
  if (!res.ok) {
    throw new Error(`Calendly list events failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  // /scheduled_events isn't filterable by event_type server-side, so filter
  // to this tier's event type ourselves.
  return (data.collection || []).filter((event) => event.event_type === eventTypeUri);
}

async function cancelBooking(scheduledEventUri, apiToken, reason) {
  const uuid = scheduledEventUri.split('/').pop();
  const res = await fetch(`${CALENDLY_API}/scheduled_events/${uuid}/cancellation`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) {
    throw new Error(`Calendly cancellation failed: ${res.status} ${await res.text()}`);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Shared HTML shell for outgoing emails, styled to match the site's own
// palette (see tailwind.config.js: fairway/brass/ivory/bone/ink) so these
// read as part of the same brand rather than a generic system email.
function emailShell({ eyebrow, heading, bodyHtml }) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background-color:#EBE6D9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EBE6D9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#F6F3EC;border-radius:12px;overflow:hidden;border:1px solid #E3DED0;">
            <tr>
              <td style="background-color:#0E241C;padding:28px 32px;">
                <img src="https://www.samcraigongolf.com/images/scg-logo-on-dark.png" alt="Sam Craigon Golf" width="140" height="83" style="display:block;width:140px;height:auto;border:0;" />
                <div style="height:2px;width:36px;background-color:#B68A4E;margin-top:14px;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 8px;">
                ${eyebrow ? `<div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#835F35;margin-bottom:14px;">${eyebrow}</div>` : ''}
                <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#1C231F;font-weight:600;">${heading}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 36px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#40483F;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:#EBE6D9;padding:22px 32px;border-top:1px solid #E3DED0;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6E756A;">
                  Sam Craigon Golf · Uphall Golf Club<br />
                  <a href="tel:01506856404" style="color:#835F35;text-decoration:none;">01506 856404</a> ·
                  <a href="mailto:Sam@samcraigongolf.com" style="color:#835F35;text-decoration:none;">Sam@samcraigongolf.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:9px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6E756A;text-transform:uppercase;letter-spacing:0.05em;width:40%;border-bottom:1px solid #E3DED0;">${label}</td>
      <td style="padding:9px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1C231F;border-bottom:1px solid #E3DED0;">${value}</td>
    </tr>`;
}

async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set — skipping notification email');
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.NOTIFICATION_FROM_EMAIL || 'Sam Craigon Golf <onboarding@resend.dev>',
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    console.error('Resend send failed:', res.status, await res.text());
  }
}

function formatBookingTimes(scheduledEvent) {
  const start = new Date(scheduledEvent.start_time);
  const end = new Date(scheduledEvent.end_time);
  const dateLabel = start.toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const startLabel = start.toLocaleString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
  const endLabel = end.toLocaleString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
  return { dateLabel, timeRangeLabel: `${startLabel} – ${endLabel}` };
}

// Sent for every booking that ISN'T auto-cancelled — a lesson, a fitting, a
// Gold/3-Month session, or a Bronze/Silver session still under its weekly
// limit. scheduledEvent.name is Calendly's own event type name ("Bronze
// Studio Session", "Custom Fitting", "On Course Lesson", ...), so this one
// template covers every booking type without needing a name lookup table.
async function sendBookingConfirmationEmail({ scheduledEvent, bookerEmail, bookerName, rescheduleUrl, cancelUrl }) {
  const safeName = escapeHtml(bookerName);
  const eventName = escapeHtml(scheduledEvent.name || 'Session');
  const location = escapeHtml(scheduledEvent.location?.location || 'Uphall Golf Club');
  const { dateLabel, timeRangeLabel } = formatBookingTimes(scheduledEvent);

  await sendEmail({
    to: bookerEmail,
    subject: `Confirmed: ${scheduledEvent.name || 'your session'} on ${dateLabel}`,
    html: emailShell({
      eyebrow: 'Booking confirmed',
      heading: `Your ${eventName} is booked in`,
      bodyHtml: `
        <p style="margin:0 0 20px;">Hi ${safeName},</p>
        <p style="margin:0 0 20px;">Thanks for booking with Sam Craigon Golf — here are your session details.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          ${detailRow('Session', eventName)}
          ${detailRow('Date', dateLabel)}
          ${detailRow('Time', timeRangeLabel)}
          ${detailRow('Location', location)}
        </table>
        <p style="margin:0;">
          Need to make a change?
          ${rescheduleUrl ? `<a href="${escapeHtml(rescheduleUrl)}" style="color:#835F35;text-decoration:none;">Reschedule</a>` : ''}
          ${rescheduleUrl && cancelUrl ? ' · ' : ''}
          ${cancelUrl ? `<a href="${escapeHtml(cancelUrl)}" style="color:#835F35;text-decoration:none;">Cancel</a>` : ''}
        </p>
      `,
    }),
  });
}

export async function POST(request) {
  const rawBody = await request.text();
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  const header = request.headers.get('calendly-webhook-signature');

  if (!signingKey || !(await verifySignature(rawBody, header, signingKey))) {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 403 });
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (body.event !== 'invitee.created') {
    return new Response(JSON.stringify({ ok: true, skipped: 'not invitee.created' }), { status: 200 });
  }

  const payload = body.payload;
  const scheduledEvent = payload?.scheduled_event;
  const bookerEmail = payload?.email;
  const bookerName = payload?.name;

  if (!scheduledEvent || !bookerEmail) {
    return new Response(JSON.stringify({ ok: true, skipped: 'missing payload fields' }), { status: 200 });
  }

  // Bronze/Silver only — Gold, the 3-Month Pass, lessons and fittings have
  // no weekly limit to enforce, so `tier` is null for all of those.
  const tier = TIER_LIMITS.find((t) => t.eventTypeUri && t.eventTypeUri === scheduledEvent.event_type);

  try {
    if (tier) {
      const apiToken = process.env.CALENDLY_API_TOKEN;
      const organizationUri = process.env.CALENDLY_ORGANIZATION_URI;
      if (!apiToken || !organizationUri) {
        console.error('CALENDLY_API_TOKEN or CALENDLY_ORGANIZATION_URI not configured');
        return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
      }

      const activeThisWeek = await countActiveBookingsThisWeek(bookerEmail, tier.eventTypeUri, apiToken, organizationUri);

      if (activeThisWeek.length > tier.weeklyLimit) {
        // Cancel the booking that just came in (this webhook's own event),
        // not an earlier legitimate one.
        await cancelBooking(
          scheduledEvent.uri,
          apiToken,
          `Weekly ${tier.name} membership limit (${tier.weeklyLimit}/week) already reached.`
        );

        const sessionLabel = tier.weeklyLimit > 1 ? `${tier.weeklyLimit} sessions` : '1 session';
        const bookedTime = new Date(scheduledEvent.start_time).toLocaleString('en-GB', {
          timeZone: 'Europe/London',
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
        });
        const safeName = escapeHtml(bookerName);
        const safeEmail = escapeHtml(bookerEmail);
        const alreadyBooked = activeThisWeek.length - 1;

        const samEmail = process.env.SAM_NOTIFICATION_EMAIL || 'Sam@samcraigongolf.com';
        await sendEmail({
          to: samEmail,
          subject: `Booking auto-cancelled — ${bookerName} exceeded ${tier.name} weekly limit`,
          html: emailShell({
            eyebrow: 'Auto-cancellation alert',
            heading: `${safeName} went over their ${tier.name} weekly limit`,
            bodyHtml: `
              <p style="margin:0 0 20px;">A new booking was automatically cancelled because this member had already
              reached their weekly session allowance.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                ${detailRow('Member', safeName)}
                ${detailRow('Email', `<a href="mailto:${safeEmail}" style="color:#835F35;text-decoration:none;">${safeEmail}</a>`)}
                ${detailRow('Membership', tier.name)}
                ${detailRow('Weekly limit', sessionLabel)}
                ${detailRow('Already booked this week', String(alreadyBooked))}
                ${detailRow('Cancelled slot', bookedTime)}
              </table>
              <p style="margin:0;">If this was a mistake, you'll need to rebook it manually.</p>
            `,
          }),
        });

        // Calendly sends its own confirmation email right when the booking is
        // created, and its own cancellation email right when we call the
        // cancellation API above — both outside our control, and both racing
        // against ours. A short delay here just gives Calendly's pair time to
        // land first, so the member reads "confirmed, then cancelled, then
        // here's why" in that order rather than our explanation arriving
        // before Calendly's own confirmation email does.
        await sleep(10_000);

        await sendEmail({
          to: bookerEmail,
          subject: `Your booking on ${bookedTime} has been cancelled`,
          html: emailShell({
            eyebrow: `${tier.name} membership`,
            heading: 'Your booking has been cancelled',
            bodyHtml: `
              <p style="margin:0 0 20px;">Hi ${safeName},</p>
              <p style="margin:0 0 20px;">Your ${tier.name} membership includes <strong>${sessionLabel} per week</strong>,
              and you've already used that allowance for this week. Your new booking below has been automatically
              cancelled to reflect this.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${detailRow('Membership', tier.name)}
                ${detailRow('Weekly allowance', sessionLabel)}
                ${detailRow('Cancelled slot', bookedTime)}
              </table>
              <p style="margin:0 0 20px;">You're welcome to book again from next Monday, or get in touch with Sam
              directly if you think this is a mistake or would like to discuss upgrading your membership.</p>
              <a href="https://www.samcraigongolf.com/membership" style="display:inline-block;padding:12px 24px;background-color:#B68A4E;color:#0E241C;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;">View membership options</a>
            `,
          }),
        });

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
    }

    // Not cancelled — either no weekly limit applies to this event type
    // (Gold, 3-Month Pass, a lesson, a fitting), or it's Bronze/Silver but
    // still under the weekly limit. Either way, send the booking confirmation.
    await sendBookingConfirmationEmail({
      scheduledEvent,
      bookerEmail,
      bookerName,
      rescheduleUrl: payload.reschedule_url,
      cancelUrl: payload.cancel_url,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('calendly-webhook error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}
