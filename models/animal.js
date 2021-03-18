const mongoose = require("mongoose");

const animalScheme = new mongoose.Schema({
    name: String,
    info: String,
    img: { type: Array,
          default: []
    }
});

module.exports = mongoose.model('Animal', animalScheme);

