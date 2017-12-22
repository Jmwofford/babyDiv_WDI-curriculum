const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Use native promises
mongoose.Promise = global.Promise

const ItemSchema = new Schema({
  name: String
})

const UserSchema = new Schema({
  first_name: String,
  email: { type: String, required: true, unique: true },
  items: [ ItemSchema ]
}, {
  timestamps: true
})


module.exports = {
  UserSchema,
  ItemSchema
}
