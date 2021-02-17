var hadoopData = require('./hadoopData.json');
var currentData = require('./currentData.json');
var express = require('express');
var app = express();

app.get('/', function(req,res){
    req.body = JSON.parse(hadoopData);
    console.log(req.body)
})

app.listen(5500);