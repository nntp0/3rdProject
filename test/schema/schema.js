var express = require('express');
var cors = require('cors');
var Graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
const userDatabase = require("../data/user");

const albumType = new Graphql.GraphQLObjectType({
    name: "Music",
    fields: {
        id: { type: Graphql.GraphQLInt},
        name: { type: Graphql.GraphQLString},
        song: { type: Graphql.GraphQLString},
        year: { type: Graphql.GraphQLInt}
    }
});

var queryType = new Graphql.GraphQLObjectType({
    name: "Query",
    fields:{
        // snack : 각각의 과자를 출력
        album : {
            type: albumType,
            args:{
                id: { type: Graphql.GraphQLInt}
            },
            resolve: function(obj, args, context, info) {
                const data = Object.keys(userDatabase).filter(element =>{
                    if (userDatabase[element].id == args.id){
                        return element;
                    }
                });
                return userDatabase[data];
            }
        },
        // snacks : 전체 과자 출력
        albums : {
            type: new Graphql.GraphQLList(albumType),
            resolve: function(obj, args, context, info){
                return userDatabase;
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