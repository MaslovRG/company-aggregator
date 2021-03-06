const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const DOs = require('../operations/databaseOperations'); 

module.exports = (app) => {
    app.use('/', router);
};

var databaseOperations = new DOs(); 

router.get('/companies', (req, res, next) => {	
    databaseOperations.GetOrCreateId(req, res, (id) => 
    {
        databaseOperations.GetCompanies(id, (companies) => {
            res.render('companies', {
                title : 'Агрегатор компаний',
                companies : companies
            }); 
        });   
    }); 
});

router.post('/companies', (req, res, next) => {
    databaseOperations.GetOrCreateId(req, res, (id) =>
    {
        databaseOperations.AddCompany(id, req.body, (companies) => {
            res.render('companies', {
                title : 'Агрегатор компаний',
                companies : companies
            }); 
        });
    });   
}); 

router.get('/companies/delete/:companyName', (req, res, next) => 
{
    res.render('companydelete', {
        title : 'Агрегатор компаний',
        companyName : req.params.companyName
    });     
});

router.post('/companies/delete/:companyName', (req, res, next) =>
{
    var companyName = req.params.companyName; 
    
    databaseOperations.GetOrCreateId(req, res, (id) =>
    {
        databaseOperations.DeleteCompany(id, companyName, () =>
        {
            res.redirect('/companies');
        }); 
    });     
});