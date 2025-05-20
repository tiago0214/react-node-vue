import type { Knex } from 'knex'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/database.db',
    },
    migrations: {
      directory: './src/db/migrations',
    },
  },
}

export default config
