const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  Firstname: {type:String, required: true},
  Lastname: {type:String, required: true},
  Email: {type:String, required: true, unique: true},
  Password: {type:String, required: true},
  Address: {type:String, required: true},
  Phone_No: {type:String, required: true},
  ImagePath: {type:String, required: true},
  Gender: {type:String, required: true}
  // Date: {type:String}
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
