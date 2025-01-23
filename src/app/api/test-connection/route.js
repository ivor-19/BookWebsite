import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ message: 'MongoDB connection successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to MongoDB', details: error.message });
  }
}