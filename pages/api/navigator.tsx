import type { NextApiRequest, NextApiResponse } from 'next'
import { getSiteData } from '../../lib/api/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let navData = await getSiteData();
  res.status(200).json(navData)
}