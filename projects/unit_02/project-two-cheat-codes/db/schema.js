let mongoose = require('mongoose')
var Schema = mongoose.Schema

var ItemSchema = new Schema({
  name: String
})

var UserSchema = new Schema({
  first_name: String,
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date,
  items: [ ItemSchema ]
})

UserSchema.pre('save', function (next) {
  now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})


var UserModel = mongoose.model('User', UserSchema)
var ItemModel = mongoose.model('Item', ItemSchema)

module.exports = {
  User: UserModel,
  Item: ItemModel
}
