const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/express-mongoose-lesson-starter', {
  useMongoClient: true
})

const User = require('../models/user')
const Item = require('../models/item')

// Use native promises
mongoose.Promise = global.Promise

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

// First we clear the database of existing users and items.
Item.remove()
  .then(() => {
    return User.remove()
  }).then(() => {
    return danny.save()
  })
  .then((user) => {
    console.log('danny is saved')
    return jamie.save()
  })
  .then((user) => {
    console.log('jamie is saved')
    return daniel.save()
  })
  .then((user) => {
    console.log('daniel is saved')
    console.log('all users are saved')
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })

// // save the users
