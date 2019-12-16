const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../../lib/db');
const utilsFunctions = require('../../lib/utils');

const Holywell = require('../../models/Holywell');
const Powerbase = require('../../models/Powerbase');

router.get('/', async (req, res, next) => {
  // Read Holywell data from MongoDB, filtering for today only.
  const now = moment();
  const day = now.day();
  let todayHolywell;
  let todayPowerbase;

  try {
    console.log('Getting MONGODB entries...');
    todayHolywell = await Holywell.find({ day: day });
  } catch (err) {
    console.error(err.message);
  }

  try {
    console.log('Getting MONGODB entries...');
    todayPowerbase = await Powerbase.find({ day: day });
  } catch (err) {
    console.error(err.message);
  }

  //const { holywell, powerbase } = db.value();
  //const todayHolywell = utilsFunctions.todayCount(holywell);
  //const todayPowerbase = utilsFunctions.todayCount(powerbase);

  res.json({ holywell: todayHolywell, powerbase: todayPowerbase });
});

module.exports = router;
