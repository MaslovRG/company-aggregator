const express = require('express');
const router = express.Router();
const Company = require('../models/company');

module.exports = (app) => {
    app.use('/company', router);
};

