const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class GenderDatabase extends SQLDataSource {
    async getGenderName(genderId) {
        const queryRes = await this.knex
            .first()
            .select('name')
            .from('pokemon_v2_gender')
            .where({ id: genderId })
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }
}

module.exports = GenderDatabase