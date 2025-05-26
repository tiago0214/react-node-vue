import fastify from 'fastify'
import { env } from './env/env'

const app = fastify()

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Web server is listening')
  })
