const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const db = require('./lib/db');
const path = require('path');

const scraperFunctions = require('./lib/scraper');
const utilsFunctions = require('./lib/utils');

const app = express();
app.use(cors());

app.get('/data', async (req, res, next) => {
  const { count, open } = await scraperFunctions.getSwipeCount();
  res.send({ current: count, open: open });
});

app.get('/today', async (req, res, next) => {
  const { holywell, powerbase } = db.value();
  const todayHolywell = utilsFunctions.todayCount(holywell);
  const todayPowerbase = utilsFunctions.todayCount(powerbase);

  res.json({ holywell: todayHolywell, powerbase: todayPowerbase });
});

app.get('/yesterday', async (req, res, next) => {
  const { holywell, powerbase } = db.value();
  const yesterdayHolywell = utilsFunctions.yesterdayCount(holywell);
  const yesterdayPowerbase = utilsFunctions.yesterdayCount(powerbase);

  res.json({ holywell: yesterdayHolywell, powerbase: yesterdayPowerbase });
});

// Serve static assets in production.
if (process.env.NODE_ENV === 'production') {
  // Set static folder.
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// If running in a development environment, start the cron jobs.
if (port === 5000) {
  cron.schedule('*/10 * * * *', () => {
    console.log('Running cron #2');
    scraperFunctions.runCron();
  });
}
