const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: String
})

const UserSchema = new Schema({
  first_name: String,
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date,
  items: [ ItemSchema ]
}, {
  timestamps: true
})

module.exports = {
  UserSchema,
  ItemSchema
}
