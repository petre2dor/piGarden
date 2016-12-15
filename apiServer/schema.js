let graphql = require('graphql');

let GraphQLObjectType   = graphql.GraphQLObjectType
let GraphQLInt          = graphql.GraphQLInt
let GraphQLString       = graphql.GraphQLString
let GraphQLNonNull      = graphql.GraphQLNonNull
let GraphQLSchema       = graphql.GraphQLSchema

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


module.exports = Schema
