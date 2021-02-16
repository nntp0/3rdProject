const http = require('http');
// 서버를 만들 수 있는 http 모듈 생성

http.createServer(function(request, response){
// http의 모듈을 이용해 서버를 만듬
// 사용자의 요청과 응답을 하기 위해 콜백함수 적용
    console.log('서버 시작');
    console.log('요청한 클라이언트 IP : ' + request.connection.remoteAddress)

    // writeHead : HTML 코드의 head에 해당하는 부분
    response.writeHead(200, {'Context-Type' : 'text/html;charset=utf-8'});

    // write : HTML 파일의 body에 해당하는 부분
    response.write("<html>");
    response.write("<meta charset='utf-8'>");
    response.write("<body>");
    response.write("<p> 안녕 </p>");
    response.write("</body>");
    response.write("</html>");

    response.end()

}).listen(3000);