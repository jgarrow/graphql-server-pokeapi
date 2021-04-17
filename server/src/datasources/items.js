const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class ItemDatabase extends SQLDataSource {
    async getAllItemIds() {
        const queryRes = await this.knex
            .select('id')
            .from('pokemon_v2_item')
            .cache(MINUTE);

        const itemIds = queryRes.map((item) => item.id);

        return itemIds;
    }

    async getItemName(itemId) {
        const queryRes = await this.knex
            .first()
            .select('in.name')
            .from('pokemon_v2_itemname as in')
            .where({ item_id: itemId })
            .where({ language_id: 9 })
            .cache(MINUTE);

        return queryRes ? queryRes.name : null;
    }

    async getItemCost(itemId) {
        const queryRes = await this.knex
            .first()
            .select('cost')
            .from('pokemon_v2_item')
            .where({ id: itemId })
            .cache(MINUTE);

        return queryRes ? queryRes.cost : null;
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

        return queryRes ? queryRes.name : null;
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
        return queryRes ? queryRes.short_effect.replace(/\s/gm, ' ') : null;
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
        const normalizedWhiteSpace =
            queryRes && queryRes.length
                ? queryRes[queryRes.length - 1].flavor_text.replace(/\s/gm, ' ')
                : null;

        return normalizedWhiteSpace;
    }

    async getItemSprite(itemId) {
        // const baseFilePath = `src/images/sprites/items`;
        const baseFilePath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/`;

        const queryRes = await this.knex
            .first()
            .select('i.name')
            .from('pokemon_v2_item as i')
            .where('i.id', itemId)
            .cache(MINUTE);

        return queryRes ? `${baseFilePath}/${queryRes.name}.png` : null;

        // const queryRes = await this.knex
        //     .first()
        //     .select('t.name')
        //     .from('pokemon_v2_type as t')
        //     .where('pokemon_v2_machine as m', 'm.item_id', itemId)
        //     .where('pokemon_v2_move as move', 'move.id', 'm.move_id')
        //     .where('t.id', 'move.type_id');

        // console.log('queryRes: ', queryRes);
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
}

module.exports = ItemDatabase