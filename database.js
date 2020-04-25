// https://github.com/cvburgess/SQLDataSource

const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 1000;

class Database extends SQLDataSource {
    async getAllPokemonIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_pokemon')
            .cache(MINUTE);

        const pokemonIds = queryRes.map((pokemon) => pokemon.id);

        return pokemonIds;
    }

    async getAllAbilityIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_ability');

        const abilityIds = queryRes.map((ability) => {
            return { abilityId: ability.id };
        });

        return abilityIds;
    }

    async getAllTypeIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_type');

        const typeIds = queryRes.map((type) => type.id);

        return typeIds;
    }

    async getSinglePokemonName(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.name')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId });

        return queryRes.name;
    }

    async getAllEggGroupIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_egggroup');

        const eggGroupIds = queryRes.map((eggGroup) => eggGroup.id);

        return eggGroupIds;
    }

    async getAllLocationIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_location');

        const locationIds = queryRes.map((location) => location.id);

        return locationIds;
    }

    async getAllMoveIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_move');

        const moveIds = queryRes.map((move) => {
            return { moveId: move.id };
        });

        return moveIds;
    }

    async getAllGameIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_version');

        const gameIds = queryRes.map((game) => game.id);

        return gameIds;
    }

    async getAllRegionIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_region');

        const regionIds = queryRes.map((region) => region.id);

        return regionIds;
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
            .where('psn.language_id', 9); // language_id for US English is 9

        return queryRes.genus;
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
            .where('p.id', pokemonId);

        const genderRatePercent =
            queryRes.gender_rate === -1 ? -1 : (queryRes.gender_rate / 8) * 100;

        return genderRatePercent;
    }

    // Type methods

    async getSinglePokemonTypeIds(pokemonId) {
        const queryRes = await this.knex
            .select('t.type_id')
            .from('pokemon_v2_pokemontype as t')
            .where('t.pokemon_id', pokemonId);

        const typeIds = queryRes.map((typeObj) => typeObj.type_id);

        return typeIds;
    }

    async getTypeName(typeId) {
        const queryRes = await this.knex
            .first()
            .select('t.name', 't.type_id')
            .from('pokemon_v2_typename as t')
            .where('t.type_id', typeId)
            .where('t.language_id', 9);

        return queryRes.name;
    }

    async getTypeDoubleDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 200) // 200 = x2 damage
            .where('te.target_type_id', typeId);

        const typeIds = queryRes.map((typeObj) => typeObj.damage_type_id);

        return typeIds;
    }

    async getTypeHalfDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 50) // 50 = 1/2 damage
            .where('te.target_type_id', typeId);

        const typeIds = queryRes.map((typeObj) => typeObj.damage_type_id);

        return typeIds;
    }

    async getTypeNoDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 0) // 0 = no damage
            .where('te.target_type_id', typeId);

        const typeIds = queryRes.map((typeObj) => typeObj.damage_type_id);

        return typeIds;
    }

    async getTypeDoubleDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 200)
            .where('te.damage_type_id', typeId);

        const typeIds = queryRes.map((typeObj) => typeObj.target_type_id);

        return typeIds;
    }

    async getTypeHalfDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 50)
            .where('te.damage_type_id', typeId);

        const typeIds = queryRes.map((typeObj) => typeObj.target_type_id);

        return typeIds;
    }

    async getTypeNoDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 0)
            .where('te.damage_type_id', typeId);

        const typeIds = queryRes.map((typeObj) => typeObj.target_type_id);

        return typeIds;
    }

    async getPokemonIdsForType(typeId) {
        const queryRes = await this.knex
            .select('t.pokemon_id')
            .from('pokemon_v2_pokemontype as t')
            .where('t.type_id', typeId);

        const typeIds = queryRes.map((typeObj) => typeObj.pokemon_id);

        return typeIds;
    }

    // Egg group methods

    async getSinglePokemonEggGroupIds(pokemonId) {
        const queryRes = await this.knex
            .select('eg.egg_group_id')
            .from('pokemon_v2_pokemonegggroup as eg')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'eg.pokemon_species_id'
            )
            .where('p.id', pokemonId);

        const eggGroupIds = queryRes.map(
            (eggGroupObj) => eggGroupObj.egg_group_id
        );

        return eggGroupIds;
    }

    async getEggGroupName(eggGroupId) {
        const queryRes = await this.knex
            .first()
            .select('egn.name')
            .from('pokemon_v2_egggroupname as egn')
            .where('egn.egg_group_id', eggGroupId)
            .where('egn.language_id', 9);

        return queryRes.name;
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
            .where('eg.egg_group_id', eggGroupId);

        const pokemonIds = queryRes.map((pokemon) => pokemon.id);

        return pokemonIds;
    }

    // Ability methods

    async getSinglePokemonAbilityIds(pokemonId) {
        const queryRes = await this.knex
            .select('pa.ability_id')
            .from('pokemon_v2_pokemonability as pa')
            .where('pa.pokemon_id', pokemonId);

        const abilityIds = queryRes.map((ability) => ability.ability_id);

        return abilityIds;
    }

    async getSinglePokemonAbilitiesIsHidden(pokemonId, abilityId) {
        const queryRes = await this.knex
            .first()
            .select('pa.is_hidden')
            .from('pokemon_v2_pokemonability as pa')
            .where('pa.pokemon_id', pokemonId)
            .where('pa.ability_id', abilityId);

        return queryRes.is_hidden;
    }

    async getAbilityName(abilityId) {
        const queryRes = await this.knex
            .first()
            .select('an.name')
            .from('pokemon_v2_abilityname as an')
            .where('an.ability_id', abilityId)
            .where('an.language_id', 9);

        return queryRes.name;
    }

    async getAbilityPokemonIds(abilityId) {
        const queryRes = await this.knex
            .select('pa.pokemon_id')
            .from('pokemon_v2_pokemonability as pa')
            .where('pa.ability_id', abilityId);

        const pokemonIds = queryRes.map((pokemon) => pokemon.pokemon_id);

        return pokemonIds;
    }

    async getAbilityEffect(abilityId) {
        const queryRes = await this.knex
            .first()
            .select('e.short_effect')
            .from('pokemon_v2_abilityeffecttext as e')
            .where('e.ability_id', abilityId)
            .where('e.language_id', 9);

        return queryRes.short_effect;
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
            });

        // if no game parameter is provided, the query returns all of the descriptions
        // return the description from the most recent game
        return queryRes[queryRes.length - 1].flavor_text;
    }

    // Game methods

    async getSinglePokemonGameIds(pokemonId) {
        const queryRes = await this.knex
            .select('pgi.version_id')
            .from('pokemon_v2_pokemongameindex as pgi')
            .where('pgi.pokemon_id', pokemonId);

        const gameIds = queryRes.map((gameObj) => gameObj.version_id);

        return gameIds;
    }

    async getGameName(gameId) {
        const queryRes = await this.knex
            .first()
            .select('vn.name')
            .from('pokemon_v2_versionname as vn')
            .where('vn.version_id', gameId)
            .where('vn.language_id', 9);

        return queryRes.name;
    }

    async getGameGeneration(gameId) {
        const queryRes = await this.knex
            .first()
            .select('gn.name')
            .from('pokemon_v2_generationname as gn')
            .innerJoin(
                'pokemon_v2_versiongroup as vg',
                'vg.generation_id',
                'gn.generation_id'
            )
            .innerJoin('pokemon_v2_version as v', 'v.version_group_id', 'vg.id')
            .where('v.id', gameId)
            .where('gn.language_id', 9);

        return queryRes.name;
    }

    async getGameRegionIds(gameId) {
        const queryRes = await this.knex
            .select('vgr.region_id')
            .from('pokemon_v2_versiongroupregion as vgr')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'vgr.version_group_id'
            )
            .where('v.id', gameId);

        const regionIds = queryRes.map((region) => region.region_id);

        return regionIds;
    }

    // Region methods

    async getRegionName(regionId) {
        console.log('regionId: ', regionId);
        const queryRes = await this.knex
            .first()
            .select('rn.name')
            .from('pokemon_v2_regionname as rn')
            .where('rn.region_id', regionId)
            .where('rn.language_id', 9);

        return queryRes.name;
    }

    async getRegionGameIds(regionId) {
        const queryRes = await this.knex
            .select('v.id')
            .from('pokemon_v2_version as v')
            .innerJoin(
                'pokemon_v2_versiongroupregion as vgr',
                'vgr.version_group_id',
                'v.version_group_id'
            )
            .where('vgr.region_id', regionId);

        const gameIds = queryRes.map((gameObj) => gameObj.id);

        return gameIds;
    }

    async getRegionLocationIds(regionId) {
        const queryRes = await this.knex
            .select('l.id')
            .from('pokemon_v2_location as l')
            .where('l.region_id', regionId);

        const locationIds = queryRes.map((locationObj) => locationObj.id);

        return locationIds;
    }

    // Location methods
    async getSinglePokemonLocationIds(pokemonId) {
        const queryRes = await this.knex
            .select('la.location_id')
            .from('pokemon_v2_locationarea as la')
            .innerJoin(
                'pokemon_v2_encounter as e',
                'e.location_area_id',
                'la.id'
            )
            .where('e.pokemon_id', pokemonId);

        const locationIds = queryRes.map(
            (locationObj) => locationObj.location_id
        );

        const locationIdsWithoutDuplicates = [...new Set(locationIds)];

        return locationIdsWithoutDuplicates;
    }

    async getLocationName(locationId) {
        const queryRes = await this.knex
            .first()
            .select('l.name')
            .from('pokemon_v2_location as l')
            .where('l.id', locationId);

        return queryRes.name;
    }

    async getLocationRegionId(locationId) {
        const queryRes = await this.knex
            .first()
            .select('l.region_id')
            .from('pokemon_v2_location as l')
            .where('l.id', locationId);

        return queryRes.region_id;
    }

    async getLocationGameIds(locationId) {
        const queryRes = await this.knex
            .select('v.id')
            .from('pokemon_v2_version as v')
            .innerJoin(
                'pokemon_v2_versiongroupregion as vgr',
                'vgr.version_group_id',
                'v.version_group_id'
            )
            .innerJoin(
                'pokemon_v2_location as l',
                'l.region_id',
                'vgr.region_id'
            )
            .where('l.id', locationId);

        const gameIds = queryRes.map((gameObj) => gameObj.id);

        return gameIds.length ? gameIds : null;
    }

    async getLocationPokemonIds(locationId) {
        const queryRes = await this.knex
            .select('e.pokemon_id')
            .from('pokemon_v2_encounter as e')
            .innerJoin(
                'pokemon_v2_locationarea as la',
                'la.id',
                'e.location_area_id'
            )
            .where('la.location_id', locationId);

        const pokemonIds = queryRes.map((pokemonObj) => pokemonObj.pokemon_id);

        return pokemonIds;
    }

    // Move methods
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
            .where('v.name', gameName);

        const moveIds = queryRes.map((moveObj) => moveObj.move_id);

        const moveIdsWithoutDuplicates = [...new Set(moveIds)];

        return moveIdsWithoutDuplicates;
    }

    async getMoveName(moveId) {
        const queryRes = await this.knex
            .first()
            .select('mn.name')
            .from('pokemon_v2_movename as mn')
            .where('mn.move_id', moveId)
            .where('mn.language_id', 9);

        return queryRes.name;
    }

    async getMoveTypeId(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.type_id')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId);

        return queryRes.type_id;
    }

    async getMovePower(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.power')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId);

        return queryRes.power;
    }

    async getMovePp(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.pp')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId);

        return queryRes.pp;
    }

    async getMoveAccuracy(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.accuracy')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId);

        return queryRes.accuracy;
    }

    async getMovePriority(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.priority')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId);

        return queryRes.priority;
    }

    async getMoveEffectChance(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.move_effect_chance')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId);

        return queryRes.move_effect_chance;
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
            .where('m.id', moveId);

        return queryRes.name;
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
            .where('e.language_id', 9);

        // replace the string "$effect_chance" with the actual percentage
        return queryRes.short_effect.replace(
            '$effect_chance',
            queryRes.move_effect_chance
        );
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
            });

        // if no game parameter is provided, the query returns all of the descriptions
        // return the description from the most recent game, with the white space all normalized with spaces
        const normalizedWhiteSpace = queryRes.length
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
            .where('m.move_id', moveId);

        return queryRes.name;
    }

    async getSinglePokemonMoveLearnMethod(pokemonId, moveId, gameName) {
        const queryRes = await this.knex
            .first()
            .select('mlm.name')
            .from('pokemon_v2_movelearnmethod as mlm')
            .innerJoin(
                'pokemon_v2_pokemonmove as pm',
                'pm.move_learn_method_id',
                'mlm.id'
            )
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'pm.version_group_id'
            )
            .where('pm.pokemon_id', pokemonId)
            .where('pm.move_id', moveId)
            .where('v.name', gameName);

        return queryRes.name;
    }

    async getSinglePokemonMoveLevelLearnedAt(pokemonId, moveId, gameName) {
        const queryRes = await this.knex
            .first()
            .select('pm.level')
            .from('pokemon_v2_pokemonmove as pm')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'pm.version_group_id'
            )
            .where('pm.pokemon_id', pokemonId)
            .where('pm.move_id', moveId)
            .where('v.name', gameName);

        return queryRes.level;
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
            .where('m.id', moveId);

        const gameIds = queryRes.map((gameObj) => gameObj.id);
        return gameIds;
    }

    // Evolution methods

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
            .where('p.id', pokemonId);

        const evolutionCriteriaPromise = queryRes
            .map((criteriaObj) => {
                const criteriaKeys = Object.keys(criteriaObj).filter(
                    (key) => criteriaObj[key] && criteriaObj[key] !== ''
                );

                return criteriaKeys
                    .map(async (key) => {
                        const returnObj = {
                            name: key,
                            value:
                                typeof criteriaObj[key] === 'object'
                                    ? criteriaObj[key].name
                                    : criteriaObj[key].toString(),
                        };

                        // for the keys that are ids, get their names
                        if (
                            key === 'held_item_id' ||
                            key === 'evolution_item_id'
                        ) {
                            const itemQueryRes = await this.knex
                                .first()
                                .select('i.name')
                                .from('pokemon_v2_item as i')
                                .where('i.id', criteriaObj[key]);

                            returnObj.value = itemQueryRes.name;
                        } else if (key === 'known_move_id') {
                            const moveQueryRes = await this.knex
                                .first()
                                .select('mn.name')
                                .from('pokemon_v2_movename as mn')
                                .where('mn.move_id', criteriaObj[key])
                                .where('mn.language_id', 9);

                            returnObj.value = moveQueryRes.name;
                        } else if (key === 'known_move_type_id') {
                            const moveTypeQueryRes = await this.knex
                                .first()
                                .select('t.name')
                                .from('pokemon_v2_typename as t')
                                .innerJoin(
                                    'pokemon_v2_move as m',
                                    'm.type_id',
                                    't.type_id'
                                )
                                .where('m.type_id', criteriaObj[key])
                                .where('t.language_id', 9);

                            returnObj.value = moveTypeQueryRes.name;
                        } else if (key === 'location_id') {
                            const locationNameQueryRes = await this.knex
                                .first()
                                .select('l.name')
                                .from('pokemon_v2_location as l')
                                .where('l.id', criteriaObj[key]);

                            returnObj.value = locationNameQueryRes.name;
                        } else if (key === 'gender_id') {
                            const genderQueryRes = await this.knex
                                .first()
                                .select('g.name')
                                .from('pokemon_v2_gender as g')
                                .where('g.id', criteriaObj[key]);

                            returnObj.value = genderQueryRes.name;
                        }

                        const parsedKey = key.split('_');

                        if (parsedKey[parsedKey.length - 1] === 'id') {
                            returnObj.name = key.slice(0, -3);
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
            .where('p.id', pokemonId);

        return queryRes ? queryRes.name : null;
    }

    async getSinglePokemonEvolvesFromPokemonId(pokemonId) {
        const evolvesFromSpeciesId = this.knex
            .first()
            .select('ps.evolves_from_species_id')
            .from('pokemon_v2_pokemonspecies as ps')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ps.id'
            )
            .where('p.id', pokemonId);

        const queryRes = await this.knex
            .first()
            .select('p.id')
            .from('pokemon_v2_pokemon as p')
            .where('p.pokemon_species_id', evolvesFromSpeciesId);

        // returns null if the pokemon doesn't evolve from anything
        return queryRes ? queryRes.id : null;
    }

    async getSinglePokemonEvolvesToPokemonId(pokemonId) {
        // get pokemon who evolves from my current pokemonId
        const queryRes = await this.knex
            .select('p.id')
            .from('pokemon_v2_pokemon as p')
            .innerJoin(
                'pokemon_v2_pokemonspecies as ps',
                'ps.id',
                'p.pokemon_species_id'
            )
            .where('ps.evolves_from_species_id', pokemonId);

        const pokemonIds = queryRes.map((pokemonObj) => pokemonObj.id);
        return pokemonIds.length ? pokemonIds : null;
    }

    // Pokedex entry methods

    async getSinglePokemonPokedexEntries(pokemonId) {
        const queryRes = await this.knex
            .select('ft.flavor_text', 'v.id')
            .from('pokemon_v2_pokemonspeciesflavortext as ft')
            .innerJoin(
                'pokemon_v2_pokemon as p',
                'p.pokemon_species_id',
                'ft.pokemon_species_id'
            )
            .innerJoin('pokemon_v2_version as v', 'v.id', 'ft.version_id')
            .where('ft.language_id', 9)
            .where('p.id', pokemonId);

        const dexEntries = queryRes.map((entry) => {
            // make all whitespace consistent
            entry.flavor_text = entry.flavor_text.replace(/\s/gm, ' ');

            return { description: entry.flavor_text, gameId: entry.id };
        });

        return dexEntries;
    }

    // database isn't updated -- there are image files, but a lot of entries in the db still have null values
    // this will return a file path regardless of whether or not there is an image at that path
    // will have to check on client side if exists
    async getSinglePokemonSprites(pokemonId) {
        const baseFilePath = '~/Dev/pokedex/server/media/sprites/pokemon';

        return {
            front_default: `${baseFilePath}/${pokemonId}.png`,
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

module.exports = Database;
