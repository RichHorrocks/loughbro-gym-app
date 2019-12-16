const axios = require('axios');
const db = require('./db');
const moment = require('moment');

const url = 'https://lucas.lboro.ac.uk/epublic/wr0055.swipes_json';

const Holywell = require('../models/Holywell');
const Powerbase = require('../models/Powerbase');

const getSwipeCount = async () => {
  console.log('FETCH: Scraping data...');
  const json = await axios.get(url);
  console.log('FETCH: Got data!');

  if (isGymOpen(Date.now())) {
    return { count: json.data, open: true };
  } else {
    return { count: json.data, open: false };
  }
};

const isGymOpen = date => {
  // The gym is open:
  //  * week days, between 06:30 and 22:00
  //  * weekends, between 08:00 and 21:00
  const format = 'hh:mm';
  const now = moment(date);
  let startTime;
  let endTime;

  if (now.day() === 0 || now.day() === 6) {
    startTime = moment('08:00', format);
    endTime = moment('21:00', format);
  } else {
    startTime = moment('06:30', format);
    endTime = moment('22:00', format);
  }

  console.log('GYM IS OPEN?: ', now.isBetween(startTime, endTime, []));

  return now.isBetween(startTime, endTime, []);
};

const runCron = async () => {
  const date = Date.now();

  if (isGymOpen(date)) {
    const { count, open } = await getSwipeCount();
    const dayDate = new Date(date);
    const day = dayDate.getDay();

    // db.get('holywell')
    //   .push({
    //     date,
    //     day,
    //     count: count[0]['holywell']
    //   })
    //   .write();
    // db.get('powerbase')
    //   .push({
    //     date,
    //     day,
    //     count: count[1]['powerbase']
    //   })
    //   .write();
    //
    // console.log('DB: Writing complete!');

    console.log('MONGODB: Writing...');

    try {
      const newEntry = new Holywell({
        day,
        count: count[0]['holywell'],
        date
      });

      const entry = await newEntry.save();
    } catch (err) {
      console.error(err.message);
    }

    try {
      const newEntry = new Powerbase({
        day,
        count: count[1]['powerbase'],
        date
      });

      const entry = await newEntry.save();
    } catch (err) {
      console.error(err.message);
    }

    console.log('MONGODB: Done!');
  }
};

// Invocation required for Heroku Scheduler.
runCron();

module.exports = { getSwipeCount, runCron };
