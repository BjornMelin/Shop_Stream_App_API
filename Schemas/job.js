// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// this will be our data base's data structure 
const JobSchema = new Schema({
  orderDate: {
    type: String,
    // required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  poNum: {
    type: String,
    required: true
  },
  jobNum: {
    type: String,
    required: true
  },
  partNum: {
    type: String,
    // required: true
  },
  orderQuant: {
    type: String,
    // required: true
  },
  recievedQuant: {
    type: String,
    // required: true
  },
  remainingQuant: {
    type: String,
    // required: true
  },
  cycleTime: {
    type: String,
    required: true
  },
  runHours: {
    type: String,
    required: true
  },
  runDays: {
    type: String,
    required: true
  },
  amountTotal: {
    type: String,
    // required: true
  },
  amountPerHour: {
    type: String,
    // required: true
  },
  amountPerUnit: {
    type: String,
    // required: true
  },
  mmeNotes: {
    type: String,
  }
})

// export the new Schema so we could modify it using Node.js
module.exports.Job = mongoose.model("Job", JobSchema);