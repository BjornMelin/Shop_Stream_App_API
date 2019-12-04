const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { Customer } = require('./Schemas/customer');
const { Job } = require('./Schemas/job');
const { Shift } = require('./Schemas/shift');
const { PartSetup } = require('./Schemas/partSetup');
const { InvMaterial } = require('./Schemas/invMaterial');
const { Inspection } = require('./Schemas/inspection');



const API_PORT = 4000;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb://127.0.0.1:27017/AppData';

// connects our back end code with the database
mongoose.connect(dbRoute, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false 
});
let db = mongoose.connection;

// // connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

// let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));



///////////////////////////////////////////////////////////////////
////////////////////  POST Functions   ////////////////////////////
///////////////////////////////////////////////////////////////////

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


router.post('/postShiftData', async (req, res) => {
  // console.log(req);
  console.log(req.body);
  const {
    jobNum, buttonToButtonTime, partsSampled, 
    orderDate, shiftNotes,
  } = req.body;
  let newShift = new Shift({
    jobNum,
    buttonToButtonTime,
    partsSampled,
    orderDate,
    shiftNotes,
  });
  const result = newShift.save();
  res.send(result);
});


router.post('/postPartSetupData', async (req, res) => {
  // console.log(req);
  console.log(req.body);
  const {
    buttonToButtonTime, partDesc, machineTime, toolNotes,
    viceNotes, Scrap, scrapQuant, scrapTypes,
  } = req.body;
  let newPartSetup = new PartSetup({
    buttonToButtonTime,
    partDesc,
    machineTime,
    toolNotes,
    viceNotes,
    Scrap,
    scrapQuant,
    scrapTypes,
  });
  const result = newPartSetup.save();
  res.send(result);
});


router.post('/postInvMaterialData', async (req, res) => {
  // console.log(req);
  console.log(req.body);
  const {
    materialName, materialType, checkedMaterial, checkedTool,
    matQuantity, amtPerItem, itemLenFeet, itemLenInch,
    itemWidthFeet, itemWidthInch, itemHtFeet, itemHtInch,
    mmeNotes,
  } = req.body;
  let newInvMaterial = new InvMaterial({
    materialName,
    materialType,
    checkedMaterial,
    checkedTool,
    matQuantity,
    amtPerItem,
    itemLenFeet,
    itemLenInch,
    itemWidthFeet,
    itemWidthInch,
    itemHtFeet,
    itemHtInch,
    mmeNotes,
  });
  const result = newInvMaterial.save();
  res.send(result);
});




router.post('/postInspectData', async (req, res) => {
  // console.log(req);
  console.log(req.body);
  const {
    inspectDate, inspectDueDate, inspectDesc, jobNum,
    quantToShip, checkedQualGood, checkedQualOkay,
    checkedQualPoor,
  } = req.body;
  let newInspection = new Inspection({
    inspectDate,
    inspectDueDate,
    inspectDesc,
    jobNum,
    quantToShip,
    checkedQualGood,
    checkedQualOkay,
    checkedQualPoor,
  });
  const result = newInspection.save();
  res.send(result);
});




///////////////////////////////////////////////////////////////////
////////////////////  GET Functions   /////////////////////////////
///////////////////////////////////////////////////////////////////


router.get('/getCustomers', async (req, res) => {
  console.log(req.body);
  const customers = await Customer.find({}); // finds all in the db
  console.log(customers);
  res.send(customers);
});


router.get('/getInventory', async (req, res) => {
  console.log(req.body);
  const inventory = await InvMaterial.find({}); // finds all in the db
  console.log(inventory);
  res.send(inventory);
});


router.get('/getInspections', async (req, res) => {
  console.log(req.body);
  const inspections = await Inspection.find({}); // finds all in the db
  console.log(inspections);
  res.send(inspections);
});


router.get('/getJobs', async (req, res) => {
  console.log(req.body);
  const jobs = await Job.find({}); // finds all in the db
  console.log(jobs);
  res.send(jobs);
});


router.get('/getPartSetups', async (req, res) => {
  console.log(req.body);
  const partSetups = await PartSetup.find({}); // finds all in the db
  console.log(partSetups);
  res.send(partSetups);
});



router.get('/getShifts', async (req, res) => {
  console.log(req.body);
  const shifts = await Shift.find({}); // finds all in the db
  console.log(shifts);
  res.send(shifts);
});





///////////////////////////////////////////////////////////////////
////////////////////  UPDATE Functions   //////////////////////////
///////////////////////////////////////////////////////////////////



// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));