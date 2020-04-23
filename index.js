const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/schema');
const { resolvers } = require('./resolvers/pokemonResolvers');
const Database = require('./database');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        /* CONNECTION INFO */
        filename: './data/db.sqlite3',
    },
    useNullAsDefault: true,
};

const db = new Database(knexConfig);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // cache,
    context: () => {},
    dataSources: () => ({ db }),
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
