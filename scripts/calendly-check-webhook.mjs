// Run locally, any time, to see the current state of your webhook
// subscription(s) directly from Calendly's API — no browsing the dashboard
// required. Shows whether the subscription is active and pointed at the
// right URL.
//
// Usage:
//   CALENDLY_API_TOKEN=your_token_here node scripts/calendly-check-webhook.mjs

const token = process.env.CALENDLY_API_TOKEN;
if (!token) {
  console.error('Set CALENDLY_API_TOKEN first, e.g.:');
  console.error('  CALENDLY_API_TOKEN=xxxx node scripts/calendly-check-webhook.mjs');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${token}` };

async function main() {
  const meRes = await fetch('https://api.calendly.com/users/me', { headers });
  if (!meRes.ok) {
    throw new Error(`GET /users/me failed: ${meRes.status} ${await meRes.text()}`);
  }
  const me = await meRes.json();
  const organizationUri = me.resource.current_organization;

  const params = new URLSearchParams({ organization: organizationUri, scope: 'organization', count: '100' });
  const res = await fetch(`https://api.calendly.com/webhook_subscriptions?${params}`, { headers });
  if (!res.ok) {
    throw new Error(`GET /webhook_subscriptions failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();

  if (!data.collection || data.collection.length === 0) {
    console.log('\nNo webhook subscriptions found for this organization.');
    console.log('You need to run calendly-register-webhook.mjs.');
    return;
  }

  console.log(`\n${data.collection.length} webhook subscription(s) found:\n`);
  for (const sub of data.collection) {
    console.log(`  URL:     ${sub.callback_url}`);
    console.log(`  State:   ${sub.state}`);
    console.log(`  Events:  ${sub.events.join(', ')}`);
    console.log(`  Scope:   ${sub.scope}`);
    console.log(`  Created: ${sub.created_at}`);
    console.log(`  URI:     ${sub.uri}`);
    console.log('');
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
