import type { Knex } from 'knex'
import 'dotenv/config'
import { env } from './src/env/env'
// Update with your config settings.

if (!process.env.DATABASE_URL) {
  throw new Error('dotenv with database url must be provide')
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: env.DATABASE_URL,
    },
    migrations: {
      directory: './src/db/migrations',
    },
  },
}

export default config
