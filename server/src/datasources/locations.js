const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class LocationDatabase extends SQLDataSource {
    async getAllLocationIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_location')
            .cache(MINUTE);

        const locationIds = queryRes.map((location) => location.id);

        return locationIds;
    }

    async getLocationName(locationId) {
        const queryRes = await this.knex
            .first()
            .select('l.name')
            .from('pokemon_v2_location as l')
            .where('l.id', locationId)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getLocationRegionId(locationId) {
        const queryRes = await this.knex
            .first()
            .select('l.region_id')
            .from('pokemon_v2_location as l')
            .where('l.id', locationId)
            .cache(MINUTE);

        return queryRes ? queryRes.region_id : null;
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

        return pokemonIds ? pokemonIds : null;
    }
}

module.exports = LocationDatabase