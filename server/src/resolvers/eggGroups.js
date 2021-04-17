const eggGroupResolvers = {
    EggGroup: {
        id: (parent) => parent,
        name: (parent, _, { dataSources }) => {
            return dataSources.eggGroupsDb.getEggGroupName(parent);
        },
        pokemon: (parent, _, { dataSources }) => {
            return dataSources.eggGroupsDb.getEggGroupPokemonIds(parent);
        },
    }
}

module.exports = { eggGroupResolvers }