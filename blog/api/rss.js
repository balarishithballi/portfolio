// /api/rss.js
import { XMLParser } from 'fast-xml-parser';

export const config = { runtime: 'edge' }; // fast and scalable

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    if (!url) {
      return new Response(JSON.stringify({ error: 'missing url' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const upstream = await fetch(url, {
      headers: { 'user-agent': 'CyberDaily/1.0 (+https://your-domain.example)' },
      redirect: 'follow',
    });
    if (!upstream.ok) {
      return new Response(JSON.stringify({ error: 'upstream ' + upstream.status }), { status: upstream.status, headers: { 'content-type': 'application/json' } });
    }
    const xml = await upstream.text();

    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const data = parser.parse(xml);

    let items = [];
    if (data?.rss?.channel?.item) {
      items = data.rss.channel.item;
    } else if (data?.feed?.entry) {
      items = data.feed.entry;
    }

    const mapped = (Array.isArray(items) ? items : [items]).filter(Boolean).map(it => {
      const title = it.title?.['#text'] || it.title || '';
      let link = '';
      if (typeof it.link === 'string') link = it.link;
      else if (Array.isArray(it.link)) link = it.link[0]?.href || it.link[0]?.['#text'] || '';
      else if (it.link?.href) link = it.link.href;
      else link = it.guid?.['#text'] || it.guid || '';
      const date = it.pubDate || it.published || it.updated || it['dc:date'] || '';
      const author = it.author?.name || it.author || it['dc:creator'] || '';
      return { title, link, pubDate: date, author };
    });

    return new Response(JSON.stringify({ items: mapped }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 's-maxage=300, stale-while-revalidate=600',
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
