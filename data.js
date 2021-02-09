const https = require('https');

var options = {
    host: 'api.exchangeratesapi.io',
    path: '/latest'
}

var resData = ''
var req = https.get(options, function(res){
    
    res.on('data',function(chunk){
        resData +=chunk;
    });

    res.on('end',function(){
        console.log(resData)
    });
});

req.on('error', function(err){
    console.log('오류 발생' + err.message)
});