const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const PokemonDatabase = require('./datasources/pokemon')
const GenderDatabase = require('./datasources/gender')
const ItemDatabase = require('./datasources/items')
const RegionDatabase = require('./datasources/regions')
const GameDatabase = require('./datasources/games')
const MovesDatabase = require('./datasources/moves')
const LocationDatabase = require('./datasources/locations')
const TypeDatabase = require('./datasources/types')
const AbilityDatabase = require('./datasources/abilities')
const EggGroupDatabase = require('./datasources/eggGroups');

// TODO:
// separate ID's for alternate forms
// original PokeAPI has form urls under `/pokemon-species/#`, under `varieties`
// can parse out those ID's to separate them out from the rest
// pokemon_v2_pokemonform table -- those with a form_name != ""

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './src/data/db.sqlite3',
    },
    useNullAsDefault: true,
};

const createLocalServer = () =>
    new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {},
        dataSources: () => ({ 
            pokemonDb: new PokemonDatabase(knexConfig),
            genderDb: new GenderDatabase(knexConfig),
            itemsDb: new ItemDatabase(knexConfig),
            regionsDb: new RegionDatabase(knexConfig),
            gamesDb: new GameDatabase(knexConfig),
            movesDb: new MovesDatabase(knexConfig),
            locationsDb: new LocationDatabase(knexConfig),
            typesDb: new TypeDatabase(knexConfig),
            abilitiesDb: new AbilityDatabase(knexConfig),
            eggGroupsDb: new EggGroupDatabase(knexConfig)
         }),
        introspection: true,
        playground: true,
    });

module.exports = { createLocalServer };
