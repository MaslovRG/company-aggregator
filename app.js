

const express = require('express');
const config = require('./config/config');;

const app = express();

var mongoose = require('mongoose');
mongoose.connect(config.db, {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});
require("./app/models/user");

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

