const { SQLDataSource } = require('datasource-sql');
const ColorThief = require('colorthief');
const { lightenDarkenColor } = require('../utils/colors');

const MINUTE = 60 * 10000;

class PokemonDatabase extends SQLDataSource {
    async getAllPokemonIds(limit = -1, filter = true) {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_pokemon')
            .limit(limit)
            .where('is_default', filter)
            .cache(MINUTE);

        const pokemonIds = queryRes.map((pokemon) => pokemon.id);

        return pokemonIds;
    }

    async getSinglePokemonName(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.name')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId })
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getSinglePokemonHeight(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.height')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId })
            .cache(MINUTE);

        // height is originally in decimeters, convert to meters
        return queryRes ? queryRes.height * 10 : null;
    }

    async getSinglePokemonWeight(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.weight')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId })
            .cache(MINUTE);

        // weight is originally in hectograms, convert to kilograms
        return queryRes ? queryRes.weight * 10 : null;
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
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.is_baby : null;
    }

    async getSinglePokemonColor(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('pc.name')
            .from('pokemon_v2_pokemoncolor as pc')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'ps.pokemon_color_id',
                'pc.id'
            )
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getSinglePokemonDominantColor(pokemonId) {
        try {
            const rgbValues = await ColorThief.getColor(
                `https://raw.githubusercontent.com/jgarrow/graphql-server-pokeapi/master/server/src/img/${pokemonId}.png`
            );

            const color = rgbValues
                ? {
                      r: rgbValues[0],
                      g: rgbValues[1],
                      b: rgbValues[2],
                  }
                : null;

            const light = color ? lightenDarkenColor(color, 60) : null;
            const dark = color ? lightenDarkenColor(color, -60) : null;
            const original = rgbValues
                ? `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`
                : null;

            return { light, dark, original, ...color };
        } catch (err) {
            console.log('Error getting color: ', err);
            return err;
        }
    }

    async getSinglePokemonCaptureRate(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('ps.capture_rate')
            .from('pokemon_v2_pokemonspecies as ps')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.capture_rate : null;
    }

    async getSinglePokemonGrowthRate(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('gr.name')
            .from('pokemon_v2_growthrate as gr')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'ps.growth_rate_id',
                'gr.id'
            )
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getSinglePokemonShape(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('sh.name')
            .from('pokemon_v2_pokemonshape as sh')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'ps.pokemon_shape_id',
                'sh.id'
            )
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getSinglePokemonBaseHappiness(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('ps.base_happiness')
            .from('pokemon_v2_pokemonspecies as ps')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.base_happiness : null;
    }

    async getSinglePokemonBaseExperience(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('base_experience')
            .from('pokemon_v2_pokemon')
            .where({ id: pokemonId })
            .cache(MINUTE);

        return queryRes ? queryRes.base_experience : null;
    }

    async getSinglePokemonHatchCounter(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('ps.hatch_counter')
            .from('pokemon_v2_pokemonspecies as ps')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.hatch_counter : null;
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
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.gender_rate : null;
    }

    async getSinglePokemonIsDefault(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.is_default')
            .from('pokemon_v2_pokemon as p')
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.is_default : null;
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
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
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
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.pokedex_number : null;
    }

    async getSinglePokemonStats(pokemonId) {
        const queryRes = await this.knex
            .select('pStat.base_stat', 's.name')
            .from('pokemon_v2_pokemonstat as pStat')
            .innerJoin('pokemon_v2_stat as s', 's.id', 'pStat.stat_id')
            .innerJoin('pokemon_v2_pokemon as p', 'p.id', 'pStat.pokemon_id')
            .where('p.id', pokemonId)
            .cache(MINUTE);

        const stats = queryRes ? queryRes.reduce((acc, curr) => {
            const [value, statName] = Object.values(curr)
            acc[statName.replace('-', '_')] = value

            return acc
        }, {}) : null

        return stats;
    }

    async getSinglePokemonGenus(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('psn.genus')
            .from('pokemon_v2_pokemonspeciesname as psn')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'psn.pokemon_species_id'
            )
            .where('p.id', pokemonId)
            .where('psn.language_id', 9) // language_id for US English is 9
            .cache(MINUTE);

        return queryRes ? queryRes.genus : null;
    }

