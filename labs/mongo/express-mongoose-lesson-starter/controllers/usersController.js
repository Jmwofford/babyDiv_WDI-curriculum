const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../models/user')
const Item = require('../models/item')

// USERS INDEX ROUTE
router.get('/', (req, res) => {
  User.find().then((users) => {
    res.json(users)

    // res.render('user/show', {
    //   users: users      
    // })
  })
})

// USER SHOW ROUTE
router.get('/:id', (req, res) => {
  const userId = req.params.id
  User.findById(userId).then((user) => {
    res.json(user)
  })
})

// USER
// USER CREATE ROUTE
router.post('/', (req, res) => {
  const newUser = new User({
    first_name: req.body.first_name,
    email: req.body.email
  })

  newUser.save()
    .then((savedUser) => {
      console.log('saved to database')
      res.json(savedUser)
    })
    .catch(err => {
      res.status(500)
      res.send('Error validating User. Please Try Again')
    })
})

// USER UPDATE ROUTE
router.put('/:id', (req, res) => {
  const updated = {
    first_name: req.body.first_name,
    email: req.body.email
  }
  User.findByIdAndUpdate(req.params.id, updated, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser)
    })
    .catch((err) => {
      res.send(err)
    })
})

// USER DESTROY
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).then(() => {
    console.log('Successfully deleted!')
    res.send('Successfully Deleted')
  })
})

module.exports = router
