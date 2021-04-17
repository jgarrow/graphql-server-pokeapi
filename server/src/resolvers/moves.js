const moveResolvers = {
    Move: {
        id: (parent) => parent.moveId,
        name: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveName(parent.moveId);
        },
        type: async (parent, _, { dataSources }) => {
            const typeId = await dataSources.movesDb.getMoveTypeId(parent.moveId);
            return {
                typeId,
            };
        },
        power: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMovePower(parent.moveId);
        },
        pp: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMovePp(parent.moveId);
        },
        accuracy: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveAccuracy(parent.moveId);
        },
        priority: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMovePriority(parent.moveId);
        },
        damage_class: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveDamageClass(parent.moveId);
        },
        ailment: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveAilment(parent.moveId);
        },
        effect_chance: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveEffectChance(parent.moveId);
        },
        effect: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveEffect(parent.moveId);
        },
        description: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveDescription(
                parent.moveId,
                parent.gameName
            );
        },
        learn_methods: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getSinglePokemonLearnMethodIds(
                parent.pokemonId,
                parent.moveId,
                parent.gameName
            );
        },
        original_games: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getMoveGameIds(parent.moveId);
        },
    },
    MoveLearnMethod: {
        method: (parent, _, { dataSources }) => {
            return dataSources.movesDb.getSinglePokemonMoveLearnMethodName(
                parent.move_learn_method_id
            );
        },
        level_learned_at: (parent) => {
            return parent.level;
        },
        games: (parent) => {
            return parent.id;
        },
    }
}

module.exports = { moveResolvers }