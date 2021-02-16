var express = require('express');
var cors = require('cors');
var Graphql = require('graphql');
var dummyDatabase = require('./dummy.js');
var graphqlHTTP = require('express-graphql');

const snackType = new Graphql.GraphQLObjectType({
    name: "Snack",
    fields: {
        id: { type: Graphql.GraphQLInt},
        name: { type: Graphql.GraphQLString},
        price: { type: Graphql.GraphQLInt},
        manufacturer: { type: Graphql.GraphQLString}
    }
});

var queryType = new Graphql.GraphQLObjectType({
    name: "Query",
    fields:{
        // snack : 각각의 과자를 출력
        snack : {
            type: snackType,
            args:{
                id: { type: Graphql.GraphQLInt}
            },
            resolve: function(obj, args, context, info) {
                const data = Object.keys(dummyDatabase).filter(element =>{
                    if (dummyDatabase[element].id == args.id){
                        return element;
                    }
                });
                return dummyDatabase[data];
            }
        },
        // snacks : 전체 과자 출력
        snacks : {
            type: new Graphql.GraphQLList(snackType),
            resolve: function(obj, args, context, info){
                return dummyDatabase;
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

/*query{
    snacks{
        id
        name
        price
        manufacturer
    } 
}*/