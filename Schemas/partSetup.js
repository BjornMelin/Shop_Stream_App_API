// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// this will be our data base's data structure 
const PartSetupSchema = new Schema({
  buttonToButtonTime: {
    type: String,
    unique: true,
    required: true
  },
  partDesc: {
    type: String,
    // required: true
  },
  machineTime: {
    type: String,
    // required: true
  },
  toolNotes: {
    type: String,
    required: true
  },
  viceNotes: {
    type: String,
    // required: true
  },
  Scrap: {
    type: String,
    // required: true
  },
  scrapQuant: {
    type: String,
    // required: true
  },
  scrapTypes: {
    type: String,
    // required: true
  },
})

// export the new Schema so we could modify it using Node.js
module.exports.PartSetup = mongoose.model("PartSetup", PartSetupSchema);