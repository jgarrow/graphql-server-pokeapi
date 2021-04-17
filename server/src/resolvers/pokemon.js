const pokemonResolvers = {
    Pokemon: {
        id: (parent) => parent,
        name: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonName(parent);
        },
        height: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonHeight(parent);
        },
        weight: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonWeight(parent);
        },
        dominant_color: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonDominantColor(parent);
        },
        nat_dex_num: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonNationalDexNum(parent);
        },
        is_baby: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonIsBaby(parent);
        },
        gender_rate: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonGenderRate(parent);
        },
        generation: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonGeneration(parent);
        },
        base_experience: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonBaseExperience(parent);
        },
        base_stats: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonStats(parent);
        },
        genus: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonGenus(parent);
        },
        gender_rate: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonGenderRate(parent);
        },
        color: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonColor(parent);
        },
        capture_rate: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonCaptureRate(parent);
        },
        growth_rate: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonGrowthRate(parent);
        },
        shape: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonShape(parent);
        },
        base_happiness: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonBaseHappiness(parent);
        },
        hatch_counter: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonHatchCounter(parent);
        },
        types: async (parent, _, { dataSources }) => {
            const typeIds = await dataSources.pokemonDb.getSinglePokemonTypeIds(
                parent
            );

            return typeIds.map((type) => {
                return {
                    typeId: type,
                };
            });
        },
        egg_groups: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonEggGroupIds(parent);
        },
        sprites: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonSprites(parent);
        },
        abilities: async (parent, args, { dataSources }) => {
            const abilityIds = await dataSources.pokemonDb.getSinglePokemonAbilityIds(
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
        games: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonGameIds(parent);
        },
        locations: async (parent, _, { dataSources }) => {
            const locationIds = await dataSources.pokemonDb.getSinglePokemonLocationIds(
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
            const moveIds = await dataSources.pokemonDb.getSinglePokemonMoveIds(
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
        evolves_from: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonEvolvesFromPokemonId(parent);
        },
        evolves_to: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonEvolvesToPokemonId(parent);
        },
        evolution_trigger: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonEvolutionTrigger(parent);
        },
        evolution_criteria: async (parent, args, { dataSources }) => {
            const criteria = await dataSources.pokemonDb.getSinglePokemonEvolutionCriteria(
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
        pokedex_entries: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonPokedexEntries(parent);
        },
        is_default: (parent, _, { dataSources }) => {
            return dataSources.pokemonDb.getSinglePokemonIsDefault(parent);
        },
    }
};

module.exports = { pokemonResolvers };
