import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const key = req.query.key as string;
      if (!key) {
        return res.status(400).json({ error: 'Missing key parameter' });
      }
      const data = await kv.get(key);
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { key, value } = req.body;
      if (!key) {
        return res.status(400).json({ error: 'Missing key in body' });
      }
      await kv.set(key, value);
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { key } = req.body;
      if (!key) {
        return res.status(400).json({ error: 'Missing key in body' });
      }
      await kv.del(key);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Storage API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
