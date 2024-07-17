const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60 * 10000;

class TrainerDatabase extends SQLDataSource {
  async getTrainerName(trainerId) {
    const queryRes = await this.knex
      .first()
      .select('t.name')
      .from('trainers as t')
      .where('t.id', trainerId)
      .cache(MINUTE)

    return queryRes ? queryRes.name : null;
  }

  async getParty(trainerId) {
    const queryRes = await this.knex
      .select('p.pokemonId')
      .from('party as p')
      .where('p.trainerId', trainerId)
      .cache(MINUTE)

    const pokemonIds = queryRes.map((partyRow) => partyRow.pokemonId);

    return pokemonIds;
  }

  async addPokemonToParty(trainerId, pokemonId) {
    const queryRes = await this.knex
      .insert({
        trainerId,
        pokemonId
      })
      .into('party')
      .returning('*')

    if (queryRes[0]) {
      // return queryRes[0].trainerId
      return queryRes[0].pokemonId
    }

    return null
  }

  async removePokemonFromParty(trainerId, pokemonId) {
    const subquery = this.knex()
      .from('party')
      .select('id')
      .where({ trainerId, pokemonId })
      .limit(1);
    
    const numDeletedPokemon = await this.knex()
      .from('party')
      .where('id', 'in', subquery)
      .del()
    
    // return numDeletedPokemon ? trainerId : null
    return numDeletedPokemon ? pokemonId : null
  }
}

module.exports = TrainerDatabase;
