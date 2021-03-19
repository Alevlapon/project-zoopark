module.exports = (app) => {
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/zoopark', { useNewUrlParser: true, useUnifiedTopology: true });
};
