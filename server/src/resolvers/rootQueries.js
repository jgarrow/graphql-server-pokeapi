const rootQueryResolvers = {
    Query: {
        allPokemon: (_, args, { dataSources }) => {
            return dataSources.pokemonDb.getAllPokemonIds(args.limit, args.filter);
        },
        allAbilities: (_, __, { dataSources }) => {
            return dataSources.abilitiesDb.getAllAbilityIds();
        },
        allTypes: async (_, __, { dataSources }) => {
            const typeIds = await dataSources.typesDb.getAllTypeIds();
            return typeIds.map((type) => {
                return {
                    typeId: type,
                };
            });
        },
        allEggGroups: (_, __, { dataSources }) => {
            return dataSources.eggGroupsDb.getAllEggGroupIds();
        },
        allLocations: async (_, __, { dataSources }) => {
            const locationIds = await dataSources.locationsDb.getAllLocationIds();
            return locationIds.map((location) => {
                return {
                    locationId: location,
                };
            });
        },
        allMoves: async (_, __, { dataSources }) => {
            const moveIds = await dataSources.movesDb.getAllMoveIds();
            return moveIds.map((move) => {
                return {
                    moveId: move,
                };
            });
        },
        allRegions: (_, __, { dataSources }) => {
            return dataSources.regionsDb.getAllRegionIds();
        },
        allGames: (_, __, { dataSources }) => {
            return dataSources.gamesDb.getAllGameIds();
        },
        allItems: async (_, __, { dataSources }) => {
            const itemIds = await dataSources.itemsDb.getAllItemIds();
            return itemIds.map((item) => {
                return {
                    itemId: item,
                };
            });
        },
        pokemon: (_, args) => args.id,
        game: (_, args) => args.id,
        region: (_, args) => args.id,
        move: (_, args) => {
            return { moveId: args.id };
        },
        location: (_, args) => args.id,
        type: (_, args) => args.id,
        eggGroup: (_, args) => args.id,
        ability: (_, args) => {
            return { abilityId: args.id };
        }
    }
}

module.exports = { rootQueryResolvers }