const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class TypeDatabase extends SQLDataSource {
    async getAllTypeIds() {
        const queryRes = await this.knex.select('id').from('pokemon_v2_type');

        const typeIds = queryRes.map((type) => type.id);

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

        return queryRes ? queryRes.name : null;
    }

    async getTypeDoubleDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 200) // 200 = x2 damage
            .where('te.target_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => {
            return { typeId: typeObj.damage_type_id };
        });
        return typeIds;
    }

    async getTypeHalfDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 50) // 50 = 1/2 damage
            .where('te.target_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => {
            return { typeId: typeObj.damage_type_id };
        });

        return typeIds;
    }

    async getTypeNoDamageFromIds(typeId) {
        const queryRes = await this.knex
            .select('te.damage_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 0) // 0 = no damage
            .where('te.target_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => {
            return { typeId: typeObj.damage_type_id };
        });

        return typeIds;
    }

    async getTypeDoubleDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 200)
            .where('te.damage_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => {
            return { typeId: typeObj.target_type_id };
        });

        return typeIds;
    }

    async getTypeHalfDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 50)
            .where('te.damage_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => {
            return { typeId: typeObj.target_type_id };
        });

        return typeIds;
    }

    async getTypeNoDamageToIds(typeId) {
        const queryRes = await this.knex
            .select('te.target_type_id')
            .from('pokemon_v2_typeefficacy as te')
            .where('te.damage_factor', 0)
            .where('te.damage_type_id', typeId)
            .cache(MINUTE);

        const typeIds = queryRes.map((typeObj) => {
            return { typeId: typeObj.target_type_id };
        });

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
}

module.exports = TypeDatabase