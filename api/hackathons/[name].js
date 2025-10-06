import mongoose from 'mongoose';

// Import your Hackathon model
import Hackathon from '../../server/models/Hackathon';

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectToDatabase();

  const { name } = req.query;

  if (req.method === 'GET') {
    // Find hackathon by name (case-insensitive)
    const hackathon = await Hackathon.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (!hackathon) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(hackathon);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}