const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class MovesDatabase extends SQLDataSource {
    async getAllMoveIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_move')
            .cache(MINUTE);

        const moveIds = queryRes.map((move) => {
            return { moveId: move.id };
        });

        return moveIds;
    }

    async getMoveName(moveId) {
        const queryRes = await this.knex
            .first()
            .select('mn.name')
            .from('pokemon_v2_movename as mn')
            .where('mn.move_id', moveId)
            .where('mn.language_id', 9)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getMoveTypeId(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.type_id')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.type_id : null;
    }

    async getMovePower(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.power')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.power : null;
    }

    async getMovePp(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.pp')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.pp : null;
    }

    async getMoveAccuracy(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.accuracy')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.accuracy : null;
    }

    async getMovePriority(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.priority')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.priority : null;
    }

    async getMoveEffectChance(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.move_effect_chance')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.move_effect_chance : null;
    }

    async getMoveDamageClass(moveId) {
        const queryRes = await this.knex
            .first()
            .select('mdc.name')
            .from('pokemon_v2_movedamageclass as mdc')
            .innerJoin(
                'pokemon_v2_move as m',
                'm.move_damage_class_id',
                'mdc.id'
            )
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getMoveEffect(moveId) {
        const queryRes = await this.knex
            .first()
            .select('e.short_effect', 'm.move_effect_chance')
            .from('pokemon_v2_moveeffecteffecttext as e')
            .innerJoin(
                'pokemon_v2_move as m',
                'm.move_effect_id',
                'e.move_effect_id'
            )
            .where('m.id', moveId)
            .where('e.language_id', 9)
            .cache(MINUTE);

        // replace the string "$effect_chance" with the actual percentage
        return queryRes
            ? queryRes.short_effect.replace(
                  '$effect_chance',
                  queryRes.move_effect_chance
              )
            : null;
    }

    async getMoveDescription(moveId, gameName) {
        const queryRes = await this.knex
            .select('mft.flavor_text')
            .from('pokemon_v2_moveflavortext as mft')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'mft.version_group_id'
            )
            .where('mft.move_id', moveId)
            .where('mft.language_id', 9)
            .modify(function (hasGame) {
                if (gameName) {
                    hasGame.where('v.name', gameName);
                }
            })
            .cache(MINUTE);

        // if no game parameter is provided, the query returns all of the descriptions
        // return the description from the most recent game, with the white space all normalized with spaces
        const normalizedWhiteSpace =
            queryRes && queryRes.length
                ? queryRes[queryRes.length - 1].flavor_text.replace(/\s/gm, ' ')
                : null;

        return normalizedWhiteSpace;
    }

    async getMoveAilment(moveId) {
        const queryRes = await this.knex
            .first()
            .select('ma.name')
            .from('pokemon_v2_movemetaailment as ma')
            .innerJoin(
                'pokemon_v2_movemeta as m',
                'm.move_meta_ailment_id',
                'ma.id'
            )
            .where('m.move_id', moveId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getSinglePokemonLearnMethodIds(pokemonId, moveId, gameName) {
        const queryRes = await this.knex
            .select('pm.move_learn_method_id', 'pm.level', 'v.id')
            .from('pokemon_v2_pokemonmove as pm')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'pm.version_group_id'
            )
            .where('pm.pokemon_id', pokemonId)
            .where('pm.move_id', moveId)
            .where('v.name', gameName)
            .cache(MINUTE);

        // const methodIds = queryRes.map((method) => method.move_learn_method_id);

        return queryRes ? queryRes : null;
    }

    async getSinglePokemonMoveLearnMethodName(learnMethodId) {
        const queryRes = await this.knex
            .first()
            .select('name')
            .from('pokemon_v2_movelearnmethod')
            .where({ id: learnMethodId })
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    // async getSinglePokemonMoveLearnMethod(pokemonId, moveId, gameName) {
    //     const queryRes = await this.knex
    //         .first()
    //         .select('mlm.name')
    //         .from('pokemon_v2_movelearnmethod as mlm')
    //         .innerJoin(
    //             'pokemon_v2_pokemonmove as pm',
    //             'pm.move_learn_method_id',
    //             'mlm.id'
    //         )
    //         .innerJoin(
    //             'pokemon_v2_version as v',
    //             'v.version_group_id',
    //             'pm.version_group_id'
    //         )
    //         .where('pm.pokemon_id', pokemonId)
    //         .where('pm.move_id', moveId)
    //         .where('v.name', gameName);

    //     return queryRes.name;
    // }

    async getSinglePokemonMoveLevelLearnedAt(pokemonId, moveId, gameName) {
        const queryRes = await this.knex
            .select('pm.level')
            .from('pokemon_v2_pokemonmove as pm')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'pm.version_group_id'
            )
            .where('pm.pokemon_id', pokemonId)
            .where('pm.move_id', moveId)
            .where('v.name', gameName)
            .cache(MINUTE);

        return queryRes ? queryRes.level : null;
    }

    // games the move debuted in (not tied to a specific Pokemon)
    async getMoveGameIds(moveId) {
        const queryRes = await this.knex
            .select('v.id')
            .from('pokemon_v2_version as v')
            .innerJoin(
                'pokemon_v2_versiongroup as vg',
                'vg.id',
                'v.version_group_id'
            )
            .innerJoin(
                'pokemon_v2_move as m',
                'm.generation_id',
                'vg.generation_id'
            )
            .where('m.id', moveId)
            .cache(MINUTE);

        const gameIds = queryRes ? queryRes.map((gameObj) => gameObj.id) : null;

        return gameIds;
    }
}

module.exports = MovesDatabase