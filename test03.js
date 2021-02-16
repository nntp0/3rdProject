const url = require('url');
const address = 'http://59.28.30.218:20001/webhdfs/v1/user/hadoop?op=LISTSTATUS';
const parsedData= url.parse(address, true);

console.log(parsedData.host); 
console.log(parsedData.pathname); 
console.log(parsedData.search); 

const queryData = parsedData.query; 
console.log(queryData.op); 