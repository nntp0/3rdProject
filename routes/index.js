var express = require('express');
var router = express.Router();

const hdfsConn = require('../hdfsConn.js')
const fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HowMuch' });
});

router.get('/recent', function(req, res, next) {
  const recent = fs.readFileSync("./info/recent.txt").toString();
  var data = fs.readFileSync('./info/countries.txt','utf8');
  var countries = data.split('\r\n')

  var totalFile = ""

  function openAll(countries, callback) {
    if (countries.length == 0) {
        totalFile = totalFile.slice(0, totalFile.length-1)
        totalFile = '{' + totalFile + '}'
        console.log(totalFile)
        res.send(totalFile)
    }
    else {
        country = countries.pop()
        hdfsConn.openFile('/data/'+recent+'_'+country+'.json', (data)=>{
          totalFile = [totalFile, data.slice(1, data.length-1)+','].join('');
          openAll(countries, openAll)
        })
    }
  }

  openAll(countries, openAll)

});

module.exports = router;
