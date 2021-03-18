const mongoose = require('mongoose');
const Animal = require('./animal');

mongoose.connect('mongodb://localhost:27017/zoopark', { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  await Animal.create({})
};

// seed()


