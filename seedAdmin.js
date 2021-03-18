const mongoose = require('mongoose')
const Admin = require('./models/admin')

mongoose.connect('mongodb://localhost:27017/zoopark', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

async function seed() {
  await Admin.create({
    login: "bear",
    password: '2021'
  })

}

// seed()
