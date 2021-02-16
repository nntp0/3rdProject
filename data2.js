var https = require('https');
var fs = require('fs');
const address = 'https://api.exchangeratesapi.io/latest?base=KRW';

https.get(address,function(res){
   var currentData = '';
    res.on('data',function(chunk){
        currentData +=chunk;
    });

    res.on('end',function(){
        const jData = JSON.stringify(currentData); 
        fs.writeFileSync("currentData.json", jData)
        module.exports = currentData;
    });
});