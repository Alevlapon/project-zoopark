const mongoose = require("mongoose");

const tarifScheme = new mongoose.Schema({
  big2: String,
  big5: String,
  child2: String,
  child5: String
});

module.exports = mongoose.model('Tarif', tarifScheme);
