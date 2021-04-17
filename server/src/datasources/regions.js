const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class RegionDatabase extends SQLDataSource {
    async getAllRegionIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_region')
            .cache(MINUTE);

        const regionIds = queryRes.map((region) => region.id);

        return regionIds;
    }

    async getRegionName(regionId) {
        const queryRes = await this.knex
            .first()
            .select('rn.name')
            .from('pokemon_v2_regionname as rn')
            .where('rn.region_id', regionId)
            .where('rn.language_id', 9)
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
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

        return gameIds ? gameIds : null;
    }

    async getRegionLocationIds(regionId) {
        const queryRes = await this.knex
            .select('l.id')
            .from('pokemon_v2_location as l')
            .where('l.region_id', regionId)
            .cache(MINUTE);

        const locationIds = queryRes.map((locationObj) => locationObj.id);

        return locationIds ? locationIds : null;
    }
}

module.exports = RegionDatabase;