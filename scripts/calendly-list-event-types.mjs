// Run locally, once, to find the event type URIs you need for
// CALENDLY_BRONZE_EVENT_TYPE_URI / CALENDLY_SILVER_EVENT_TYPE_URI, and your
// organization URI for CALENDLY_ORGANIZATION_URI.
//
// Usage:
//   CALENDLY_API_TOKEN=your_token_here node scripts/calendly-list-event-types.mjs
//
// Never commit your token or put it in a file that gets pushed — pass it as
// an env var on the command line, or export it in your shell first.

const token = process.env.CALENDLY_API_TOKEN;
if (!token) {
  console.error('Set CALENDLY_API_TOKEN first, e.g.:');
  console.error('  CALENDLY_API_TOKEN=xxxx node scripts/calendly-list-event-types.mjs');
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
  const userUri = me.resource.uri;

  console.log('\nCALENDLY_ORGANIZATION_URI=' + organizationUri);
  console.log('\nEvent types on this account:\n');

  const params = new URLSearchParams({ organization: organizationUri, count: '100' });
  const typesRes = await fetch(`https://api.calendly.com/event_types?${params}`, { headers });
  if (!typesRes.ok) {
    throw new Error(`GET /event_types failed: ${typesRes.status} ${await typesRes.text()}`);
  }
  const types = await typesRes.json();

  for (const t of types.collection) {
    console.log(`  ${t.name}`);
    console.log(`    slug: ${t.slug}`);
    console.log(`    uri:  ${t.uri}`);
    console.log(`    active: ${t.active}`);
    console.log('');
  }

  console.log('Match the "Studio" / "Bronze" / "Silver" event names above to the');
  console.log('right env vars:');
  console.log('  CALENDLY_BRONZE_EVENT_TYPE_URI=<uri of the bronze-session event type>');
  console.log('  CALENDLY_SILVER_EVENT_TYPE_URI=<uri of the silver-session event type>');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
