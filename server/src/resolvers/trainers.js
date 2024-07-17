const trainerResolvers = {
  Trainer: {
    id: (parent) => parent,
    name: (parent, _, { dataSources }) => {
      return dataSources.trainersDb.getTrainerName(parent)
    },
    party: (parent, _, { dataSources }) => {
      return dataSources.trainersDb.getParty(parent)
    }
  }
}

module.exports = { trainerResolvers }
