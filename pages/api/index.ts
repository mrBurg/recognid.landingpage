import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    fs.appendFile('logs/formRequests.txt', JSON.stringify(req.body), (err) =>
      err
        ? res.status(500).json({ status: 'error' })
        : res.status(200).json({ status: 'ok' })
    );
  } catch (err) {
    res.status(500).json({ status: 'error' });
  }
}
