const Schema = require('../db/schema')
const mongoose = require('mongoose')

const Item = mongoose.model('Item', Schema.ItemSchema)
module.exports = Item
