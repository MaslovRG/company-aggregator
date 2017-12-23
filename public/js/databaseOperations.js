const Company = require('../../app/models/company');

var company1 = new Company({
    name : 'Facebook'
}); 
var company2 = new Company({
    name : 'Apple'
}); 

var companies = [company1, company2]; 

function DatabaseOperations()
{   
    this.CreateNewUser = function()
    {
        return "1"; 
    }

    this.GetCompaniesById = function(id)
    {        
        return companies; 
    }

    this.GetOrCreateId = function(req, res)
    {
        var id = req.cookies["id"]; 
        if (!id)
        {
            id = this.CreateNewUser(); 
            res.cookie('id', id, { maxAge: 900000, httpOnly: true });
        }
        return id; 
    }

    this.GetCompanies = function(req, res)
    {
        var id = this.GetOrCreateId(req, res); 
        var companies = this.GetCompaniesById(id); 
        return companies; 
    }

    this.AddCompany = function(req, res)
    {
        var tempcompanies = this.GetCompanies(req, res); 
        tempcompanies[tempcompanies.length] = req.body; 
        return companies; 
    }
}

module.exports = DatabaseOperations; 