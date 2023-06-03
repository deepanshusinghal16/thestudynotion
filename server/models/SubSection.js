const mongoose = require('mongoose');

const subSection = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    timeDuration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
    },

});

module.exports = mongoose.model("SubSection", subSection);