const Company = require('../models/company');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var User = mongoose.model('User');

var company1 = new Company({
    name : 'Facebook'
}); 
var company2 = new Company({
    name : 'Apple'
}); 

var companies = [company1, company2]; 

function DatabaseOperations()
{   
    this.GetOrCreateId = function(req, res, callback)
    {
        var id = req.cookies["id"]; 
        if (!id)
        {
            this.CreateNewUser(function(id){
                res.cookie('id', id, { maxAge: 900000, httpOnly: true });
                callback(id); 
            });             
        }
        else
        {
            callback(id); 
        }
        
    }

    this.CreateNewUser = function(callback)
    {
        var ncompanies = [];
        var index; 
        for (index = 0; index < companies.length; index++)
        {
            ncompanies[ncompanies.length] = new Company({ name : companies[index].name}); 
        } 
        var ou = new Object({
            companies : ncompanies
        }); 
        var user = new User(ou); 

        user.save(function (err) {
            if (err)
                console.log(err);
            else
            {
                console.log(user._id + ' was written to db');
                var nid = user._id.toString(); 
                callback(nid); 
            }
        }); 
    }

    this.GetUser = function(id, callback)
    {
        User.findById(id, function(err, user){
            if (!err)
            {
                callback(user); 
            }            
        }); 
    }

    this.GetCompanies = function(id, callback)
    {               
        User.findById(id, function(err, user){
            if (!err)
            {
                var ncompanies = user.companies; 
                callback(ncompanies); 
            }            
        }); 
    }

    this.AddCompany = function(id, company, callback)
    {
        this.GetUser(id, function(user){  
            var isAdd = true; 
            var index; 
            for (index = 0; index < user.companies.length && isAdd; index++)
            {
                isAdd = (company.name != user.companies[index].name); 
            }            
            if (isAdd)
            {
                user.companies[user.companies.length] = new Company({ name: company.name});                         
                user.save((err, updateUser) => {
                    callback(updateUser.companies);
                });
            }
            else
                callback(user.companies);                           
        });  
    }

    this.DeleteCompany = function(id, companyName, callback)
    {
        this.GetUser(id, function(user){     
            var index;       
            for (index = user.companies.length - 1; index >= 0; index--)
            {
                if (user.companies[index].name == companyName)
                {
                    user.companies.splice(index, 1); 
                }
            }                       
            user.save((err, updateUser) => {
                callback();
            });              
        });  
    }
}

module.exports = DatabaseOperations; 