const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../models/user')
const Item = require('../models/item')

// Get All Items
router.get('/', (req, res) => {
  console.log(req.params.userId)
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user.items)
    })
    .catch(err => {
      res.send(err)
    })
})

// ADD A NEW ITEM
router.post('/', (req, res) => {
  const newItem = new Item({ name: req.body.name })
  User.findById(req.params.userId)
    .then((user) => {
      user.items.push(newItem)
      return user.save()
    })
    .then((savedUser) => {
      res.json(savedUser)
    })
    .catch(err => {
      res.send(err)
    })
})

// REMOVE AN ITEM
router.delete('/:id', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      const itemToDelete = req.params.id
      user.items.id(itemToDelete).remove()
      return user.save()
    })
    .then(savedUser => {
      res.json(savedUser)
    })
})

module.exports = router
