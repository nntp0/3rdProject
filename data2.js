const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body)
    // 여기서 헤더, 메서드, url, 바디를 가지게 되었고
    // 이 요청에 응답하는 데 필요한 어떤 일이라도 할 수 있게 되었습니다.
  });
}).listen(5050); // 이 서버를 활성화하고 8080 포트로 받습니다.