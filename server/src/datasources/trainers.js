const { SQLDataSource } = require('datasource-sql');

class TrainerDatabase extends SQLDataSource {
  async getTrainerName(trainerId) {
    const queryRes = await this.knex
      .first()
      .select('t.name')
      .from('trainers as t')
      .where('t.id', trainerId)

    return queryRes ? queryRes.name : null;
  }

  async editTrainerName(trainerId, name) {
    const queryRes = await this.knex
      .update({ name })
      .from('trainers')
      .where('id', trainerId)
      .returning('*')

    return queryRes[0] ? queryRes[0].id : null;
  }

  async getParty(trainerId) {
    const queryRes = await this.knex
      .select('p.pokemonId')
      .from('party as p')
      .where('p.trainerId', trainerId)

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
