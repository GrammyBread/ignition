import type { NextApiRequest, NextApiResponse } from 'next'
import { getNavigation } from '../../lib/api/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let navData = await getNavigation();
  res.status(200).json(navData)
}