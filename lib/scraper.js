const axios = require('axios');
const db = require('./db');

const url = 'https://lucas.lboro.ac.uk/epublic/wr0055.swipes_json';

const getSwipeCount = async () => {
  console.log('Scraping data...');
  const json = await axios.get(url);
  console.log('Got data!');
  return json.data;
};

const runCron = async () => {
  const counts = await getSwipeCount();

  const date = Date.now();
  const dayDate = new Date(date);
  const day = dayDate.getDay();

  db.get('holywell')
    .push({
      date,
      day,
      count: counts[0]['holywell']
    })
    .write();
  db.get('powerbase')
    .push({
      date,
      day,
      count: counts[1]['powerbase']
    })
    .write();

  console.log('DB: Writing complete!');
};

module.exports = { getSwipeCount, runCron };
