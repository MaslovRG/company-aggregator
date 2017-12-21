function DatabaseOperations()
{
    this.CreateNewUser = function()
    {
        return "1"; 
    }

    this.GetCompaniesById = function(id)
    {
        var companies = ['Facebook', 'Apple']; 
        return companies; 
    }
}

module.exports = DatabaseOperations; 