    async getSinglePokemonGenderRate(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('ps.gender_rate')
            .from('pokemon_v2_pokemonspecies as ps')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        const genderRatePercent =
            queryRes.gender_rate === -1 ? -1 : (queryRes.gender_rate / 8) * 100;

        return genderRatePercent;
    }

    async getSinglePokemonVariants(pokemonId) {
        // get all forms/variants for a given pokemon id

        // get pokemon species id
        const speciesIdRes = await this.knex
            .first()
            .select('ps.id')
            .from('pokemon_v2_pokemonspecies as ps')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId);

        // get ids of all pokemon associated with pokemon species id
        const queryRes = await this.knex
            .select('p.id')
            .from('pokemon_v2_pokemon as p')
            .where('p.pokemon_species_id', speciesIdRes.id);

        const variantIds = queryRes.map((mon) => mon.id);

        return queryRes ? variantIds : null;
    }

    async getSinglePokemonTypeIds(pokemonId) {
        const queryRes = await this.knex
            .select('t.type_id')
            .from('pokemon_v2_pokemontype as t')
            .where('t.pokemon_id', pokemonId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.type_id);

        return typeIds;
    }

    async getSinglePokemonEggGroupIds(pokemonId) {
        const queryRes = await this.knex
            .select('eg.egg_group_id')
            .from('pokemon_v2_pokemonegggroup as eg')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'eg.pokemon_species_id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        const eggGroupIds = queryRes.map(
            (eggGroupObj) => eggGroupObj.egg_group_id
        );

        return eggGroupIds;
    }

    async getSinglePokemonAbilityIds(pokemonId) {
        const queryRes = await this.knex
            .select('pa.ability_id')
            .from('pokemon_v2_pokemonability as pa')
            .where('pa.pokemon_id', pokemonId)
            .cache(MINUTE);

        const abilityIds = queryRes.map((ability) => ability.ability_id);

        return abilityIds;
    }

    async getSinglePokemonGameIds(pokemonId) {
        const queryRes = await this.knex
            .select('pgi.version_id')
            .from('pokemon_v2_pokemongameindex as pgi')
            .where('pgi.pokemon_id', pokemonId)
            .cache(MINUTE);

        const gameIds = queryRes.map((gameObj) => gameObj.version_id);

        return gameIds ? gameIds : null;
    }

    async getSinglePokemonLocationIds(pokemonId) {
        const queryRes = await this.knex
            .select('la.location_id')
            .from('pokemon_v2_locationarea as la')
            .innerJoin(
                'pokemon_v2_encounter as e',
                'e.location_area_id',
                'la.id'
            )
            .where('e.pokemon_id', pokemonId)
            .cache(MINUTE);

        const locationIds = queryRes.map(
            (locationObj) => locationObj.location_id
        );

        const locationIdsWithoutDuplicates = [...new Set(locationIds)];

        return locationIdsWithoutDuplicates
            ? locationIdsWithoutDuplicates
            : null;
    }

    async getSinglePokemonMoveIds(pokemonId, gameName) {
        const queryRes = await this.knex
            .select('pm.move_id')
            .from('pokemon_v2_pokemonmove as pm')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'pm.version_group_id'
            )
            .where('pm.pokemon_id', pokemonId)
            .where('v.name', gameName)
            .cache(MINUTE);

        const moveIds = queryRes.map((moveObj) => moveObj.move_id);

        const moveIdsWithoutDuplicates = [...new Set(moveIds)];

        return moveIdsWithoutDuplicates ? moveIdsWithoutDuplicates : null;
    }

    // not the best way to get them, but it works at least for now
    async getSinglePokemonEvolutionCriteria(pokemonId) {
        const queryRes = await this.knex
            .select(
                'pe.min_level',
                'pe.time_of_day',
                'pe.min_happiness',
                'pe.min_beauty',
                'pe.min_affection',
                'pe.needs_overworld_rain',
                'pe.turn_upside_down',
                'pe.gender_id',
                'pe.known_move_id',
                'pe.known_move_type_id',
                'pe.evolution_item_id',
                'pe.held_item_id',
                'pe.location_id'
            )
            .from('pokemon_v2_pokemonevolution as pe')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'pe.evolved_species_id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        const evolutionCriteriaPromise = queryRes
            .map((criteriaObj) => {
                const criteriaKeys = Object.keys(criteriaObj).filter(
                    (key) => criteriaObj[key] && criteriaObj[key] !== ''
                );

                return criteriaKeys
                    .map((key) => {
                        const returnObj = {
                            evolution_criteria_name: key,
                            value:
                                typeof criteriaObj[key] === 'object'
                                    ? criteriaObj[key].name
                                    : criteriaObj[key].toString(),
                        };

                        if (
                            returnObj.evolution_criteria_name ===
                                'held_item_id' ||
                            returnObj.evolution_criteria_name ===
                                'evolution_item_id'
                        ) {
                            returnObj.itemId = returnObj.value;
                        } else if (
                            returnObj.evolution_criteria_name ===
                            'known_move_id'
                        ) {
                            returnObj.moveId = returnObj.value;
                        } else if (
                            returnObj.evolution_criteria_name ===
                            'known_move_type_id'
                        ) {
                            returnObj.typeId = returnObj.value;
                        } else if (
                            returnObj.evolution_criteria_name === 'location_id'
                        ) {
                            returnObj.locationId = returnObj.value;
                        } else if (
                            returnObj.evolution_criteria_name === 'gender_id'
                        ) {
                            returnObj.genderId = returnObj.value;
                        }

                        // get rid of id at the end of evolution_criteria_name
                        const parsedKey = key.split('_');

                        if (parsedKey[parsedKey.length - 1] === 'id') {
                            returnObj.evolution_criteria_name = key.slice(
                                0,
                                -3
                            );
                        }

                        return returnObj;
                    })
                    .flat();
            })
            .flat();

        const evolutionCriteria = await Promise.all(evolutionCriteriaPromise);

        return evolutionCriteria.length ? evolutionCriteria : null;
    }

    async getSinglePokemonEvolutionTrigger(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('et.name')
            .from('pokemon_v2_evolutiontrigger as et')
            .innerJoin(
                'pokemon_v2_pokemonevolution as pe',
                'pe.evolution_trigger_id',
                'et.id'
            )
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'pe.evolved_species_id'
            )
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getSinglePokemonEvolvesFromPokemonId(pokemonId) {
        // check if requested pokemon is a mega evolution
        const nameRes = await this.knex
            .first()
            .select('p.name', 'p.pokemon_species_id')
            .from('pokemon_v2_pokemon as p')
            .where('p.id', pokemonId);

        const isMega = nameRes.name.includes('-mega');
        let evolvesFromId = null;

        if (isMega) {
            // get all pokemon ids associated with the pokemon species id
            const multipleFormsRes = await this.knex
                .select('p.id', 'p.name', 'p.is_default')
                .from('pokemon_v2_pokemon as p')
                .where('p.pokemon_species_id', nameRes.pokemon_species_id);

            evolvesFromId = multipleFormsRes.filter(
                (mon) =>
                    mon.id !== pokemonId &&
                    mon.is_default &&
                    mon.name !== nameRes.name
            );
            evolvesFromId = evolvesFromId[0].id;
        } else {
            const evolvesFromSpeciesId = await this.knex
                .first()
                .select('ps.evolves_from_species_id')
                .from('pokemon_v2_pokemonspecies as ps')
                .innerJoin(
                    'pokemon_v2_pokemon as p',
                    'p.pokemon_species_id',
                    'ps.id'
                )
                .where('p.id', pokemonId)
                .cache(MINUTE);

            const queryRes = await this.knex
                .first()
                .select('p.id')
                .from('pokemon_v2_pokemon as p')
                .where(
                    'p.pokemon_species_id',
                    evolvesFromSpeciesId.evolves_from_species_id
                )
                .cache(MINUTE);

            evolvesFromId = queryRes ? queryRes.id : null;
        }

        // returns null if the pokemon doesn't evolve from anything
        return evolvesFromId ? evolvesFromId : null;
    }

    async getSinglePokemonEvolvesToPokemonId(pokemonId) {
        // get pokemon who evolves from my current pokemonId
        const queryRes = await this.knex
            .select('p.id', 'p.name')
            .from('pokemon_v2_pokemon as p')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'ps.id',
                'p.pokemon_species_id'
            )
            .where('ps.evolves_from_species_id', pokemonId)
            .cache(MINUTE);

        // for Kirlia, queryRes comes back like this:
        // [
        //     { id: 282, name: 'gardevoir' },
        //     { id: 10051, name: 'gardevoir-mega' },
        //     { id: 475, name: 'gallade' },
        //     { id: 10068, name: 'gallade-mega' },
        // ];

        // remove any mega evolutions
        const filteredRes = queryRes.filter(
            (mon) =>
                !mon.name.includes('-mega') &&
                !mon.name.includes('-alola') &&
                !mon.name.includes('-totem')
        );

        const pokemonIds = filteredRes.map((pokemonObj) => pokemonObj.id);

        // check if requested pokemon is a mega evolution
        const nameRes = await this.knex
            .first()
            .select('p.name')
            .from('pokemon_v2_pokemon as p')
            .where('p.id', pokemonId);

        let megas = [];

        // if it's not a mega, check if it can mega evolve
        if (!nameRes.name.includes('-mega')) {
            // get pokemon species id of requested pokeon
            const res = await this.knex
                .first()
                .select('p.pokemon_species_id')
                .from('pokemon_v2_pokemon as p')
                .where('p.id', pokemonId);

            // get all pokemon ids associated with the pokemon species id
            const multipleFormsRes = await this.knex
                .select('p.id', 'p.name')
                .from('pokemon_v2_pokemon as p')
                .where('p.pokemon_species_id', res.pokemon_species_id);

            // get all of the ids for the megas
            megas = multipleFormsRes.filter(
                (mon) => mon.id !== pokemonId && mon.name.includes('-mega')
            );
            megas = megas.map((obj) => obj.id);
        }

        // return either array of ints (pokemon ids) or null
        if (megas.length) {
            return megas;
        } else if (pokemonIds.length) {
            return pokemonIds;
        } else {
            null;
        }
    }

    // Pokedex entry methods

    async getSinglePokemonPokedexEntries(pokemonId) {
        const queryRes = await this.knex
            .select('ft.flavor_text', 'v.id')
            .from('pokemon_v2_pokemonspeciesflavortext as ft')
            // .innerJoin(
            //     'pokemon_v2_pokemon as p',
            //     'p.pokemon_id',
            //     'ft.pokemon_id'
            // )
            .innerJoin('pokemon_v2_version as v', 'v.id', 'ft.version_id')
            .where('ft.language_id', 9)
            .where('ft.pokemon_id', pokemonId)
            // .where('p.id', pokemonId)
            .cache(MINUTE);

        const dexEntries = queryRes
            ? queryRes.map((entry) => {
                  // make all whitespace consistent
                  entry.flavor_text = entry.flavor_text.replace(/\s/gm, ' ');

                  return { description: entry.flavor_text, gameId: entry.id };
              })
            : null;

        return dexEntries;
    }

    // database isn't updated -- there are image files, but a lot of entries in the db still have null values
    // this will return a file path regardless of whether or not there is an image at that path
    // will have to check on client side if exists
    async getSinglePokemonSprites(pokemonId) {
        // const baseFilePath = 'src/images/sprites/pokemon';
        const baseFilePath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;
        let front_default_img = `${baseFilePath}/${pokemonId}.png`;

        // try if pokemon/pokemonId.sprites === null, check sprites in .form, parse the image url and create it dynamically

        const nameQuery = await this.knex
            .first()
            .select('p.name')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId })
            .cache(MINUTE);

        const name = nameQuery.name;

        if (name.includes('alola')) {
            const alolanQuery = await this.knex
                .first()
                .select('pfs.sprites')
                .from('pokemon_v2_pokemonformsprites as pfs')
                .innerJoin('pokemon_v2_pokemonform as pf', 'pf.id', 'pfs.id')
                .where('pf.pokemon_id', pokemonId)
                .cache(MINUTE);

            front_default_img = alolanQuery.sprites;
            front_default_img = `${baseFilePath}/${pokemonId}-alola.png`;
        }

        return {
            front_default: front_default_img,
            front_female: `${baseFilePath}/female/${pokemonId}.png`,
            front_shiny: `${baseFilePath}/shiny/${pokemonId}.png`,
            front_shiny_female: `${baseFilePath}/shiny/female/${pokemonId}.png`,
            back_default: `${baseFilePath}/back/${pokemonId}.png`,
            back_female: `${baseFilePath}/back/female/${pokemonId}.png`,
            back_shiny: `${baseFilePath}/back/shiny/${pokemonId}.png`,
            back_shiny_female: `${baseFilePath}/back/shiny/female/${pokemonId}.png`,
        };
    }
}

module.exports = PokemonDatabase;