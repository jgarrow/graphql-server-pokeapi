const itemResolvers = {
    Item: {
        id: (parent) => parent.itemId,
        name: (parent, _, { dataSources }) => {
            return dataSources.itemsDb.getItemName(parent.itemId);
        },
        cost: (parent, _, { dataSources }) => {
            return dataSources.itemsDb.getItemCost(parent.itemId);
        },
        bag_pocket: (parent, _, { dataSources }) => {
            return dataSources.itemsDb.getItemBagPocket(parent.itemId);
        },
        effect: (parent, _, { dataSources }) => {
            return dataSources.itemsDb.getItemEffect(parent.itemId);
        },
        description: (parent, _, { dataSources }) => {
            return dataSources.itemsDb.getItemDescription(
                parent.itemId,
                parent.game
            );
        },
        sprite: (parent, _, { dataSources }) => {
            return dataSources.itemsDb.getItemSprite(parent.itemId);
        },
    }
}

module.exports = { itemResolvers }