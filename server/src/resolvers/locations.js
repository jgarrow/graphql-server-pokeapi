const locationResolvers = {
    Location: {
        id: (parent) => parent.locationId,
        name: (parent, _, { dataSources }) => {
            return dataSources.locationsDb.getLocationName(parent.locationId);
        },
        games: (parent, _, { dataSources }) => {
            return dataSources.locationsDb.getLocationGameIds(parent.locationId);
        },
        region: (parent, _, { dataSources }) => {
            return dataSources.locationsDb.getLocationRegionId(parent.locationId);
        },
        pokemon: (parent, _, { dataSources }) => {
            return dataSources.locationsDb.getLocationPokemonIds(parent.locationId);
        },
    }
}

module.exports = { locationResolvers }