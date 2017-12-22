const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'company-aggregator'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/aggregatorDB-development', 
  },

  test: {
    root: rootPath,
    app: {
      name: 'company-aggregator'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/aggregatorDB-test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'company-aggregator'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/aggregatorDB-production',
  }
};

module.exports = config[env];
