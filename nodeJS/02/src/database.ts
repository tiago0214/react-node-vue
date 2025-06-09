import { Knex, knex as knexSetup } from 'knex'
import { env } from './env/env'

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    directory: './src/db/migrations',
  },
  useNullAsDefault: true,
}

export const knex = knexSetup(config)
