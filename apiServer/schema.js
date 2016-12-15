let graphql = require('graphql');

let GraphQLObjectType   = graphql.GraphQLObjectType
let GraphQLInt          = graphql.GraphQLInt
let GraphQLFloat        = graphql.GraphQLFloat
let GraphQLString       = graphql.GraphQLString
let GraphQLNonNull      = graphql.GraphQLNonNull
let GraphQLList         = graphql.GraphQLList
let GraphQLSchema       = graphql.GraphQLSchema

const Action = new GraphQLObjectType({
    name: 'Action',
    description: 'This describes a PiGarden Action.',
    fields: () => ({
        id:             {type: new GraphQLNonNull(GraphQLInt), description: 'action ID'},
        device_id:      {type: new GraphQLNonNull(GraphQLInt), description: 'ID of physical device'},
        verb:           {type: new GraphQLNonNull(GraphQLString), description: ''},
        object:         {type: new GraphQLNonNull(GraphQLString), description: ''},
        options:        {type: GraphQLString, description: 'JSON object'},
        last_run_time:  {type: GraphQLString, description: 'Timestamp of last run'},
        next_run_time:  {type: GraphQLString, description: 'Timestamp of next scheduled run'},
        schedule:       {type: GraphQLString, description: 'JSON describing the schedule'},
        description:    {type: GraphQLString, description: 'Action\'s description'},
        is_running:     {type: GraphQLString, description: 'True if the action is currently running'},
        status:         {type: new GraphQLNonNull(GraphQLString), description: ''},
        retries:        {type: GraphQLInt, description: 'No o retries'}
    })
});

const Stat = new GraphQLObjectType({
    name: 'Stat',
    description: 'This describes a PiGarden Action.',
    fields: () => ({
        device_id:  {type: new GraphQLNonNull(GraphQLInt), description: 'ID of physical device'},
        area_id:    {type: new GraphQLNonNull(GraphQLInt), description: ''},
        type:       {type: new GraphQLNonNull(GraphQLString), description: ''},
        date:       {type: new GraphQLNonNull(GraphQLString), description: ''},
        value:      {type: new GraphQLNonNull(GraphQLFloat), description: ''}
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
        },
        stats: {
            type: new GraphQLList(Stat),
            description: 'Get stats for devices',
            args: {
                device_id:  {type: new GraphQLNonNull(GraphQLInt)},
                area_id:    {type: new GraphQLNonNull(GraphQLInt)},
                type:       {type: new GraphQLNonNull(GraphQLString)},
                since:      {type: new GraphQLNonNull(GraphQLString)},
                until:      {type: GraphQLString}
            }
        }
    })
});



const Mutation = new GraphQLObjectType({
    name: "PiGardenMutations",
    description: "Mutations of our stuff",
    fields: () => ({
        createAction: {
            type: Action,
            args: {
                device_id:      {type: new GraphQLNonNull(GraphQLInt), description: 'ID of physical device'},
                verb:           {type: new GraphQLNonNull(GraphQLString), description: ''},
                object:         {type: new GraphQLNonNull(GraphQLString), description: ''},
                options:        {type: GraphQLString, description: 'JSON object'},
                next_run_time:  {type: GraphQLString, description: 'Timestamp of next scheduled run. Default NOW'},
                schedule:       {type: GraphQLString, description: 'JSON describing the schedule'},
                description:    {type: GraphQLString, description: 'Action\'s description'},
                status:         {type: GraphQLString, description: 'Default INACTIVE'}
            }
        },
        updateAction: {
            type: Action,
            args: {
                id:             {type: new GraphQLNonNull(GraphQLInt)},
                device_id:      {type: GraphQLInt, description: 'ID of physical device'},
                verb:           {type: GraphQLString, description: ''},
                object:         {type: GraphQLString, description: ''},
                options:        {type: GraphQLString, description: 'JSON object'},
                next_run_time:  {type: GraphQLString, description: 'Timestamp of next scheduled run. Default NOW'},
                schedule:       {type: GraphQLString, description: 'JSON describing the schedule'},
                description:    {type: GraphQLString, description: 'Action\'s description'},
                status:         {type: GraphQLString, description: 'Default INACTIVE'}
            }
        }
    })
})


const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});


module.exports = Schema
