const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const DOs = require('../../public/js/databaseOperations'); 

module.exports = (app) => {
    app.use('/', router);
};

var databaseOperations = new DOs(); 

router.get('/companies', (req, res, next) => {	
    var companies = databaseOperations.GetCompaniesByGetId(req, res); 
    
    res.render('companies', {
        title : 'Агрегатор компаний',
        companies : companies
    }); 
});

router.post('/companies', (req, res, next) => {
    databaseOperations.AddCompany(req.body);

    var companies = databaseOperations.GetCompaniesByGetId(req, res); 
    res.render('companies', {
        title : 'Агрегатор компаний',
        companies : companies
    }); 
}); 