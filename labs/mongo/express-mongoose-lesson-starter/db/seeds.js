const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/express-mongoose-lesson-starter')

const User = require('../models/user')
const Item = require('../models/item')

// create new users
const danny = new User({
  first_name: 'Danny',
  email: 'danny@gmail.com',
  items: [ { name: 'Take my bike to the shop for maintenance' } ]
})

const jamie = new User({
  first_name: 'Jamie',
  email: 'jamie@gmail.com',
  items: [ { name: 'Get dry cleaning' } ]
})

const daniel = new User({
  first_name: 'Daniel',
  email: 'daniel@gmail.com',
  items: [ { name: 'Buy more Coke Zero' } ]
})

User.remove()
  .then(() => {
    return danny.save()
  })
  .then(() => {
    return jamie.save()
  })
  .then(() => {
    return daniel.save()
  })
  .then(() => {
    console.log('everyone is saved')
  })
  .catch((err) => {
    console.log(err)
  })
  .then(() => {
    mongoose.connection.close()
  })
