const typeResolvers = {
    Type: {
        id: (parent) => parent.typeId,
        name: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getTypeName(parent.typeId);
        },
        double_damage_from: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getTypeDoubleDamageFromIds(parent.typeId);
        },
        double_damage_to: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getTypeDoubleDamageToIds(parent.typeId);
        },
        half_damage_from: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getTypeHalfDamageFromIds(parent.typeId);
        },
        half_damage_to: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getTypeHalfDamageToIds(parent.typeId);
        },
        no_damage_to: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getTypeNoDamageToIds(parent.typeId);
        },
        no_damage_from: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getTypeNoDamageFromIds(parent.typeId);
        },
        pokemon: (parent, _, { dataSources }) => {
            return dataSources.typesDb.getPokemonIdsForType(parent.typeId);
        },
    }
}

module.exports = { typeResolvers }