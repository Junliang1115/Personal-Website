// server/index.js
// Main Express server setup
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const contactRoute = require('./contact');
const Hackathon = require('./models/Hackathon'); // Import Hackathon model

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackathondetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB:', mongoose.connection.name);
});

app.use(cors());
app.use(bodyParser.json());

// API route for contact forms
app.use('/api', contactRoute);

// API routes for Hackathons
app.get('/api/hackathons', async (req, res) => {
    try {
        const hackathons = await Hackathon.find();
        res.json(hackathons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/hackathons/:name', async (req, res) => {
    try {
        // Decode URI and replace dashes with spaces for case-insensitive search
        const decodedName = decodeURIComponent(req.params.name);
        const searchName = decodedName.replace(/-/g, ' ');
        const hackathon = await Hackathon.findOne({ name: new RegExp(`^${searchName}$`, 'i') });
        if (!hackathon) return res.status(404).json({ message: 'Hackathon not found' });
        res.json(hackathon);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Server is running.');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
