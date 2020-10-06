require('dotenv').config();
const ApolloServer = require('apollo-server').ApolloServer;
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer;
const { typeDefs } = require('./schema/schema');
const { resolvers } = require('./resolvers/pokemonResolvers');
const Database = require('./database');
const { getDataPath } = require('./data/data');
const path = require('path');

console.log('server path:', path.resolve(__dirname));
console.log('process.env.DB_FILE_PATH: ', process.env.DB_FILE_PATH);
getDataPath();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: `${process.env.DB_FILE_PATH}`,
    },
    useNullAsDefault: true,
};

const db = new Database(knexConfig);

const createLambdaServer = () =>
    new ApolloServerLambda({
        typeDefs,
        resolvers,
        introspection: true,
        playground: true,
        dataSources: () => ({ db }),
    });

const createLocalServer = () =>
    new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {},
        dataSources: () => ({ db }),
    });

module.exports = { createLambdaServer, createLocalServer };
