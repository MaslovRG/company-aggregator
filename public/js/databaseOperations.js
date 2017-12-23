const Company = require('../../app/models/company');

function DatabaseOperations()
{
    this.CreateNewUser = function()
    {
        return "1"; 
    }

    this.GetCompaniesById = function(id)
    {
        var company1 = new Company({
            name : 'Facebook'
        }); 
        var company2 = new Company({
            name : 'Apple'
        }); 
        var companies = [company1, company2]; 
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

    this.GetCompaniesByGetId = function(req, res)
    {
        var id = this.GetOrCreateId(req, res); 
        var companies = this.GetCompaniesById(id); 
        return companies; 
    }
}

module.exports = DatabaseOperations; 