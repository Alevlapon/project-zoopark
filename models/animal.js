const mongoose = require("mongoose");

const animalScheme = new mongoose.Schema({
    name: String,
    info: String,
    img: []
});

module.exports = mongoose.model('Animal', animalScheme);
