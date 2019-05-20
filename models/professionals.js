const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const professionalSchema = mongoose.Schema({
  Firstname: {type:String, required: true},
  Lastname: {type:String, required: true},
  Email: {type:String, required: true, unique: true},
  Password: {type:String, required: true},
  Address: {type:String},
  Phone_No: {type:String},
  ImagePath: {type:String},
  Gender: {type:String},
  isProfessional: {type: Boolean}

  /*,
  Business_Name: {type:String, required: true},
  Business_Category: {type:String, required: true}*/
  
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

professionalSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Professional', professionalSchema);
