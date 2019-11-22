const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const scraperFunctions = require('./lib/scraper');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const count = await scraperFunctions.getSwipeCount();
  res.send(count);
});

app.get('/writeDB', async (req, res) => {
  await scraperFunctions.runCron();
  console.log('Done DB writing!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

cron.schedule('30,40,50 6 * * 1-5', () => {
  console.log('Running cron #1');
  scraperFunctions.runCron();
});

cron.schedule('*/10 7-22 * * 1-5', () => {
  console.log('Running cron #2');
  scraperFunctions.runCron();
});

cron.schedule('*/10 8-21 * * 0,6', () => {
  console.log('Running cron #3');
  scraperFunctions.runCron();
});
