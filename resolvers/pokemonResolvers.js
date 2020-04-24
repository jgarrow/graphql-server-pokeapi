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
        genus: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenus(parent);
        },
        gender_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenderRate(parent);
        },
        types: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonTypeIds(parent);
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
    Type: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeName(parent);
        },
        double_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeDoubleDamageFromIds(parent);
        },
        double_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeDoubleDamageToIds(parent);
        },
        half_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeHalfDamageFromIds(parent);
        },
        half_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeHalfDamageToIds(parent);
        },
        no_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeNoDamageToIds(parent);
        },
        no_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeNoDamageFromIds(parent);
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getPokemonIdsForType(parent);
        },
    },
};

module.exports = { resolvers };
