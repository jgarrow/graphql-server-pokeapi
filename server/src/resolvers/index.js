const { rootQueryResolvers } = require('./rootQueries')
const { pokemonResolvers } = require('./pokemon')
const { moveResolvers } = require('./moves')
const { itemResolvers } = require('./items')
const { abilityResolvers } = require('./abilities')
const { eggGroupResolvers } = require('./eggGroups')
const { locationResolvers } = require('./locations')
const { gameResolvers } = require('./games')
const { regionResolvers } = require('./regions')
const { typeResolvers } = require('./types')

const resolvers = {
    ...rootQueryResolvers,
    ...pokemonResolvers,
    ...moveResolvers,
    ...itemResolvers,
    ...abilityResolvers,
    ...eggGroupResolvers,
    ...locationResolvers,
    ...gameResolvers,
    ...regionResolvers,
    ...typeResolvers,
    DexEntry: {
        game: (parent) => parent.gameId,
    },
    Gender: {
        id: (parent) => parent.genderId,
        name: (parent, _, { dataSources }) => {
            return dataSources.genderDb.getGenderName(parent.genderId);
        },
    },
    EvolutionCriteria: {
        __resolveType(obj) {
            if (
                obj.evolution_criteria_name === 'held_item' ||
                obj.evolution_criteria_name === 'evolution_item'
            ) {
                return 'Item';
            } else if (obj.evolution_criteria_name === 'known_move') {
                return 'Move';
            } else if (obj.evolution_criteria_name === 'known_move_type') {
                return 'Type';
            } else if (obj.evolution_criteria_name === 'location') {
                return 'Location';
            } else if (obj.evolution_criteria_name === 'gender') {
                return 'Gender';
            } else if (obj.value) {
                return 'OtherEvolutionCriteria';
            }

            return null;
        },
    }
}

module.exports = { resolvers };