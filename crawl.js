const https = require('https');
const express = require('express');
var app = express();
var options = {
    host: 'api.exchangeratesapi.io',
    path: '/latest?base=USD'
}

var request = https.get(options, stream => {
    let rawdata = '';
    stream.setEncoding('utf8');
    stream.on('data', buffer => rawdata += buffer);
    stream.on('end', function () {
      console.log(rawdata); // 긁어온 내용 뿌리기
    });
});

function getData(req, res){
  req = request;
  console.log(req);
}

app.use(getData);
app.listen(4000);
