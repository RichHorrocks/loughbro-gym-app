const db = require('./config/db');
const scraper = require('./lib/scraper');

// Connect to the database and run our scraper.
db.connectDB(() => scraper.runCron(() => db.disconnectDB()));
