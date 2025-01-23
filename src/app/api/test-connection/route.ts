import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await dbConnect();
    res.status(200).json({ message: 'MongoDB connection successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to MongoDB', details: (error as Error).message });
  }
}
