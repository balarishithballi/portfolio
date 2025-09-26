import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const FLAG_SHA256 = process.env.FLAG_SHA256 || '';
const RATE_WINDOW = 30;
const attempts: Record<string, number> = {};

function timingSafeEqualHex(aHex: string, bHex: string) {
  if (!aHex || !bHex) return false;
  const A = Buffer.from(aHex, 'hex');
  const B = Buffer.from(bHex, 'hex');
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  try {
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '');
    const now = Math.floor(Date.now() / 1000);
    if (attempts[ip] && now - attempts[ip] < RATE_WINDOW) {
      return res.status(429).json({ ok: false, message: 'Slow down. Try again later.' });
    }
    attempts[ip] = now;

    const { flag } = req.body || {};
    if (typeof flag !== 'string' || !flag.startsWith('BRB{') || !flag.endsWith('}')) {
      return res.status(400).json({ ok: false, message: 'Invalid format. Use BRB{...}.' });
    }

    const digest = crypto.createHash('sha256').update(flag, 'utf8').digest('hex');
    const ok = timingSafeEqualHex(digest, FLAG_SHA256);
    return res.status(200).json({ ok, message: ok ? 'OK' : 'Incorrect flag.' });
  } catch {
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}
