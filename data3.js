var http = require('http');
var fs = require('fs');
const address = 'http://59.28.30.218:20001/webhdfs/v1/user/hadoop?op=LISTSTATUS';

http.get(address,function(res){
   var resData = '';
    res.on('data',function(chunk){
        resData +=chunk;
    });

    res.on('end',function(){
        const jData = JSON.stringify(resData); 
        fs.writeFileSync("hadoopData.json", jData)
        console.log(resData);
    });
});



