import { knex as knexSetup } from 'knex'

export const knex = knexSetup({
  client: 'sqlite3',
  connection: {
    filename: './tmp/database.db',
  },
})
