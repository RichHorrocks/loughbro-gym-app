const express = require('express');
const router = express.Router();
const db = require('../../lib/db');
const utilsFunctions = require('../../lib/utils');

router.get('/', async (req, res, next) => {
  const { holywell, powerbase } = db.value();
  const yesterdayHolywell = utilsFunctions.yesterdayCount(holywell);
  const yesterdayPowerbase = utilsFunctions.yesterdayCount(powerbase);

  res.json({ holywell: yesterdayHolywell, powerbase: yesterdayPowerbase });
});

module.exports = router;
