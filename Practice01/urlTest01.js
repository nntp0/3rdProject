const url = require('url');

var options = {
    protocol: "https",
    host: 'api.exchangeratesapi.io',
    pathname : '/latest',
    search : 'base=USD'
}

var urlStr = url.format(options);
console.log(urlStr);

var parsed = url.parse(urlStr,true);

console.log(parsed.query);