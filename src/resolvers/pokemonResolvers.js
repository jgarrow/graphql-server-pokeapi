const resolvers = {
    Query: {
        allPokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getAllPokemonIds(args.limit, args.filter);
        },
        allAbilities: (parent, args, { dataSources }) => {
            return dataSources.db.getAllAbilityIds();
        },
        allTypes: async (parent, args, { dataSources }) => {
            const typeIds = await dataSources.db.getAllTypeIds();
            return typeIds.map((type) => {
                return {
                    typeId: type,
                };
            });
        },
        allEggGroups: (parent, args, { dataSources }) => {
            return dataSources.db.getAllEggGroupIds();
        },
        allLocations: async (parent, args, { dataSources }) => {
            const locationIds = await dataSources.db.getAllLocationIds();
            return locationIds.map((location) => {
                return {
                    locationId: location,
                };
            });
        },
        allMoves: async (parent, args, { dataSources }) => {
            const moveIds = await dataSources.db.getAllMoveIds();
            return moveIds.map((move) => {
                return {
                    moveId: move,
                };
            });
        },
        allRegions: (parent, args, { dataSources }) => {
            return dataSources.db.getAllRegionIds();
        },
        allGames: (parent, args, { dataSources }) => {
            return dataSources.db.getAllGameIds();
        },
        allItems: async (parent, args, { dataSources }) => {
            const itemIds = await dataSources.db.getAllItemIds();
            return itemIds.map((item) => {
                return {
                    itemId: item,
                };
            });
        },
        pokemon: (parent, args, { dataSources }) => args.id,
        game: (parent, args, { dataSources }) => args.id,
        region: (parent, args, { dataSources }) => args.id,
        move: (parent, args, { dataSources }) => {
            return { moveId: args.id };
        },
        location: (parent, args, { dataSources }) => args.id,
        type: (parent, args, { dataSources }) => args.id,
        eggGroup: (parent, args, { dataSources }) => args.id,
        ability: (parent, args, { dataSources }) => {
            return { abilityId: args.id };
        },
        type: (parent, args, { dataSources }) => args.id,
    },
    Pokemon: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonName(parent);
        },
        height: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonHeight(parent);
        },
        weight: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonWeight(parent);
        },
        dominant_color: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonDominantColor(parent);
        },
        nat_dex_num: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonNationalDexNum(parent);
        },
        is_baby: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonIsBaby(parent);
        },
        gender_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenderRate(parent);
        },
        generation: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGeneration(parent);
        },
        base_experience: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonBaseExperience(parent);
        },
        base_stats: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonStats(parent);
        },
        genus: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenus(parent);
        },
        gender_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGenderRate(parent);
        },
        color: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonColor(parent);
        },
        capture_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonCaptureRate(parent);
        },
        growth_rate: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGrowthRate(parent);
        },
        shape: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonShape(parent);
        },
        base_happiness: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonBaseHappiness(parent);
        },
        hatch_counter: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonHatchCounter(parent);
        },
        types: async (parent, args, { dataSources }) => {
            const typeIds = await dataSources.db.getSinglePokemonTypeIds(
                parent
            );
            return typeIds.map((type) => {
                return {
                    typeId: type,
                };
            });
        },
        egg_groups: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonEggGroupIds(parent);
        },
        sprites: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonSprites(parent);
        },
        abilities: async (parent, args, { dataSources }) => {
            const abilityIds = await dataSources.db.getSinglePokemonAbilityIds(
                parent
            );
            const idsArray = abilityIds.map((abilityId) => {
                return {
                    pokemonId: parent,
                    abilityId: abilityId,
                    gameName: args.game,
                };
            });

            return idsArray;
        },
        games: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonGameIds(parent);
        },
        locations: async (parent, args, { dataSources }) => {
            const locationIds = await dataSources.db.getSinglePokemonLocationIds(
                parent
            );
            return locationIds.length
                ? locationIds.map((location) => {
                      return {
                          locationId: location,
                      };
                  })
                : null;
        },
        moves: async (parent, args, { dataSources }) => {
            const moveIds = await dataSources.db.getSinglePokemonMoveIds(
                parent,
                args.game
            );

            const idsArray = moveIds.map((moveId) => {
                return {
                    pokemonId: parent,
                    moveId: moveId,
                    gameName: args.game,
                };
            });

            return idsArray;
        },
        evolves_from: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonEvolvesFromPokemonId(parent);
        },
        evolves_to: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonEvolvesToPokemonId(parent);
        },
        evolution_trigger: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonEvolutionTrigger(parent);
        },
        evolution_criteria: async (parent, args, { dataSources }) => {
            const criteria = await dataSources.db.getSinglePokemonEvolutionCriteria(
                parent
            );

            return criteria
                ? criteria.map((criteria) => {
                      return {
                          ...criteria,
                          ...args,
                      };
                  })
                : null;
        },
        pokedex_entries: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonPokedexEntries(parent);
        },
        is_default: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonIsDefault(parent);
        },
    },
    Stats: {
        hp: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'hp');
            return hp.base_stat;
        },
        attack: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'attack');
            return hp.base_stat;
        },
        defense: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'defense');
            return hp.base_stat;
        },
        special_attack: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'special-attack');
            return hp.base_stat;
        },
        special_defense: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'special-defense');
            return hp.base_stat;
        },
        speed: (parent, args, { dataSources }) => {
            const hp = parent.find((stat) => stat.name === 'speed');
            return hp.base_stat;
        },
    },
    Type: {
        id: (parent, args, { dataSources }) => parent.typeId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeName(parent.typeId);
        },
        double_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeDoubleDamageFromIds(parent.typeId);
        },
        double_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeDoubleDamageToIds(parent.typeId);
        },
        half_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeHalfDamageFromIds(parent.typeId);
        },
        half_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeHalfDamageToIds(parent.typeId);
        },
        no_damage_to: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeNoDamageToIds(parent.typeId);
        },
        no_damage_from: (parent, args, { dataSources }) => {
            return dataSources.db.getTypeNoDamageFromIds(parent.typeId);
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getPokemonIdsForType(parent.typeId);
        },
    },
    EggGroup: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getEggGroupName(parent);
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getEggGroupPokemonIds(parent);
        },
    },
    Ability: {
        id: (parent, args, { dataSources }) => parent.abilityId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityName(parent.abilityId);
        },
        is_hidden: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonAbilitiesIsHidden(
                parent.pokemonId,
                parent.abilityId
            );
        },
        effect: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityEffect(parent.abilityId);
        },
        description: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityDescription(
                parent.abilityId,
                parent.gameName
            );
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getAbilityPokemonIds(parent.abilityId);
        },
    },
    Game: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getGameName(parent);
        },
        generation: (parent, args, { dataSources }) => {
            return dataSources.db.getGameGeneration(parent);
        },
        regions: (parent, args, { dataSources }) => {
            return dataSources.db.getGameRegionIds(parent);
        },
    },
    Region: {
        id: (parent, args, { dataSources }) => parent,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getRegionName(parent);
        },
        games: (parent, args, { dataSources }) => {
            return dataSources.db.getRegionGameIds(parent);
        },
        locations: async (parent, args, { dataSources }) => {
            const locationIds = await dataSources.db.getRegionLocationIds(
                parent
            );
            return locationIds.map((location) => {
                return {
                    locationId: location,
                };
            });
        },
    },
    Location: {
        id: (parent, args, { dataSources }) => parent.locationId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getLocationName(parent.locationId);
        },
        games: (parent, args, { dataSources }) => {
            return dataSources.db.getLocationGameIds(parent.locationId);
        },
        region: (parent, args, { dataSources }) => {
            return dataSources.db.getLocationRegionId(parent.locationId);
        },
        pokemon: (parent, args, { dataSources }) => {
            return dataSources.db.getLocationPokemonIds(parent.locationId);
        },
    },
    Move: {
        id: (parent, args, { dataSources }) => parent.moveId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveName(parent.moveId);
        },
        type: async (parent, args, { dataSources }) => {
            const typeId = await dataSources.db.getMoveTypeId(parent.moveId);
            return {
                typeId,
            };
        },
        power: (parent, args, { dataSources }) => {
            return dataSources.db.getMovePower(parent.moveId);
        },
        pp: (parent, args, { dataSources }) => {
            return dataSources.db.getMovePp(parent.moveId);
        },
        accuracy: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveAccuracy(parent.moveId);
        },
        priority: (parent, args, { dataSources }) => {
            return dataSources.db.getMovePriority(parent.moveId);
        },
        damage_class: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveDamageClass(parent.moveId);
        },
        ailment: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveAilment(parent.moveId);
        },
        effect_chance: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveEffectChance(parent.moveId);
        },
        effect: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveEffect(parent.moveId);
        },
        description: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveDescription(
                parent.moveId,
                parent.gameName
            );
        },
        learn_methods: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonLearnMethodIds(
                parent.pokemonId,
                parent.moveId,
                parent.gameName
            );
        },
        original_games: (parent, args, { dataSources }) => {
            return dataSources.db.getMoveGameIds(parent.moveId);
        },
    },
    MoveLearnMethod: {
        method: (parent, args, { dataSources }) => {
            return dataSources.db.getSinglePokemonMoveLearnMethodName(
                parent.move_learn_method_id
            );
        },
        level_learned_at: (parent, args, { dataSources }) => {
            return parent.level;
        },
        games: (parent, args, { dataSources }) => {
            return parent.id;
        },
    },
    DexEntry: {
        description: (parent, args, { dataSources }) => parent.description,
        game: (parent, args, { dataSources }) => parent.gameId,
    },
    OtherEvolutionCriteria: {
        evolution_criteria_name: (parent, args, { dataSources }) =>
            parent.evolution_criteria_name,
        value: (parent, args, { dataSources }) => parent.value,
    },
    Item: {
        id: (parent, args, { dataSources }) => parent.itemId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getItemName(parent.itemId);
        },
        cost: (parent, args, { dataSources }) => {
            return dataSources.db.getItemCost(parent.itemId);
        },
        bag_pocket: (parent, args, { dataSources }) => {
            return dataSources.db.getItemBagPocket(parent.itemId);
        },
        effect: (parent, args, { dataSources }) => {
            return dataSources.db.getItemEffect(parent.itemId);
        },
        description: (parent, args, { dataSources }) => {
            return dataSources.db.getItemDescription(
                parent.itemId,
                parent.game
            );
        },
        sprite: (parent, args, { dataSources }) => {
            return dataSources.db.getItemSprite(parent.itemId);
        },
    },
    Gender: {
        id: (parent, args, { dataSources }) => parent.genderId,
        name: (parent, args, { dataSources }) => {
            return dataSources.db.getGenderName(parent.genderId);
        },
    },
    EvolutionCriteria: {
        __resolveType(obj, context, info) {
            if (
                obj.evolution_criteria_name === 'held_item' ||
                obj.evolution_criteria_name === 'evolution_item'
            ) {
                return 'Item';
            } else if (obj.evolution_criteria_name === 'known_move') {
                return 'Move';
            } else if (obj.evolution_criteria_name === 'known_move_type') {
                return 'Type';
            } else if (obj.evolution_criteria_name === 'location') {
                return 'Location';
            } else if (obj.evolution_criteria_name === 'gender') {
                return 'Gender';
            } else if (obj.value) {
                return 'OtherEvolutionCriteria';
            }

            return null;
        },
    },
};

module.exports = { resolvers };
