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
  created_at: Date,
  updated_at: Date,
  items: [ ItemSchema ]
})

UserSchema.pre('save', function (next) {
  const now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = {
  UserSchema,
  ItemSchema
}
