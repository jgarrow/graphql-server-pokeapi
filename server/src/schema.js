const { gql } = require('apollo-server');

const typeDefs = gql`
    union EvolutionCriteria =
          Move
        | Item
        | Type
        | Location
        | Gender
        | OtherEvolutionCriteria

    """
    query for an individual Pokemon's info
    """
    type Pokemon { 
        "array of Sprite objects"
        sprites: Sprites 
        "array of DexEntry objects"
        pokedex_entries: [DexEntry] 
        "array of all criteria that must be met for the queried Pokemon to evolve"
        evolution_criteria(game: String): [EvolutionCriteria]
        "what triggers the queried Pokemon to evolve if all evolution criteria have been met"
        evolution_trigger: String
        "array of Pokemon that the queried Pokemon can evolve into"
        evolves_to: [Pokemon]
        "Pokemon that the queried Pokemon evolves from"
        evolves_from: Pokemon
        "array of Move objects"
        moves(game: String!): [Move] 
        "array of Games that the queried Pokemon is found in"
        games: [Game]
        "array of Locations that the queried Pokemon can be found in"
        locations: [Location] 
        "array of Abilities that the queried Pokemon can have"
        abilities(game: String): [Ability] 
        "array of the different EggGroups that the queried Pokemon belongs to"
        egg_groups: [EggGroup]
        "array of all the different Types of the queried Pokemon"
        types: [Type]
        "percent chance of the queried Pokémon being female (-1 for genderless)"
        gender_rate: Float 
        "base stats of the queried Pokemon"
        base_stats: Stats
        genus: String
        "which generation the queried Pokemon debuted in"
        generation: String
        is_baby: Boolean
        base_experience: Int
        id: Int # want the number that is used for the pokemon endpoint
        name: String
        nat_dex_num: Int
        "height in meters"
        height: Int 
        "weight in kilograms"
        weight: Int 
        "basic color of the queried Pokemon"
        color: String
        "dominant color of the queried Pokemon's image"
        dominant_color: Dominant_Color
        "capture rate of the queried Pokemon when using a normal Pokeball at full health"
        capture_rate: Int
        growth_rate: String
        shape: String
        base_happiness: Int
        hatch_counter: Int
        "true if it's the default form, false if it's a variant (i.e. alola, galar, mega, etc)"
        is_default: Boolean 
        "array of different variant forms of the queried Pokemon"
        variants: [Pokemon]
    }

    type Dominant_Color {
        light: String
        dark: String
        original: String
        r: Int
        g: Int
        b: Int
    }

    """
    Pokemon type (i.e. Grass, Electric, Water, etc)
    """
    type Type {
        name: String
        id: Int
        "array of super effective Types that the queried type receives double damage from"
        double_damage_from: [Type]
        "array of Types the queried type inflicts double damage upon"
        double_damage_to: [Type]
        "array of not very effective Types the queried type receives half damage from"
        half_damage_from: [Type]
        "array of Types the queried type inflicts double damage upon"
        half_damage_to: [Type]
        "array of ineffective Types the queried type receives no damage from"
        no_damage_from: [Type]
        "array of Types the queried type inflicts no damage upon"
        no_damage_to: [Type]
        "array of Pokemon that have the queried Type"
        pokemon: [Pokemon]
        "Use in an evolution_criteria query; returns the name of the evolution criteria that must have been met for the queried Pokémon to have evolved"
        evolution_criteria_name: String
    }

    type EggGroup {
        id: Int
        name: String
        "array of Pokemon in the queried egg group"
        pokemon: [Pokemon] 
    }

    type Ability {
        id: Int
        name: String
        is_hidden: Boolean
        effect: String
        description: String
        "array of Pokemon that can have the queried Ability"
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
        "example response: time_of_day"
        evolution_criteria_name: String 
        "example response: night"
        value: String 
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
        "game/version the queried DexEntry is from"
        game: Game
    }

    type Move {
        id: Int
        name: String
        type: Type
        "level, egg, move tutor, tm/hm"
        learn_methods: [MoveLearnMethod]
        power: Int
        accuracy: Int
        pp: Int
        priority: Int
        ailment: String
        effect_chance: Int
        "possible status condition effect"
        effect: String
        "physical or special"
        damage_class: String
        description: String
        original_games: [Game]
        evolution_criteria_name: String
    }

    type MoveLearnMethod {
        "how the Pokemon learns the queried Move"
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
        "array of games/versions in which pokemon are found at the queried Location"
        games: [Game]
        "array of Pokemon that can be found at the queried Location"
        pokemon: [Pokemon]
    }

    type Region {
        id: Int
        name: String
        "array of Games the queried Region is found in"
        games: [Game]
        "array of Locations that are in the queried Region"
        locations: [Location]
    }

    type Game {
        id: Int
        name: String
        generation: String
        "array of Regions that are found in the queried Game"
        regions: [Region]
    }

    type NameAndId {
        id: Int
        name: String
    }

    type Item {
        id: Int
        name: String
        "Use in an evolution_criteria query; returns the name of the evolution criteria that must have been met for the Pokémon to have evolved"
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
        "Use in an evolution_criteria query; returns the name of the evolution criteria that must have been met for the Pokémon to have evolved"
        evolution_criteria_name: String
    }

    type Query {
        "get range of Pokemon starting from start variable"
        allPokemon(limit: Int, filter: Boolean): [Pokemon]
        allAbilities: [Ability]
        allTypes(start: Int, end: Int): [Type]
        allEggGroups: [EggGroup]
        allLocations: [Location]
        allMoves: [Move]
        allRegions: [Region]
        allGames: [Game]
        allItems: [Item]
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
