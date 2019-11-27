// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



// this will be our data base's data structure 
const InvMaterialSchema = new Schema({
  materialName: {
    type: String,
    // unique: true,
    required: true
  },
  materialType: {
    type: String,
    required: true
  },
  checkedMaterial: {
    type: String,
    // required: true
  },
  checkedTool: {
    type: String,
    // required: true
  },
  matQuantity: {
    type: String,
    required: true
  },
  amtPerItem: {
    type: String,
    // required: true
  },
  itemLenFeet: {
    type: String,
    // required: true
  },
  itemLenInch: {
    type: String,
    // required: true
  },
  itemWidthFeet: {
    type: String,
    // required: true
  },
  itemWidthInch: {
    type: String,
    // required: true
  },
  itemHtFeet: {
    type: String,
    // required: true
  },
  itemHtInch: {
    type: String,
    // required: true
  },
  mmeNotes: {
    type: String,
    // required: true
  },
})

// export the new Schema so we could modify it using Node.js
module.exports.InvMaterial = mongoose.model("InvMaterial", InvMaterialSchema);