const axios = require("axios");
const cheerio = require("cheerio");
const hdfsConn = require('./hdfsConn.js')
const fs = require('fs'); 

const getHtml = async(params) =>{
    loc = params.loc

    try{
        return [await axios.get("https://www.x-rates.com/table/?amount=1&from="+loc), params];
    } catch(error){
        console.error(error);
    }
 };
 const getCurrency = (params) => {getHtml(params)
    .then(res => {
        html = res[0]
        params = res[1]
        loc = params.loc

        let ulList = [];
        var $ = cheerio.load(html.data);
        var $bodyList = $("div.moduleContent table.tablesorter tbody tr");

        $bodyList.each(function(i, elem) {
            var temp = $(this).find("td:nth-child(1)").text()

            try {
                temp = countryList[temp]
            } catch {
                console.log(temp)
            }
            ulList[i] = { 
                country : loc + "/" + temp,
                rate : $(this).find("td:nth-child(2)").text()
            };
            
        });

        return [ulList, params]
    })
    .then(res => {
        ulList = res[0]
        params = res[1]
        loc = params.loc
        now = params.now
        var excList = {}
        for (var i = 0; i < ulList.length; i++) {
            var cnt = ulList[i].country;
            var rat = ulList[i].rate;

            excList[cnt] = rat;
        }

        fs.writeFileSync('./tmp/'+loc+'.json', JSON.stringify(excList) , function(err) {
            if (err === null) { 
                console.log('success'); } 
            else { 
                console.log('fail'); 
            } 
        });

        hdfsConn.createFile('./tmp/'+loc+'.json', '/data/'+now+'_'+loc+'.json')
    });
}

exports.getCurrency = getCurrency;

var countryList = JSON.parse(fs.readFileSync('./info/currencyList.json','utf8'));