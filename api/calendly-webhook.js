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

  const tier = TIER_LIMITS.find((t) => t.eventTypeUri && t.eventTypeUri === scheduledEvent.event_type);
  if (!tier) {
    // Not a Bronze/Silver session (could be Gold, a fitting, a lesson, etc.)
    // — no weekly limit to enforce.
    return new Response(JSON.stringify({ ok: true, skipped: 'no tier limit for this event type' }), { status: 200 });
  }

  const apiToken = process.env.CALENDLY_API_TOKEN;
  const organizationUri = process.env.CALENDLY_ORGANIZATION_URI;
  if (!apiToken || !organizationUri) {
    console.error('CALENDLY_API_TOKEN or CALENDLY_ORGANIZATION_URI not configured');
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
  }

  try {
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
      const bookedTime = new Date(scheduledEvent.start_time).toLocaleString('en-GB', { timeZone: 'Europe/London' });

      const samEmail = process.env.SAM_NOTIFICATION_EMAIL || 'Sam@samcraigongolf.com';
      await sendEmail({
        to: samEmail,
        subject: `Booking auto-cancelled — ${bookerName} exceeded ${tier.name} weekly limit`,
        html: `
          <p><strong>${bookerName}</strong> (${bookerEmail}) tried to book another ${tier.name} studio session
          this week, on top of ${activeThisWeek.length - 1} already booked.</p>
          <p>Their ${tier.name} membership allows <strong>${sessionLabel} per week</strong>,
          so the new booking (${bookedTime}) was automatically cancelled.</p>
          <p>If this was a mistake, you'll need to rebook it manually.</p>
        `,
      });

      await sendEmail({
        to: bookerEmail,
        subject: `Your booking on ${bookedTime} has been cancelled`,
        html: `
          <p>Hi ${bookerName},</p>
          <p>Your ${tier.name} membership includes <strong>${sessionLabel} per week</strong>, and you've already
          used that allowance for this week. Your new booking for <strong>${bookedTime}</strong> has been
          automatically cancelled to reflect this.</p>
          <p>You're welcome to book again from next Monday, or get in touch with Sam directly if you think
          this is a mistake or would like to discuss upgrading your membership.</p>
          <p>Sam Craigon Golf<br />
          <a href="tel:01506856404">01506 856404</a> ·
          <a href="mailto:Sam@samcraigongolf.com">Sam@samcraigongolf.com</a></p>
        `,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('calendly-webhook error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}
