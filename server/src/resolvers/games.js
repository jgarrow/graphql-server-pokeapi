const gameResolvers = {
    Game: {
        id: (parent) => parent,
        name: (parent, _, { dataSources }) => {
            return dataSources.gamesDb.getGameName(parent);
        },
        generation: (parent, _, { dataSources }) => {
            return dataSources.gamesDb.getGameGeneration(parent);
        },
        regions: (parent, _, { dataSources }) => {
            return dataSources.gamesDb.getGameRegionIds(parent);
        },
    }
}

module.exports = { gameResolvers }