const express = require('express');
const router = express.Router();
const db = require('../../lib/db');
const utilsFunctions = require('../../lib/utils');

router.get('/', async (req, res, next) => {
  const { holywell, powerbase } = db.value();
  const todayHolywell = utilsFunctions.todayCount(holywell);
  const todayPowerbase = utilsFunctions.todayCount(powerbase);

  res.json({ holywell: todayHolywell, powerbase: todayPowerbase });
});

module.exports = router;
