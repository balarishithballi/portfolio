// /api/kev.js
export const config = { runtime: 'edge' };

export default async function handler() {
  try {
    const r = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json', {
      redirect: 'follow',
      headers: { 'user-agent': 'CyberDaily/1.0 (+https://your-domain.example)' }
    });
    if (!r.ok) {
      return new Response(JSON.stringify({ error: 'CISA KEV unavailable' }), { status: 502, headers: { 'content-type': 'application/json' } });
    }
    const data = await r.json();
    const items = (data?.vulnerabilities || []).slice(0, 50).map(v => ({
      title: `${v.cveID}: ${(v.vendorProject || '')} ${(v.product || '')}`.trim(),
      link: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
      pubDate: v.dateAdded,
      author: 'CISA KEV'
    }));
    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 's-maxage=600, stale-while-revalidate=1800' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
