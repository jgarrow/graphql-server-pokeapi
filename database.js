// https://github.com/cvburgess/SQLDataSource

const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

// TODO:
// separate ID's for alternate forms
// original PokeAPI has form urls under `/pokemon-species/#`, under `varieties`
// can parse out those ID's to separate them out from the rest
// pokemon_v2_pokemonform table -- those with a form_name != ""

class Database extends SQLDataSource {
    async getAllPokemonIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_pokemon')
            .cache(MINUTE);
        // console.log('queryRes: ', queryRes)

        const pokemonIds = queryRes.map((pokemon) => pokemon.id);
        // console.log('pokemonIds: ', pokemonIds)

        return pokemonIds;
    }

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

    async getAllTypeIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_type');

        const typeIds = queryRes.map((type) => type.id);

        return typeIds;
    }

    async getSinglePokemonName(pokemonId) {
        // console.log('pokemonId: ', pokemonId)
        const queryRes = await this.knex
            .first()
            .select('p.name')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId })
            .cache(MINUTE);

        // console.log('queryRes: ', queryRes)
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
            .from('pokemon_v2_location')
            .cache(MINUTE);

        const locationIds = queryRes.map((location) => location.id);

        return locationIds;
    }

    async getAllMoveIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_move').cache(MINUTE);

        const moveIds = queryRes.map((move) => {
            return { moveId: move.id };
        });

        return moveIds;
    }

    async getAllGameIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_version')
            .cache(MINUTE);

        const gameIds = queryRes.map((game) => game.id);

        return gameIds;
    }

    async getAllRegionIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_region').cache(MINUTE);

        const regionIds = queryRes.map((region) => region.id);

        return regionIds;
    }

    async getAllItemIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_item').cache(MINUTE);

        const itemIds = queryRes.map((item) => item.id);

        return itemIds;
    }

    async getSinglePokemonHeight(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.height')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId })
            .cache(MINUTE);

        return queryRes.height;
    }

    async getSinglePokemonWeight(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('p.weight')
            .from('pokemon_v2_pokemon as p')
            .where({ id: pokemonId })
            .cache(MINUTE);

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
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes.is_baby;
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

        return queryRes.name;
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

        return queryRes.capture_rate;
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

        return queryRes.name;
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

        return queryRes.name;
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

        return queryRes.base_happiness;
    }

    async getSinglePokemonBaseExperience(pokemonId) {
        const queryRes = await this.knex
            .first()
            .select('base_experience')
            .from('pokemon_v2_pokemon')
            .where({ id: pokemonId })
            .cache(MINUTE);

        return queryRes.base_experience;
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

        return queryRes.hatch_counter;
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
            .where('p.id', pokemonId)
            .cache(MINUTE);

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
            .where('p.id', pokemonId)
            .cache(MINUTE);

        return queryRes.pokedex_number;
    }

    async getSinglePokemonStats(pokemonId) {
        const queryRes = await this.knex
            .select('pStat.base_stat', 's.name')
            .from('pokemon_v2_pokemonstat as pStat')
            .innerJoin('pokemon_v2_stat as s', 's.id', 'pStat.stat_id')
            .innerJoin('pokemon_v2_pokemon as p', 'p.id', 'pStat.pokemon_id')
            .where('p.id', pokemonId)
            .cache(MINUTE);

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
            .where('psn.language_id', 9) // language_id for US English is 9
            .cache(MINUTE);

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
            .where('p.id', pokemonId)
            .cache(MINUTE);

        const genderRatePercent =
            queryRes.gender_rate === -1 ? -1 : (queryRes.gender_rate / 8) * 100;

        return genderRatePercent;
    }

    // Type methods

    async getSinglePokemonTypeIds(pokemonId) {
        const queryRes = await this.knex
            .select('t.type_id')
            .from('pokemon_v2_pokemontype as t')
            .where('t.pokemon_id', pokemonId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.type_id);

        return typeIds;
    }

    async getTypeName(typeId) {
        const queryRes = await this.knex
            .first()
            .select('t.name')
            .from('pokemon_v2_typename as t')
            .where('t.type_id', typeId)
            .where('t.language_id', 9)
            .cache(MINUTE);

        return queryRes.name;
    }

    async getTypeDoubleDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 200) // 200 = x2 damage
            .where('te.target_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.damage_type_id);

        return typeIds;
    }

    async getTypeHalfDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 50) // 50 = 1/2 damage
            .where('te.target_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.damage_type_id);

        return typeIds;
    }

    async getTypeNoDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 0) // 0 = no damage
            .where('te.target_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.damage_type_id);

        return typeIds;
    }

    async getTypeDoubleDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 200)
            .where('te.damage_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.target_type_id);

        return typeIds;
    }

    async getTypeHalfDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 50)
            .where('te.damage_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.target_type_id);

        return typeIds;
    }

    async getTypeNoDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 0)
            .where('te.damage_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => typeObj.target_type_id);

        return typeIds;
    }

    async getPokemonIdsForType(typeId) {
        const queryRes = await this.knex
            .select('t.pokemon_id')
            .from('pokemon_v2_pokemontype as t')
            .where('t.type_id', typeId)
            .cache(MINUTE);

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
            .where('p.id', pokemonId)
            .cache(MINUTE);

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
            .where('egn.language_id', 9)
            .cache(MINUTE);

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
            .where('eg.egg_group_id', eggGroupId)
            .cache(MINUTE);

        const pokemonIds = queryRes.map((pokemon) => pokemon.id);

        return pokemonIds;
    }

    // Ability methods

    async getSinglePokemonAbilityIds(pokemonId) {
        const queryRes = await this.knex
            .select('pa.ability_id')
            .from('pokemon_v2_pokemonability as pa')
            .where('pa.pokemon_id', pokemonId)
            .cache(MINUTE);

        const abilityIds = queryRes.map((ability) => ability.ability_id);

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

        return queryRes.is_hidden;
    }

    async getAbilityName(abilityId) {
        const queryRes = await this.knex
            .first()
            .select('an.name')
            .from('pokemon_v2_abilityname as an')
            .where('an.ability_id', abilityId)
            .where('an.language_id', 9)
            .cache(MINUTE);

        return queryRes.name;
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
            })
            .cache(MINUTE);

        // if no game parameter is provided, the query returns all of the descriptions
        // return the description from the most recent game
        return queryRes[queryRes.length - 1].flavor_text;
    }

    // Game methods

    async getSinglePokemonGameIds(pokemonId) {
        const queryRes = await this.knex
            .select('pgi.version_id')
            .from('pokemon_v2_pokemongameindex as pgi')
            .where('pgi.pokemon_id', pokemonId)
            .cache(MINUTE);

        const gameIds = queryRes.map((gameObj) => gameObj.version_id);

        return gameIds;
    }

    async getGameName(gameId) {
        console.log('gameId in getGameName: ', gameId)
        // let queryRes = await this.knex
        //     .first()
        //     .select('vn.name')
        //     .from('pokemon_v2_versionname as vn')
        //     .where('vn.version_id', gameId)
        //     .where('vn.language_id', 9)
        //     .cache(MINUTE);

        let queryRes = await this.knex
            .first()
            .select('v.name')
            .from('pokemon_v2_version as v')
            .where('v.id', gameId)
        
        console.log('getGameName initial queryRes: ', queryRes)

        let name = queryRes.name;

        if (!queryRes.name) {
            console.log('hullo hullo')
            // queryRes = await this.knex
            //     .first()
            //     .select('v.name')
            //     .from('pokemon_v2_version as v')
            //     .where('v.id', gameId)
            
            queryRes = await this.knex
                .first()
                .select('vn.name')
                .from('pokemon_v2_versionname as vn')
                .where('vn.version_id', gameId)
                .where('vn.language_id', 9)
                .cache(MINUTE);
            
            console.log('game name secondary queryRes: ', queryRes)
        }
        
        

        return name;
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
            .where('gn.language_id', 9)
            .cache(MINUTE);

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
            .where('v.id', gameId)
            .cache(MINUTE);

        const regionIds = queryRes.map((region) => region.region_id);

        return regionIds;
    }

    // Region methods

    async getRegionName(regionId) {
        const queryRes = await this.knex
            .first()
            .select('rn.name')
            .from('pokemon_v2_regionname as rn')
            .where('rn.region_id', regionId)
            .where('rn.language_id', 9)
            .cache(MINUTE);

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
            .where('vgr.region_id', regionId)
            .cache(MINUTE);

        const gameIds = queryRes.map((gameObj) => gameObj.id);

        return gameIds;
    }

    async getRegionLocationIds(regionId) {
        const queryRes = await this.knex
            .select('l.id')
            .from('pokemon_v2_location as l')
            .where('l.region_id', regionId)
            .cache(MINUTE);

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
            .where('e.pokemon_id', pokemonId)
            .cache(MINUTE);

        const locationIds = queryRes.map(
            (locationObj) => locationObj.location_id
        );

        const locationIdsWithoutDuplicates = [...new Set(locationIds)];

        return locationIdsWithoutDuplicates;
    }

    async getLocationName(locationId) {
        // console.log('locationId: ', locationId);
        const queryRes = await this.knex
            .first()
            .select('l.name')
            .from('pokemon_v2_location as l')
            .where('l.id', locationId)
            .cache(MINUTE);

        // console.log('queryRes: ', queryRes);
        return queryRes.name;
    }

    async getLocationRegionId(locationId) {
        const queryRes = await this.knex
            .first()
            .select('l.region_id')
            .from('pokemon_v2_location as l')
            .where('l.id', locationId)
            .cache(MINUTE);

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
            .where('l.id', locationId)
            .cache(MINUTE);

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
            .where('la.location_id', locationId)
            .cache(MINUTE);

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
            .where('v.name', gameName)
            .cache(MINUTE);

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
            .where('mn.language_id', 9)
            .cache(MINUTE);

        return queryRes.name;
    }

    async getMoveTypeId(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.type_id')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes.type_id;
    }

    async getMovePower(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.power')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes.power;
    }

    async getMovePp(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.pp')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes.pp;
    }

    async getMoveAccuracy(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.accuracy')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes.accuracy;
    }

    async getMovePriority(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.priority')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

        return queryRes.priority;
    }

    async getMoveEffectChance(moveId) {
        const queryRes = await this.knex
            .first()
            .select('m.move_effect_chance')
            .from('pokemon_v2_move as m')
            .where('m.id', moveId)
            .cache(MINUTE);

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
            .where('m.id', moveId)
            .cache(MINUTE);

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
            .where('e.language_id', 9)
            .cache(MINUTE);

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
            })
            .cache(MINUTE);

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
            .where('m.move_id', moveId)
            .cache(MINUTE);

        return queryRes.name;
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

        return queryRes;
    }

    async getSinglePokemonMoveLearnMethodName(learnMethodId) {
        const queryRes = await this.knex
            .first()
            .select('name')
            .from('pokemon_v2_movelearnmethod')
            .where({ id: learnMethodId })
            .cache(MINUTE);

        return queryRes.name;
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
            .where('m.id', moveId)
            .cache(MINUTE);

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
        const evolvesFromSpeciesId = this.knex
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
            .where('p.pokemon_species_id', evolvesFromSpeciesId)
            .cache(MINUTE);

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
            .where('ps.evolves_from_species_id', pokemonId)
            .cache(MINUTE);

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
            .where('p.id', pokemonId)
            .cache(MINUTE);
        
        // console.log('getSinglePokemonPokedexEntries queryRes: ', queryRes)

        const dexEntries = queryRes.map((entry) => {
            // make all whitespace consistent
            entry.flavor_text = entry.flavor_text.replace(/\s/gm, ' ');

            return { description: entry.flavor_text, gameId: entry.id };
        });

        console.log('getSinglePokemonPokedexEntries dexEntries: ', dexEntries)

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
            // console.log('name: ', name);
            const alolanQuery = await this.knex
                .first()
                .select('pfs.sprites')
                .from('pokemon_v2_pokemonformsprites as pfs')
                .innerJoin('pokemon_v2_pokemonform as pf', 'pf.id', 'pfs.id')
                .where('pf.pokemon_id', pokemonId)
                .cache(MINUTE);

            front_default_img = alolanQuery.sprites;
            front_default_img = `${baseFilePath}/${pokemonId}-alola.png`;
            // }
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

    // Item methods

    async getItemName(itemId) {
        const queryRes = await this.knex
            .first()
            .select('in.name')
            .from('pokemon_v2_itemname as in')
            .where({ item_id: itemId })
            .where({ language_id: 9 })
            .cache(MINUTE);

        return queryRes.name;
    }

    async getItemCost(itemId) {
        const queryRes = await this.knex
            .first()
            .select('cost')
            .from('pokemon_v2_item')
            .where({ id: itemId })
            .cache(MINUTE);

        return queryRes.cost;
    }

    async getItemBagPocket(itemId) {
        const queryRes = await this.knex
            .first()
            .select('ipn.name')
            .from('pokemon_v2_itempocketname as ipn')
            .innerJoin(
                'pokemon_v2_itemcategory as ic',
                'ic.item_pocket_id',
                'ipn.item_pocket_id'
            )
            .innerJoin('pokemon_v2_item as i', 'i.item_category_id', 'ic.id')
            .where('i.id', itemId)
            .where('ipn.language_id', 9)
            .cache(MINUTE);

        return queryRes.name;
    }

    async getItemEffect(itemId) {
        const queryRes = await this.knex
            .first()
            .select('short_effect')
            .from('pokemon_v2_itemeffecttext')
            .where({ item_id: itemId })
            .where({ language_id: 9 })
            .cache(MINUTE);

        // normalize the white space
        return queryRes.short_effect.replace(/\s/gm, ' ');
    }

    async getItemDescription(itemId, gameName) {
        const queryRes = await this.knex
            .select('ift.flavor_text')
            .from('pokemon_v2_itemflavortext as ift')
            .innerJoin(
                'pokemon_v2_version as v',
                'v.version_group_id',
                'ift.version_group_id'
            )
            .where('ift.item_id', itemId)
            .where('ift.language_id', 9)
            .modify(function (hasGame) {
                if (gameName) {
                    hasGame.where('v.name', gameName);
                }
            })
            .cache(MINUTE);

        // if no game parameter is provided, the query returns all of the descriptions
        // return the description from the most recent game, with the white space all normalized with spaces
        const normalizedWhiteSpace = queryRes.length
            ? queryRes[queryRes.length - 1].flavor_text.replace(/\s/gm, ' ')
            : null;

        return normalizedWhiteSpace;
    }

    async getItemSprite(itemId) {
        // const baseFilePath = `src/images/sprites/items`;
        const baseFilePath = `https://raw.githubusercontent.com/PokeAPI/sprites/master`;

        const queryRes = await this.knex
            .first()
            .select('i.name')
            .from('pokemon_v2_item as i')
            .where('i.id', itemId)
            .cache(MINUTE);

        return `${baseFilePath}/${queryRes.name}`;
    }

    // database doesn't have data for what games an item is in -- just what games an item has a game_index for -- gen 1 and gen 2 don't have those
    // async getItemGameIds(itemId) {
    //     const queryRes = await this.knex
    //         .select('v.id')
    //         .from('pokemon_v2_version as v')
    //         .innerJoin(
    //             'pokemon_v2_versiongroup as vg',
    //             'v.version_group_id',
    //             'vg.id'
    //         )
    //         .innerJoin(
    //             'pokemon_v2_itemgameindex as igi',
    //             'vg.generation_id',
    //             'igi.generation_id'
    //         )
    //         .where('igi.item_id', itemId);

    //     const gameIds = queryRes.map((game) => game.id);

    //     return gameIds;
    // }

    // Gender methods

    async getGenderName(genderId) {
        const queryRes = await this.knex
            .first()
            .select('name')
            .from('pokemon_v2_gender')
            .where({ id: genderId })
            .cache(MINUTE);

        return queryRes.name;
    }
}

module.exports = Database;
