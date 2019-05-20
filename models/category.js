const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  description: {type:String, unique: true}
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

categorySchema.plugin(uniqueValidator);
module.exports = mongoose.model('Category', categorySchema);
