// Run locally, once, AFTER the /api/calendly-webhook endpoint is deployed
// and live, to register it with Calendly. Calendly hands back a signing key
// in the response — copy that into Vercel as CALENDLY_WEBHOOK_SIGNING_KEY.
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
  const meRes = await fetch('https://api.calendly.com/users/me', { headers });
  if (!meRes.ok) {
    throw new Error(`GET /users/me failed: ${meRes.status} ${await meRes.text()}`);
  }
  const me = await meRes.json();
  const organizationUri = me.resource.current_organization;

  const res = await fetch('https://api.calendly.com/webhook_subscriptions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      url: webhookUrl,
      events: ['invitee.created'],
      organization: organizationUri,
      scope: 'organization',
    }),
  });

  if (!res.ok) {
    throw new Error(`POST /webhook_subscriptions failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  console.log('\nWebhook registered successfully.\n');
  console.log('Add this to Vercel as CALENDLY_WEBHOOK_SIGNING_KEY:\n');
  console.log('  ' + data.resource.signing_key);
  console.log('\nSubscription URI (for reference, not needed as an env var):');
  console.log('  ' + data.resource.uri);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
