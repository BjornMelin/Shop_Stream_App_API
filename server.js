const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { Customer } = require('./Schemas/customer');
const { Job } = require('./Schemas/job');



const API_PORT = 4000;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb://127.0.0.1:27017/AppData';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));




router.post('/postCustData', async (req, res) => {
  // console.log(req);
  console.log(req.body);
  const {
    nameFirst, nameLast, companyName, email, phoneNum,
  } = req.body;
  let newCust = new Customer({
    nameFirst,
    nameLast,
    companyName,
    email,
    phoneNum,
  });
  const result = newCust.save();
  res.send(result);
});



router.post('/postJobData', async (req, res) => {
  // console.log(req);
  console.log(req.body);
  const {
    orderDate, dueDate, poNum, jobNum, partNum,
    orderQuant, recievedQuant, remainingQuant,
    cycleTime, runHours, runDays, amountTotal,
    amountPerHour, amountPerUnit,
  } = req.body;
  let newJob = new Job({
    orderDate, 
    dueDate, 
    poNum, 
    jobNum, 
    partNum,
    orderQuant, 
    recievedQuant, 
    remainingQuant,
    cycleTime, 
    runHours, 
    runDays, 
    amountTotal,
    amountPerHour, 
    amountPerUnit,
  });
  const result = newJob.save();
  res.send(result);
});



// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));