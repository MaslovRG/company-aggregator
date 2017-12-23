function AdressesOperations()
{
    this.GetAdresses = function()
    {
        var adress1 = 'http://feeds.feedburner.com/texnomaniya/internet-news';
        var adress2 = 'https://news.yandex.ru/computers.rss'; 
        var adresses = [adress1, adress2];
        return adresses; 
    }
}

module.exports = AdressesOperations; 

