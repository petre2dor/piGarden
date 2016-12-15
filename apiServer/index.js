var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLInt = graphql.GraphQLInt
var GraphQLString = graphql.GraphQLString
var GraphQLNonNull = graphql.GraphQLNonNull
var GraphQLSchema = graphql.GraphQLSchema

// import {
//   // These are the basic GraphQL types
//   GraphQLInt,
//   // GraphQLFloat,
//   GraphQLString,
//   // GraphQLList,
//   GraphQLObjectType,
//   // GraphQLEnumType,
//
//   // This is used to create required fields and arguments
//   GraphQLNonNull,
//
//   // This is the class we need to create the schema
//   GraphQLSchema
// } from 'graphql';

const Action = new GraphQLObjectType({
  name: 'Action',
  description: 'This describes a PiGarden Action.',
  fields: () => ({
    id:             {type: new GraphQLNonNull(GraphQLInt), description: 'action ID'},
    device_id:      {type: new GraphQLNonNull(GraphQLInt), description: 'ID of physical device'},
    verb:           {type: new GraphQLNonNull(GraphQLString), description: ''},
    object:         {type: new GraphQLNonNull(GraphQLString), description: ''},
    options:        {type: GraphQLString, description: ''},
    last_run_time:  {type: GraphQLString, description: 'Timestamp of last run'},
    next_run_time:  {type: GraphQLString, description: 'Timestamp of next scheduled run'},
    schedule:       {type: GraphQLString, description: 'JSON describing the schedule'},
    description:    {type: GraphQLString, description: 'Action\'s description'},
    is_running:     {type: GraphQLString, description: 'True if the action is currently running'},
    status:         {type: new GraphQLNonNull(GraphQLString), description: ''},
    retries:        {type: GraphQLInt, description: 'No o retries'}
  })
});

const Query = new GraphQLObjectType({
  name: 'PiGarden',
  description: "Root of the PiGarden Query Schema",
  fields: () => ({
    action: {
      type: Action,
      description: 'Get a PiGarden Action',
      args: {
          id: {type: new GraphQLNonNull(GraphQLInt)}
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

// The root provides a resolver function for each API endpoint
var root = {
  action: params => {
      console.log(params);
      return {id: params.id, device_id: 42, options: 'thug4life'}
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(3003);
console.log('Running a GraphQL API server at localhost:4000/graphql');
