const express = require('express');
const router = express.Router();
const scraperFunctions = require('../../lib/scraper');

router.get('/', async (req, res, next) => {
  const { count, open } = await scraperFunctions.getSwipeCount();
  res.send({ current: count, open: open });
});

module.exports = router;
