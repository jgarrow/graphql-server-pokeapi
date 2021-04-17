const abilityResolvers = {
    Ability: {
        id: (parent) => parent.abilityId,
        name: (parent, _, { dataSources }) => {
            return dataSources.abilitiesDb.getAbilityName(parent.abilityId);
        },
        is_hidden: (parent, _, { dataSources }) => {
            return dataSources.abilitiesDb.getSinglePokemonAbilitiesIsHidden(
                parent.pokemonId,
                parent.abilityId
            );
        },
        effect: (parent, _, { dataSources }) => {
            return dataSources.abilitiesDb.getAbilityEffect(parent.abilityId);
        },
        description: (parent, _, { dataSources }) => {
            return dataSources.abilitiesDb.getAbilityDescription(
                parent.abilityId,
                parent.gameName
            );
        },
        pokemon: (parent, _, { dataSources }) => {
            return dataSources.abilitiesDb.getAbilityPokemonIds(parent.abilityId);
        },
    }
}

module.exports = { abilityResolvers }