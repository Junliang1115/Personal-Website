import mongoose from 'mongoose';
import Hackathon from '../server/models/Hackathon';

// MongoDB connection utility (reuse connection)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const hackathons = await Hackathon.find({});
    return res.status(200).json(hackathons);
  }

  // Add POST/PUT/DELETE logic as needed
  return res.status(405).json({ error: 'Method not allowed' });
}