const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const DOs = require('../../public/js/databaseOperations'); 
var parser = require('rss-parser');

module.exports = (app) => {
  app.use('/', router);
};


var adress1 = 'http://feeds.feedburner.com/texnomaniya/internet-news';
var adress2 = 'https://news.yandex.ru/computers.rss'; 
var adresses = [adress1, adress2]; 
var countCB = 0; 
var databaseOperations = new DOs(); 

router.get('/', (req, res, next) => {	
  const articles = [new Article(), new Article()];
  var id = req.cookies["id"]; 
  if (!id)
  {
    id = databaseOperations.CreateNewUser(); 
    res.cookie('id', id, { maxAge: 900000, httpOnly: true });
  }

  var news = ""; 
  var countCB = 0; 
  var companies = databaseOperations.GetCompaniesById(id); 
  adresses.forEach(adress => 
    {
      parser.parseURL(adress, function(err, parsed) 
      {
        var HaveCompany; 
        parsed.feed.entries.forEach(function(entry) 
        {
          console.log(entry.title + "\n");
          companies.forEach(company =>
          {
            HaveCompany = entry.title.indexOf(company); 
            if (HaveCompany + 1)
            {
              news += "<p><b>" + entry.title + "</b></p>" + "\n";  
              news += "<p>" + entry.content + "</p>" + "\n"; 
            } 
          })
              
        }); 
        countCB++; 
        if (countCB == adresses.length)
        {
          res.render('index', {
            title: 'Агрегатор компаний',
            articles: articles, 
            news: news
          }); 
        }
      })
      
    });
    
        
});
