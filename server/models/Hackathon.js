const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    projectname: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    teamname: {
        type: String,
        required: true
    },
    teammate: {
        type: [String],
        required: false
    },
    link: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    corefeature: {
        type: [
            {
                name: String,
                details: String
            }
        ],
        required: false
    },
    techstack: {
        type: Object,
        required: false
    },
    driveUrl: {
        type: String,
        required: false
    },
    youtubeUrl: {
        type: String,
        required: false
    }
}, { collection: 'hackathons' });

const Hackathon = mongoose.model('Hackathons', hackathonSchema);
console.log('Hackathon model is using collection:', Hackathon.collection.name); // Debug log

module.exports = Hackathon;