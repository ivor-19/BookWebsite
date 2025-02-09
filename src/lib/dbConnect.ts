import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI');
}

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
      throw new Error('Failed to connect to MongoDB');
    } else {
      console.error('An unknown error occurred while connecting to MongoDB');
      throw new Error('Failed to connect to MongoDB');
    }
  }
}

export default dbConnect;
