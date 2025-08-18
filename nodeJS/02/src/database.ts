import { Knex, knex as knexSetup } from 'knex'
import { env } from './env/env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_CLIENT === 'sqlite' ? {
    filename: env.DATABASE_URL,
  }: env.DATABASE_URL,
  migrations: {
    directory: './src/db/migrations',
  },
  useNullAsDefault: true,
}

export const knex = knexSetup(config)
