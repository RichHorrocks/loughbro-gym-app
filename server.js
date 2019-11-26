const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const db = require('./lib/db');

const scraperFunctions = require('./lib/scraper');

const app = express();
app.use(cors());

app.get('/data', async (req, res, next) => {
  const count = await scraperFunctions.getSwipeCount();
  res.send(count);
});

const todayCount = data => {
  // Reverse the array.
  data.reverse();
  // Get the day number from the last element of the array.
  const day = data[0].day;
  const todayArray = [];

  for (const item of data) {
    if (item.day !== day) {
      break;
    } else {
      todayArray.push(item);
    }
  }
  data.reverse();

  return todayArray.reverse();
};

const yesterdayCount = data => {
  // Reverse the array.
  data.reverse();
  // Get the day number from the last element of the array.
  const day = data[0].day - 1;
  if (day === -1) {
    day = 6;
  }
  const yesterdayArray = [];
  const found = false;

  for (const item of data) {
    if (item.day < day) {
      break;
    } else {
      yesterdayArray.push(item);
    }
  }
  data.reverse();

  return yesterdayArray.reverse();
};

app.get('/today', async (req, res, next) => {
  const { holywell, powerbase } = db.value();
  const todayHolywell = todayCount(holywell);
  const todayPowerbase = todayCount(powerbase);

  res.json({ holywell: todayHolywell, powerbase: todayPowerbase });
});

app.get('/yesterday', async (req, res, next) => {
  const { holywell, powerbase } = db.value();
  const yesterdayHolywell = yesterdayCount(holywell);
  const yesterdayPowerbase = yesterdayCount(powerbase);

  res.json({ holywell: yesterdayHolywell, powerbase: yesterdayPowerbase });
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
