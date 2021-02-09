var express = require('express');
var cors = require('cors');
var Graphql = require('graphql');
var graphqlHTTP = require('express-graphql');

const https = require('https');

var countList = [
    "CAD","HKD","ISK","PHP","DKK","HUF","CZK","AUD","RON","SEK","IDR","INR","BRL","RUB","HRK","JPY","THB","CHF","SGD","PLN","BGN","TRY"
    ,"CNY","NOK","NZD","ZAR","USD","MXN","ILS","GBP","KRW","MYR","EUR"
]

var options = {
    host: 'api.exchangeratesapi.io',
    path: '/latest',
    query: {
        base: 'EUR',
    }
}

var resData = ''
var req = https.get(options, function(res){
    
    res.on('data',function(chunk){
        resData +=chunk;
    });

    res.on('end',function(){
        console.log(resData)
    });
});



req.on('error', function(err){
    console.log('오류 발생' +err.message)
});



// 여기까진 했는데 이거를 어케 가져오지..?

const ratesType = new Graphql.GraphQLObjectType({
    name: "rate",
    fields: {
        id:{ type: Graphql.GraphQLList}
    }
})

const currencyType = new Graphql.GraphQLObjectType({
    name: "current",
    fields: {
        rates: { type: ratesType},
        base: { type: Graphql.GraphQLString},
        date: { type: Graphql.GraphQLString},
    }
});

var queryType = new Graphql.GraphQLObjectType({
    name: "Query",
    fields:{
        rates : {
            type: currencyType,
            args:{
                id: { type: Graphql.GraphQLInt}
            },
            resolve: function(obj, args, context, info) {
                const data = Object.keys(resData).filter(element =>{
                    if (resData[element].id == args.id){
                        return element;
                    }
                });
                return resData[data];
            }
        },
        // snacks : 전체 과자 출력
        allCurrencys : {
            type: new Graphql.GraphQLList(currencyType),
            resolve: function(obj, args, context, info){
                return resData;
            }
        }
    }
});

var schema = new Graphql.GraphQLSchema({ query: queryType});

var app = express();

app.use(cors());

app.use(
    "/graphql", //라우트 경로 지정
    graphqlHTTP.graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);

app.listen(4000);

console.log("Running a GraphQL server");