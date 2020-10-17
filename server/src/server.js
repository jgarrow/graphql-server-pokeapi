const ApolloServer = require('apollo-server').ApolloServer;
const { typeDefs } = require('./schema/schema');
const { resolvers } = require('./resolvers/pokemonResolvers');
const Database = require('./database');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './src/data/db.sqlite3',
    },
    useNullAsDefault: true,
};

const db = new Database(knexConfig);

const createLocalServer = () =>
    new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {},
        dataSources: () => ({ db }),
        introspection: true,
        playground: true,
    });

module.exports = { createLocalServer };
