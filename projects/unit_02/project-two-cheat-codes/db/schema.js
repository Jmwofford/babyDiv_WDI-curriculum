let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ItemSchema = new Schema({
  name: String
})

let UserSchema = new Schema({
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


let UserModel = mongoose.model('User', UserSchema)
let ItemModel = mongoose.model('Item', ItemSchema)

module.exports = {
  User: UserModel,
  Item: ItemModel
}
