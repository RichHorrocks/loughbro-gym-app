const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../../lib/db');
const utilsFunctions = require('../../lib/utils');

const Holywell = require('../../models/Holywell');
const Powerbase = require('../../models/Powerbase');

router.get('/', async (req, res, next) => {
  // Read Holywell data from MongoDB, filtering for today only.
  const yesterday = moment().subtract(1, 'days');
  const day = yesterday.day();
  let yesterdayHolywell;
  let yesterdayPowerbase;

  try {
    console.log('Getting MONGODB entries...');
    yesterdayHolywell = await Holywell.find({ day: day });
  } catch (err) {
    console.error(err.message);
  }

  try {
    console.log('Getting MONGODB entries...');
    yesterdayPowerbase = await Powerbase.find({ day: day });
  } catch (err) {
    console.error(err.message);
  }

  // const { holywell, powerbase } = db.value();
  // const yesterdayHolywell = utilsFunctions.yesterdayCount(holywell);
  // const yesterdayPowerbase = utilsFunctions.yesterdayCount(powerbase);

  res.json({ holywell: yesterdayHolywell, powerbase: yesterdayPowerbase });
});

module.exports = router;
