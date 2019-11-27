// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// this will be our data base's data structure 
const InspectionSchema = new Schema({
  inspectDate: {
    type: String,
    // unique: true,
    required: true
  },
  inspectDueDate: {
    type: String,
    required: true
  },
  inspectDesc: {
    type: String,
    // required: true
  },
  jobNum: {
    type: String,
    // required: true
  },
  quantToShip: {
    type: String,
    required: true
  },
  checkedQualGood: {
    type: String,
    // required: true
  },
  checkedQualOkay: {
    type: String,
    // required: true
  },
  checkedQualPoor: {
    type: String,
    // required: true
  },
})

// export the new Schema so we could modify it using Node.js
module.exports.Inspection = mongoose.model("Inspection", InspectionSchema);