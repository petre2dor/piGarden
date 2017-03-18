let express = require('express')
let graphqlHTTP = require('express-graphql')
let Schema = require('./schema')
let Root = require('./root')


let app = express()
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: Root,
    graphiql: true,
}))
app.listen(3003)
console.log('Running a GraphQL API server at 127.0.0.1:3003/graphql');
