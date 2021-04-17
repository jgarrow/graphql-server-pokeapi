const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class EggGroupDatabase extends SQLDataSource {
    async getAllEggGroupIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_egggroup');

        const eggGroupIds = queryRes.map((eggGroup) => eggGroup.id);

        return eggGroupIds;
    }

    async getEggGroupName(eggGroupId) {
        const queryRes = await this.knex
            .first()
            .select('egn.name')
            .from('pokemon_v2_egggroupname as egn')
            .where('egn.egg_group_id', eggGroupId)
            .where('egn.language_id', 9)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getEggGroupPokemonIds(eggGroupId) {
        const queryRes = await this.knex
            .select('p.id')
            .from('pokemon_v2_pokemon as p')
            .innerJoin(
                'pokemon_v2_pokemonegggroup as eg',
                'eg.pokemon_species_id',
                'p.pokemon_species_id'
            )
            .where('eg.egg_group_id', eggGroupId)
            .cache(MINUTE);

        const pokemonIds = queryRes.map((pokemon) => pokemon.id);

        return pokemonIds;
    }
}

module.exports = EggGroupDatabase