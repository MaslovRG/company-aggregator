const express = require('express');
const router = express.Router();
const News = require('../models/news');
const DOs = require('../../public/js/databaseOperations'); 
const AOs = require('../../public/js/adressesOperations'); 
var parser = require('rss-parser');

module.exports = (app) => {
  app.use('/', router);
};

var adressesOperations = new AOs(); 
var adresses = adressesOperations.GetAdresses();  
var databaseOperations = new DOs(); 

router.get('/', (req, res, next) => {	
  var news = []; 
  //var id = databaseOperations.GetOrCreateId(req, res); 

  var countCB = 0; 
  //var companies = databaseOperations.GetCompaniesById(id); 
  var companies = databaseOperations.GetCompaniesByGetId(req, res); 
  adresses.forEach(adress => 
    {
      parser.parseURL(adress, function(err, parsed) 
      {
        var HaveCompany; 
        parsed.feed.entries.forEach(function(entry) 
        {
          companies.forEach(company =>
          {
            HaveCompany = entry.title.indexOf(company.name); 
            if (HaveCompany + 1)
            {
              news[news.length] = new News({
                title: entry.title, 
                content: entry.content
              })
            } 
          })              
        }); 
        countCB++; 
        if (countCB == adresses.length)
        {
          res.render('index', {
            title: 'Агрегатор компаний',
            news: news
          }); 
        }
      })
      
    });
    
        
});
