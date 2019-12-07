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

// Once DB connection has been made, outputs message to console
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));






///////////////////////////////////////////////////////////////////
////////////////////  Customer Functions   ////////////////////////
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



router.get('/getCustomers', async (req, res) => {
  var customers = await Customer.find({}); // finds all in the db
  console.log(customers);
  if (customers == null) return res.json({
    success: false,
    customers: customers.length,
    error: err
  })
  return res.json({
    success: true, 
    amount: customers.length,
    customers: customers
  })
});


router.get('/deleteCustomer', async (req, res) => {
  console.log(req.body);
  Customer.findByIdAndDelete({_id: req.params.id}, function(err, ){
    if(err) res.json(err);
    else res.json('Successfully removed'); // finds all in the db
});
});




///////////////////////////////////////////////////////////////////
////////////////////  Job Functions   /////////////////////////////
///////////////////////////////////////////////////////////////////

router.post('/postJobData', async (req, res) => {
  // console.log(req);
  console.log(req.body);
  const {
    orderDate, dueDate, poNum, jobNum, partNum,
    orderQuant, recievedQuant, remainingQuant,
    cycleTime, runHours, runDays, amountTotal,
    amountPerHour, amountPerUnit, mmeNotes,
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
    mmeNotes,
  });
  const result = newJob.save();
  res.send(result);
});



router.get('/getJobs', async (req, res) => {
  const jobs = await Job.find({}); // finds all in the db
  console.log(jobs);
  if (jobs == null) return res.json({
    success: false,
    jobs: jobs.length,
    error: err
  })
  return res.json({
    success: true, 
    amount: jobs.length,
    jobs: jobs
  })
});



///////////////////////////////////////////////////////////////////
////////////////////  Shift Functions   ///////////////////////////
///////////////////////////////////////////////////////////////////

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



router.get('/getShifts', async (req, res) => {
  console.log(req.body);
  const shifts = await Shift.find({}); // finds all in the db
  console.log(shifts);
  if (shifts == null) return res.json({
    success: false,
    shifts: shifts.length,
    error: err
  })
  return res.json({
    success: true, 
    amount: shifts.length,
    shifts: shifts
  })
});




///////////////////////////////////////////////////////////////////
////////////////////  Part Setup Functions   //////////////////////
///////////////////////////////////////////////////////////////////

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


router.get('/getPartSetups', async (req, res) => {
  const partSetups = await PartSetup.find({}); // finds all in the db
  console.log(partSetups);
  if (partSetups == null) return res.json({
    success: false,
    partSetups: partSetups.length,
    error: err
  })
  return res.json({
    success: true, 
    amount: partSetups.length,
    partSetups: partSetups
  })
});



///////////////////////////////////////////////////////////////////
////////////////////  Inventory Functions   ///////////////////////
///////////////////////////////////////////////////////////////////

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


router.get('/getInventory', async (req, res) => {
  const inventory = await InvMaterial.find({}); // finds all in the db
  console.log(inventory);
  if (inventory == null) return res.json({
    success: false,
    inventory: inventory.length,
    error: err
  })
  return res.json({
    success: true, 
    amount: inventory.length,
    inventory: inventory
  })
});



///////////////////////////////////////////////////////////////////
////////////////////  Inspection Functions   //////////////////////
///////////////////////////////////////////////////////////////////

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



router.get('/getInspections', async (req, res) => {
  const inspections = await Inspection.find({}); // finds all in the db
  console.log(inspections);
  if (inspections == null) return res.json({
    success: false,
    inspections: inspections.length,
    error: err
  })
  return res.json({
    success: true, 
    amount: inspections.length,
    inspections: inspections
  })
});






// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));