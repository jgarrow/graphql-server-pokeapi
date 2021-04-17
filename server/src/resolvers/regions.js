const regionResolvers = {
    Region: {
        id: (parent) => parent,
        name: (parent, _, { dataSources }) => {
            return dataSources.regionsDb.getRegionName(parent);
        },
        games: (parent, _, { dataSources }) => {
            return dataSources.regionsDb.getRegionGameIds(parent);
        },
        locations: async (parent, _, { dataSources }) => {
            const locationIds = await dataSources.regionsDb.getRegionLocationIds(
                parent
            );
            return locationIds.map((location) => {
                return {
                    locationId: location,
                };
            });
        },
    }
}

module.exports = { regionResolvers }