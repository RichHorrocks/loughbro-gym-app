const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Set up the DB.
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ holywell: [], powerbase: [] }).write();

module.exports = db;
