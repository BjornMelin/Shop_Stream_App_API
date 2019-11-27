// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ShiftSchema = new Schema({
  jobNum: {
    type: String,
    unique: true,
    required: true
  },
  buttonToButtonTime: {
    type: String,
    // required: true
  },
  partsSampled: {
    type: String,
    // required: true
  },
  orderDate: {
    type: String,
    required: true
  },
  shiftNotes: {
    type: String,
    // required: true
  },
})

// export the new Schema so we could modify it using Node.js
module.exports.Shift = mongoose.model("Shift", ShiftSchema);