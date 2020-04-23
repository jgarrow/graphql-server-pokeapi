const resolvers = {
    Query: {
        allPokemonObjects: (parent, args, { dataSources }) => {},
        pokemon: (parent, args, { dataSources }) => args.id,
    },
    Pokemon: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonName(parent);
        },
        height: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonHeight(parent);
        },
        weight: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonWeight(parent);
        },
        nat_dex_num: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonNationalDexNum(parent);
        },
        is_baby: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonIsBaby(parent);
        },
        gender_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenderRate(parent);
        },
        generation: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGeneration(parent);
        },
        base_stats: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonStats(parent);
        },
    },
    Stats: {
        hp: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'hp');
            return hp.base_stat;
        },
        attack: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'attack');
            return hp.base_stat;
        },
        defense: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'defense');
            return hp.base_stat;
        },
        special_attack: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'special-attack');
            return hp.base_stat;
        },
        special_defense: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'special-defense');
            return hp.base_stat;
        },
        speed: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'speed');
            return hp.base_stat;
        },
    },
};

module.exports = { resolvers };
