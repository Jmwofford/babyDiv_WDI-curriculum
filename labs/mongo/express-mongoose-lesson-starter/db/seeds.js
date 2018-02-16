const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/express-mongoose-lesson-starter')

const User = require('../models/user')
const Item = require('../models/item')

// First we clear the database of existing users and items.
Item.remove({}, function (err) {
  console.log(err)
})

User.remove({}, function (err) {
  console.log(err)
})

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

// save the users
danny.save(function (err) {
  if (err) console.log(err)

  console.log('danny created!')
})

jamie.save(function (err) {
  if (err) console.log(err)

  console.log('jamie created!')
})

daniel.save(function (err) {
  if (err) console.log(err)

  console.log('daniel created!')
})
