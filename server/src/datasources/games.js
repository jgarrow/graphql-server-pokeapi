const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class GameDatabase extends SQLDataSource {
    async getAllGameIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_version')
            .cache(MINUTE);

        const gameIds = queryRes.map((game) => game.id);

        return gameIds;
    }

    async getGameName(gameId) {
        let queryRes = await this.knex
            .first()
            .select('v.name')
            .from('pokemon_v2_version as v')
            .where('v.id', gameId);

        let name = queryRes.name;

        if (!queryRes.name) {
            queryRes = await this.knex
                .first()
                .select('vn.name')
                .from('pokemon_v2_versionname as vn')
                .where('vn.version_id', gameId)
                .where('vn.language_id', 9)
                .cache(MINUTE);
        }

        return name ? name : null;
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

        return queryRes ? queryRes.name : null;
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

        return regionIds ? regionIds : null;
    }
}

module.exports = GameDatabase