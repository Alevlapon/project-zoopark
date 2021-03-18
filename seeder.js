const mongoose = require('mongoose');
const Animal = require('./models/animal');

mongoose.connect('mongodb://localhost:27017/zoopark', { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  // await Animal.create(
  //   {
  //     name: 'Lev',
  //     info: 'Blablazzzzzzzzzzzzzzzzzzzzzzz',
  //     frontImg:'/images/1616064648440-01'
  //   },

  //   {
  //     name: 'Slon',
  //     info: 'Blabla123123123123123123',
  //     frontImg:'/images/1616063314889-750x485.jpeg'
  //   }
  // )
  let a = await Animal.findOne()
  a.img.push('/images/1616063314889-750x485.jpeg')
  a.img.push('/images/1616064648440-01')
  await a.save()
};

// seed()


