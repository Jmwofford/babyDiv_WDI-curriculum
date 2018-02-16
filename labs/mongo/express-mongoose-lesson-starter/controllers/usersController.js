const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Item = require('../models/item')

// USERS INDEX ROUTE
router.get('/', (req, res) => {

  // Use mongoose to find all users in our database
  User.find().then((users) => {

    // Once users have been found, then send JSON object to Client
    res.send(users)
  })

})

// USER SHOW ROUTE
router.get('/:id', (req, res) => {

  // Find the _id of the user we want to return (in router params)
  const userId = req.params.id

  // Use the _id to search for a specific User in our DB
  User.findById(userId)
    .then((user) => {

      // Once that user is found, send the object with user data to client
      res.send(user)
    })
})

// USER CREATE ROUTE
router.post('/', (req, res) => {

  // Get information about the new user from req
  // req.body will give us info from user
  const newUserInfo = req.body

  // Create the user using information from req.body
  const user = new User(newUserInfo)

  // after user is saved, redirect to /:id of new user
  user.save().then((savedUser) => {
    res.send(savedUser)
  }).catch((err) => {
    res.send(err)
  })
})

// USER UPDATE ROUTE
router.patch('/:id', (req, res) => {

  // Use data from req.body to update user at req.params.id
  User.findByIdAndUpdate(req.params.id, {
    first_name: req.body.first_name,
    email: req.body.email
  }, { new: true }).then((user) => {

    // once we update the user, send the updated user
    res.send(user)
  }).catch(err => {
    res.send(err)
  })

})

// USER DESTROY
router.delete('/:id', (req, res) => {

  // Get the users id and trigger a delete
  User.findByIdAndRemove(req.params.id).then(() => {

    // once delete is successful, then send a message
    res.send('Successfully Deleted')
  }).catch((err) => {
    res.send(err)
  })

})

// ADD A NEW ITEM
router.post('/:userId/items', (req, res) => {

  // User userId to find a specific user
  User.findById(req.params.userId).then((user) => {
    const newItem = new Item({ name: req.body.name })

    // after we find user, push a new item user.item
    user.items.push(newItem)

    // save user with new item
    return user.save()
  }).then((updatedUser) => {

    // return the user
    res.send(updatedUser)
  })
})

// REMOVE AN ITEM
router.delete('/:userId/items/:id', (req, res) => {

  // Find the user by req.params.userId 
  User.findById(req.params.userId).then((user) => {

    // Once we find the user, find the item the matches req.params.id    
    // Once we find that item, remove it from the array
    user.items.id(req.params.id).remove()

    // Save the user
    return user.save()
  }).then((savedUser) => {

    // Send user to client
    res.send(savedUser)
  })
})

module.exports = router
