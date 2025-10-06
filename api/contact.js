import mongoose from 'mongoose';

// Example Contact schema (customize as needed)
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

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

  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}