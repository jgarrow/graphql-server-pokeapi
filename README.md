This is a (read-only) GraphQL server made with [Apollo Server](https://www.apollographql.com/docs/apollo-server/) for [PokeApi](https://pokeapi.co/). I originally created a [GraphQL wrapper for the PokeApi REST API](https://github.com/jgarrow/pokeapi-graphql), but the queries were taking longer than I liked. So I decided to just download the sqlite3 database file from the [PokeApi GitHub repo](https://github.com/PokeAPI/pokeapi) and make my own GraphQL server so I could query the tables directly! My query times are now up to 10x faster! :)

This is not an exhaustive GraphQL server, as the database is large and fairly complex. What has been done is what I felt was the more pertinent and relevant data for a Pokédex application.

I have not deployed this server anywhere because I didn't want to worry about other people finding it and then all of a sudden have all these different people pinging the server. If you'd like to use it, fork or clone this repo and make your own server! This server hasn't been tested extensively because there are so many Pokémon, so if you find an error, feel free to submit a PR or an issue so I can continue improve this repo.

## To use

-   Clone this repo and run `npm install` to install the dependencies.
-   Start the server locally by running `npm run start`.
-   Optionally, use the `npm run server` script to use the nodemon script and have "hot reloading" while you're working on it so you don't have to kill and restart the server every time you make a change
-   Navigate to `http://localhost:4000/` for the GraphQL playground to play around with different queries.
-   The full schema of different fields that can be queried can be found in the [`schema.js` file](https://github.com/jgarrow/graphql-server-pokeapi/blob/master/schema/schema.js)

## A note on the database

This database is a SQLite3 database created from the [PokeApi GitHub repo](https://github.com/PokeAPI/pokeapi). I recently recloned it to get a more updated version since they've started to add data for the Let's Go and Sword/Shield games. However, PokeAPI typically relies on [Veekun](https://github.com/veekun/pokedex) for the data, but since no data for the Let's Go or Sword/Shield games has been added, PokeAPI has begun to gradually add the data from those games themselves. As a result, the data for those games in this database are still partial and incomplete.

With the updates from Let's Go and Sword/Shield, I found that trying to fetch the different pokedex entry descriptions, or "flavor text" were missing some important information for tying the entry to its associated pokemon. Instead, the entries are tied to a pokemon SPECIES. The issue arises for pokemon species who have multiple different forms (i.e. mega evolutions, Alolan forms, etc). While they all have their own unique pokemon ids, they all share the same pokemon species id. Hence when trying to retrieve the pokedex entries for, say, Alolan Raichu, you will get back all of the entries for both Kantonian Raichu AND Alolan Raichu, with no way to differentiate which entry is for which form.

To help combat this, I added a new column into the `pokemon_v2_pokemonspeciesflavortext` table called `pokemon_id` which is a foreign key tied to the `id` in the `pokemon_v2_pokemon` table. That way there is a way to see which pokemon specifically the entry is for, rather than just the species id. This SQL query below is what I used to add the new column. Since there are hundreds of pokemon, I gave them all the default form pokemon id (`where p.is_default = 1`) and then manually went through and updated the pokemon ids for the entries for alternate forms. After doing it manually this first time, I plan on then writing a script to do it for me so that the next time I update the database to get the most recent data from PokeAPI, I won't have to do any manual entries.

```sql
INSERT INTO pokemon_v2_pokemonspeciesflavortext(pokemon_id)
VALUES (select p.id
from pokemon_v2_pokemon as p
join pokemon_v2_pokemonspeciesflavortext as psft on psft.pokemon_species_id = p.pokemon_species_id
where p.is_default = 1);
```

## A note on the resolvers

Each field has its own resolver that makes a query to the database. This avoids overfetching because the data for a field is only fetched if a query is made for it.

Each GraphQL type's fields accept that type's ID. For example, to query a Pokémon, the Pokémon ID needs to be passed to each of the field resolvers for the `Pokemon` type. Likewise with `Type`, `Move`, `Ability`, etc.

Specifically for the `Pokemon` type, there is an `evolution_trigger` and an `evolution_criteria` field. These fields refer to how that particular Pokémon evolved into its current form. For example, the `evolution_trigger` for Vaporeon is 'use-item' and the `evolution_criteria` is an `Item` type with an `evolution_criteria_name` of 'evolution_item' and a `name` of 'Water Stone' because that is how Vaporeon evolves from Eevee.

A `union` was created for `EvolutionCriteria` because a Pokémon can have more than one criteria that must be met in order to evolve. These criteria can also be of different types, so I needed a dynamic way of determining what those types are once we get the data back from the query. Because the resolver for `EvolutionCriteria` returns an object, I added an ID key that holds the corresponding type's ID for its resolvers. As a result, the following types have to receive their IDs via an object, no matter what kind of query is requesting these types:

```js
    - `Item` -- `{ itemId: IDHERE }`
    - `Move` -- `{ moveId: IDHERE }`
    - `Type` -- `{ typeId: IDHERE }`
    - `Location` -- `{ locationId: IDHERE }`
    - `Gender` -- `{ genderId: IDHERE }`
```

## Querying the union

The GraphQL query structure for the `EvolutionCriteria` union is as follows:

```js
{
    pokemon(id: 4) {
        ...
        evolution_criteria {
            ... on Move {
                evolution_criteria_name
                name
            }
            ... on Item {
                evolution_criteria_name
                name
            }
            ... on Type {
                evolution_criteria_name
                name
            }
            ... on Location {
                evolution_criteria_name
                name
            }
            ... on Gender {
                evolution_criteria_name
                name
            }
            ... on OtherEvolutionCriteria {
                evolution_criteria_name
                value
            }
        }
    }
}
```

Any field for available to `Move`, `Item`, `Type`, `Location`, `Gender`, and `OtherEvolutionCriteria` can be queried in their respective type, but have been excluded here for brevity.
