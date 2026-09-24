// Run locally, once, AFTER the /api/calendly-webhook endpoint is deployed
// and live, to register it with Calendly. The signing key is NOT something
// Calendly generates and hands back — it's a secret *we* choose and send to
// Calendly in the request, which Calendly then uses to sign every webhook
// it sends us. This script generates that secret and prints it — copy it
// into Vercel as CALENDLY_WEBHOOK_SIGNING_KEY exactly as printed.
//
// If a webhook subscription already points at the same URL (e.g. from a
// previous run before this signing-key fix), it's deleted first — Calendly
// doesn't support updating an existing subscription's signing key in place.
//
// Usage:
//   CALENDLY_API_TOKEN=your_token_here node scripts/calendly-register-webhook.mjs https://samcraigongolf.com/api/calendly-webhook
//
// Never commit your token or put it in a file that gets pushed — pass it as
// an env var on the command line, or export it in your shell first.

const token = process.env.CALENDLY_API_TOKEN;
const webhookUrl = process.argv[2];

if (!token) {
  console.error('Set CALENDLY_API_TOKEN first, e.g.:');
  console.error('  CALENDLY_API_TOKEN=xxxx node scripts/calendly-register-webhook.mjs <url>');
  process.exit(1);
}
if (!webhookUrl) {
  console.error('Usage: node scripts/calendly-register-webhook.mjs <deployed webhook url>');
  console.error('e.g.:  node scripts/calendly-register-webhook.mjs https://samcraigongolf.com/api/calendly-webhook');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

async function main() {
  const crypto = await import('node:crypto');
  const signingKey = crypto.randomBytes(32).toString('hex');

  const meRes = await fetch('https://api.calendly.com/users/me', { headers });
  if (!meRes.ok) {
    throw new Error(`GET /users/me failed: ${meRes.status} ${await meRes.text()}`);
  }
  const me = await meRes.json();
  const organizationUri = me.resource.current_organization;

  // Clean up any existing subscription pointed at the same URL — Calendly
  // can't update a signing key in place, only replace the whole thing.
  const listRes = await fetch(
    `https://api.calendly.com/webhook_subscriptions?organization=${encodeURIComponent(organizationUri)}&scope=organization&count=100`,
    { headers }
  );
  if (listRes.ok) {
    const list = await listRes.json();
    const existing = (list.collection || []).filter((sub) => sub.callback_url === webhookUrl);
    for (const sub of existing) {
      const delRes = await fetch(sub.uri, { method: 'DELETE', headers });
      if (!delRes.ok) {
        throw new Error(`DELETE ${sub.uri} failed: ${delRes.status} ${await delRes.text()}`);
      }
      console.log(`Removed existing subscription at this URL: ${sub.uri}`);
    }
  }

  const res = await fetch('https://api.calendly.com/webhook_subscriptions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      url: webhookUrl,
      events: ['invitee.created'],
      organization: organizationUri,
      scope: 'organization',
      signing_key: signingKey,
    }),
  });

  if (!res.ok) {
    throw new Error(`POST /webhook_subscriptions failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  console.log('\nWebhook registered successfully.\n');
  console.log('Add this to Vercel as CALENDLY_WEBHOOK_SIGNING_KEY:\n');
  console.log('  ' + signingKey);
  console.log('\nSubscription URI (for reference, not needed as an env var):');
  console.log('  ' + data.resource.uri);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
