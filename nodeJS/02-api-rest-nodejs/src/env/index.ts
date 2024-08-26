import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}
console.log(process.env.NODE_ENV)

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

// All the values will be passed to env variable if everthing passes verification.
const _env = envSchema.safeParse(process.env)
// parse and safeParse: are the same => difference is that safeParse don't throw an error when the verification failed.

if (_env.success === false) {
  console.error('🤣 Invalid environmet variable', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
