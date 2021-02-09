const https = require('https');
const queryString = require('querystring');
var options = {
    host: 'api.exchangeratesapi.io',
    path: '/latest',
    query: 'base=USD'
}

var req = https.get(options, stream => {
    let rawdata = '';
    stream.setEncoding('utf8');
    stream.on('data', buffer => rawdata += buffer);
    stream.on('end', function () {
      console.log(rawdata); // 긁어온 내용 뿌리기
    });
});

console.log(req)