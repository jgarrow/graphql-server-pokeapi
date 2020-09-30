const { gql } = require('apollo-server');

const typeDefs = gql`
    union EvolutionCriteria =
          Move
        | Item
        | Type
        | Location
        | Gender
        | OtherEvolutionCriteria

    type Pokemon { # query with info wanted for my pokedex for individual Pokemon info
        sprites: Sprites # array of Sprite objects
        pokedex_entries: [DexEntry] # array of DexEntry objects
        evolution_criteria(game: String): [EvolutionCriteria]
        evolution_trigger: String
        evolves_to: [Pokemon]
        evolves_from: Pokemon
        moves(game: String!): [Move] # array of Move objects
        games: [Game]
        locations: [Location] # array of Location objects
        abilities(game: String): [Ability] # array of Ability objects
        egg_groups: [EggGroup]
        types: [Type] # array of Type objects
        gender_rate: Float # percent chance of this Pokémon being female; or -1 for genderless
        base_stats: Stats
        genus: String
        generation: String
        is_baby: Boolean
        base_experience: Int
        id: Int # want the number that is used for the pokemon endpoint
        name: String
        nat_dex_num: Int
        height: Int # height in decimeters
        weight: Int # weight in hectograms
        color: String
        dominant_color: String # dominant color of pokemon image taken from ColorThief to set background color in front end
        capture_rate: Int
        growth_rate: String
        shape: String
        base_happiness: Int
        hatch_counter: Int
        is_default: Boolean # True if it's the default form, False if it's a variant (i.e. alola, galar, mega, etc)
        variants: [Pokemon]
    }

    type Type { # Pokemon type (i.e. Grass, Electric, Water, etc)
        name: String
        id: Int
        double_damage_from: [Type]
        double_damage_to: [Type]
        half_damage_from: [Type]
        half_damage_to: [Type]
        no_damage_from: [Type]
        no_damage_to: [Type]
        pokemon: [Pokemon]
        evolution_criteria_name: String
    }

    type EggGroup {
        id: Int
        name: String
        pokemon: [Pokemon] # array of pokemon in this egg group
    }

    type Ability {
        id: Int
        name: String
        is_hidden: Boolean
        effect: String
        description: String
        pokemon: [Pokemon]
    }

    type Sprites {
        back_default: String
        back_female: String
        back_shiny: String
        back_shiny_female: String
        front_default: String
        front_female: String
        front_shiny: String
        front_shiny_female: String
    }

    type OtherEvolutionCriteria {
        evolution_criteria_name: String # time_of_day
        value: String # night
    }

    type Stats {
        hp: Int
        attack: Int
        defense: Int
        special_attack: Int
        special_defense: Int
        speed: Int
    }

    type DexEntry {
        description: String
        game: Game # game/version this entry is from
    }

    type Move {
        id: Int
        name: String
        type: Type
        learn_methods: [MoveLearnMethod] # level, egg, move tutor, tm/hm
        # learn_method: String
        # level_learned_at: Int
        power: Int
        accuracy: Int
        pp: Int
        priority: Int
        ailment: String
        effect_chance: Int
        effect: String # possible status condition effect
        damage_class: String # physical or special
        description: String
        # description: MoveDescription
        original_games: [Game]
        evolution_criteria_name: String
    }

    type MoveLearnMethod {
        method: String
        level_learned_at: Int
        games: [Game]
    }

    type MoveDescription {
        description: String
        games: [Game]
    }

    type Location {
        id: Int
        name: String
        region: Region
        evolution_criteria_name: String
        games: [Game] # which game/version pokemon is found at this location
        pokemon: [Pokemon] # array of pokemon that can be found at this location
    }

    type Region {
        id: Int
        name: String
        games: [Game]
        locations: [Location]
    }

    type Game {
        id: Int
        name: String
        generation: String
        regions: [Region]
    }

    type NameAndId {
        id: Int
        name: String
    }

    type Item {
        id: Int
        name: String
        evolution_criteria_name: String
        effect: String
        description: String
        cost: Int
        bag_pocket: String
        sprite: String
        # games: [Game] # database doesn't have data for what games an item is in -- just what games an item has a game_index for -- gen 1 and gen 2 don't have those
    }

    type Gender {
        id: Int
        name: String
        evolution_criteria_name: String
    }

    type Query {
        allPokemon(limit: Int, filter: Boolean): [Pokemon] # get range of pokemon starting from start variable
        allAbilities: [Ability]
        allTypes(start: Int, end: Int): [Type]
        allEggGroups: [EggGroup]
        allLocations: [Location]
        allMoves: [Move]
        allRegions: [Region]
        allGames: [Game]
        allItems: [Item]
        # game(name: String!): [Pokemon] # get pokemon from a specific game
        # generation(generationNumber: Int!): [Pokemon] # get pokemon from specific generation regardless of game
        pokemon(id: Int!): Pokemon
        ability(id: Int!, game: String): Ability
        type(id: Int!): Type
        eggGroup(id: Int!): EggGroup
        location(id: Int!): Location
        move(id: Int!): Move
        region(id: Int!): Region
        game(id: Int): Game
        item(id: Int): Item
    }
`;

module.exports = { typeDefs };
