var http = require('http');
var fs = require('fs');
var data = fs.readFileSync('user.json')
var users = JSON.parse(data);

var server = http.createServer(function(req,res){
    switch(req.method){
        case 'get':
            // Get 요청 처리 : 영화목록보기, 영화 상세정보 보기
            handleGetRequest(req,res);
            return;
        case 'post':
            // Post 요청 처리 : 영화정보 추가
            handlePostRequest(req,res);
            return;
        default:
            res.statusCode=404;
            res.end('잘못된 요청입니다.');
            return;
    }
});
server.listen(3000);

function handleGetRequest(req,res){
    var url = req.url;
    if(url == '/users'){
        //  목록 생성
        var list=[];
        for (var i=0; i<users.length; i++){
            var user = users[i];
            list.push({id:user.id, name: user.name, song:user.song, year: user.year});
        }

        console.log(list)
        // 목록 정보와 메타 데이터 준비
        var result = { count : list.length, data:list}
        // JSON 형태로 응답
        response.writeHead(200, {'Context-Type':'application/json;charset=utf-8'});
        response.end(JSON.stringify(result));
    }
    else{ // 상세정보 - 뒤에 아이디가 있음
        var id = url.split('/')[2];
        // 상세정보 찾기, 응답 생성
        var user = null;

        for (var i=0; i<users.length;i++){
            var item = users[i];
            if (id == item.id){
                user = item;
                break;
            }
        }

        if (user){
            response.writeHead(200, {'Context-Type':'application/json;charset=utf-8'});
            response.end(JSON.stringify(user))
        }
        else{
            response.writeHead(404, {'Context-Type':'application/json;charset=utf-8'});
            var message={
                error:{
                    code: 404,
                    message: '원하는 정보가 없습니다.'
                }
            }
            response.end(JSON.stringify(message));
        }
    
    }
}