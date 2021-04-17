const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class AbilityDatabase extends SQLDataSource {
    async getAllAbilityIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_ability')
            .cache(MINUTE);

        const abilityIds = queryRes.map((ability) => {
            return { abilityId: ability.id };
        });

        return abilityIds;
    }

    async getSinglePokemonAbilitiesIsHidden(pokemonId, abilityId) {
        const queryRes = await this.knex
            .first()
            .select('pa.is_hidden')
            .from('pokemon_v2_pokemonability as pa')
            .where('pa.pokemon_id', pokemonId)
            .where('pa.ability_id', abilityId)
            .cache(MINUTE);

        return queryRes ? queryRes.is_hidden : null;
    }

    async getAbilityName(abilityId) {
        const queryRes = await this.knex
            .first()
            .select('an.name')
            .from('pokemon_v2_abilityname as an')
            .where('an.ability_id', abilityId)
            .where('an.language_id', 9)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getAbilityPokemonIds(abilityId) {
        const queryRes = await this.knex
            .select('pa.pokemon_id')
            .from('pokemon_v2_pokemonability as pa')
            .where('pa.ability_id', abilityId)
            .cache(MINUTE);

        const pokemonIds = queryRes.map((pokemon) => pokemon.pokemon_id);

        return pokemonIds;
    }

    async getAbilityEffect(abilityId) {
        const queryRes = await this.knex
            .first()
            .select('e.short_effect')
            .from('pokemon_v2_abilityeffecttext as e')
            .where('e.ability_id', abilityId)
            .where('e.language_id', 9)
            .cache(MINUTE);

        return queryRes ? queryRes.short_effect : null;
    }

    async getAbilityDescription(abilityId, game) {
        const queryRes = await this.knex

            .select('aft.flavor_text')
            .from('pokemon_v2_abilityflavortext as aft')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'aft.version_group_id'
            )
            .where('aft.ability_id', abilityId)
            .where('aft.language_id', 9)
            .modify(function (hasGame) {
                if (game) {
                    hasGame.where('v.name', game);
                }
            })
            .cache(MINUTE);

        // if no game parameter is provided, the query returns all of the descriptions
        // return the description from the most recent game
        return queryRes ? queryRes[queryRes.length - 1].flavor_text : null;
    }
}

module.exports = AbilityDatabase