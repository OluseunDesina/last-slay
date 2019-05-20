const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema({
  Firstname: {type:String, required: true},
  Lastname: {type:String, required: true},
  Email: {type:String, required: true, unique: true},
  Password: {type:String, required: true},
  Address: {type:String},
  Department: {type:String},
  Phone: {type:String},
  ImagePath: {type:String},
  Gender: {type:String},
  Role: {type:Boolean}
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Admin', adminSchema);
