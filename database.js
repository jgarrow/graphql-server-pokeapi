// https://freesoft.dev/program/155608432

const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60;

// const knex = Knex({
//     client: 'sqlite3',
//     connection: {
//         /* CONNECTION INFO */
//         filename: './data/db.sqlite3',
//     },
//     useNullAsDefault: true,
// });

class Database extends SQLDataSource {
    // for building initial pages
    getAllPokemonNamesAndIds() {
        return this.knex
            .select('name', 'id')
            .from('pokemon_v2_pokemon')
            .cache(MINUTE);
    }

    async getSinglePokemonName(pokemonId) {
        // const queryRes = await this.knex
        //     .first()
        //     .select(
        //         'p.name',
        //         'p.height',
        //         'p.weight',
        //         'p.base_experience',
        //         'ps.is_baby',
        //         'ps.gender_rate'
        //     )
        //     .from('pokemon_v2_pokemon as p')
        //     .innerJoin(
        //         'pokemon_v2_pokemonspecies as ps',
        //         'p.pokemon_species_id',
        //         'ps.id'
        //     )
        //     .where('p.id', pokemonId);

        const queryRes = await this.knex
            .first()
            .select('p.name')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId });

        return queryRes.name;
    }

    async getSinglePokemonHeight(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.height')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId });

        return queryRes.height;
    }

    async getSinglePokemonWeight(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.weight')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId });

        return queryRes.weight;
    }

    async getSinglePokemonIsBaby(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('ps.is_baby')
            .from('pokemon_v2_pokemon as p')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId);

        return queryRes.is_baby;
    }

    async getSinglePokemonGenderRate(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('ps.gender_rate')
            .from('pokemon_v2_pokemon as p')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId);

        return queryRes.gender_rate;
    }

    async getSinglePokemonGeneration(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('gn.name')
            .from('pokemon_v2_generationname as gn')
            .innerJoin('pokemon_v2_generation as g', 'g.id', 'gn.generation_id')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'ps.generation_id',
                'g.id'
            )
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('gn.language_id', 9) // US English language_id is 9
            .where('p.id', pokemonId);

        return queryRes.name;
    }

    async getSinglePokemonNationalDexNum(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('pokedex.pokedex_number')
            .from('pokemon_v2_pokemondexnumber as pokedex')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'ps.id',
                'pokedex.pokemon_species_id'
            )
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('pokedex.pokedex_id', 1) // pokedex_id for national pokedex is 1
            .where('p.id', pokemonId);

        return queryRes.pokedex_number;
    }

    async getSinglePokemonStats(pokemonId) {
        const queryRes = await this.knex
            .select('pStat.base_stat', 's.name')
            .from('pokemon_v2_pokemonstat as pStat')
            .innerJoin('pokemon_v2_stat as s', 's.id', 'pStat.stat_id')
            .innerJoin('pokemon_v2_pokemon as p', 'p.id', 'pStat.pokemon_id')
            .where('p.id', pokemonId);

        return queryRes;
    }
}

module.exports = Database;
