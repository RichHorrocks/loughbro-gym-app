const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');

const current = require('./routes/api/current');
const today = require('./routes/api/today');
const yesterday = require('./routes/api/yesterday');

const scraperFunctions = require('./lib/scraper');

const app = express();
app.use(cors());

app.use('/api/current', current);
app.use('/api/today', today);
app.use('/api/yesterday', yesterday);

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
