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
        id:             {type: GraphQLInt, description: 'action ID'},
        device_id:      {type: GraphQLInt, description: 'ID of physical device'},
        verb:           {type: GraphQLString, description: 'E.g.: READ, WRITE, START, OPEN, STOP, CHECK_PROGRESS'},
        object:         {type: GraphQLString, description: 'E.g.: AREA, TEMPERATURE'},
        options:        {type: GraphQLString, description: 'JSON object'},
        last_run_time:  {type: GraphQLString, description: 'Timestamp of last run'},
        next_run_time:  {type: GraphQLString, description: 'Timestamp of next scheduled run'},
        schedule:       {type: GraphQLString, description: 'JSON describing the schedule'},
        description:    {type: GraphQLString, description: 'Action\'s description'},
        is_running:     {type: GraphQLString, description: 'True if the action is currently running'},
        status:         {type: GraphQLString, description: 'ACTIVE/INACTIVE/WARNING/ERROR'},
        retries:        {type: GraphQLInt, description: 'No o retries'}
    })
});

// id, name, type, description, status, options
const Device = new GraphQLObjectType({
    name: 'Device',
    description: 'This describes a physical device.',
    fields: () => ({
        id:             {type: GraphQLInt, description: 'device ID'},
        name:           {type: GraphQLString, description: 'The name of the device'},
        type:           {type: GraphQLString, description: 'E.g.: TEMPERATURE, HUMIDITY'},
        description:    {type: GraphQLString, description: 'The description of the device'},
        status:         {type: GraphQLString, description: 'ACTIVE/INACTIVE/WARNING/ERROR'},
        options:        {type: GraphQLString, description: 'JSON object'}
    })
});

const Stat = new GraphQLObjectType({
    name: 'Stat',
    description: 'This describes a PiGarden Action.',
    fields: () => ({
        device_id:  {type: GraphQLInt, description: 'ID of physical device'},
        area_id:    {type: GraphQLInt, description: 'ID of the area(zone)'},
        type:       {type: GraphQLString, description: 'E.g.: TEMPERATURE, HUMIDITY'},
        date:       {type: GraphQLString, description: 'Timestamp: 2017-01-14 00:00:00'},
        value:      {type: GraphQLFloat, description: 'Temperature/Humidity value'}
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
        actions: {
            type: new GraphQLList(Action),
            description: 'Get PiGarden Actions',
            args: {
                device_id:  {type: GraphQLInt},
                verb:       {type: GraphQLString},
                object:     {type: GraphQLString},
                status:     {type: GraphQLString}
            }
        },
        device: {
            type: Device,
            description: 'Get a PiGarden Device',
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            }
        },
        devices: {
            type: new GraphQLList(Device),
            description: 'Get PiGarden Actions',
            args: {
                id:     {type: GraphQLInt},
                type:   {type: GraphQLString},
                status: {type: GraphQLString}
            }
        },
        latestStat: {
            type: Stat,
            description: 'Get latest read for a device',
            args: {
                device_id:  {type: new GraphQLNonNull(GraphQLInt)},
                verb:       {type: new GraphQLNonNull(GraphQLString)},
                object:     {type: new GraphQLNonNull(GraphQLString)}
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
                next_run_time:  {type: GraphQLString, description: 'Timestamp of next scheduled run. Default NOW()'},
                schedule:       {type: GraphQLString, description: 'JSON describing the schedule'},
                description:    {type: GraphQLString, description: 'Action description'},
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
