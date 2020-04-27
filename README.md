This is a GraphQL server made with [Apollo Server](https://www.apollographql.com/docs/apollo-server/) for [PokeApi](https://pokeapi.co/). I originally created a [GraphQL wrapper for the PokeApi REST API](https://github.com/jgarrow/pokeapi-graphql), but the queries were taking longer than I liked. So I decided to just download the sqlite3 database file from the [PokeApi GitHub repo](https://github.com/PokeAPI/pokeapi) and make my own GraphQL server so I could query the tables directly! My query times are now 10x faster! :)

This is not an exhaustive GraphQL server, as the database is large and complex. What has been done is what I felt was the more pertinent and relevant data for a Pokedex application.

I have not deployed this server anywhere because I didn't want to worry about other people finding it and then all of a sudden have all these different people pinging the server. If you'd like to use it, fork or clone this repo and make your own server! This server hasn't been tested extensively because there are so many Pokémon, so if you find an error, feel free to submit a PR or an issue so I can continue improve this repo.

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
