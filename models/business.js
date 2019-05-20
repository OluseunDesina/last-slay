const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const businessSchema = mongoose.Schema({
  Name: {type:String, required: true},
  Description: {type:String, required: true},
  ProfessionalId: {type: mongoose.Schema.Types.ObjectId, ref: "Professional", required: true, unique: true},
  CategoryId1: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
  CategoryId2: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  CategoryId3: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
  BusinessAddress: {type:String},
  Phone: {type:String},
  ImagePath: {type:String}
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

businessSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Business', businessSchema);