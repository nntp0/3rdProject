const express = require('express');
const bodyParser = require('body-parser');
var dummyDatabase = require('./dummy.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    // 클라이언트에게 데이터를 반환
    res.send(
        dummyDatabase
    );
});

app.listen(3000, () =>console.log('The server is running'));