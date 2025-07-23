import { app } from './app'
import { env } from './env/env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Web server is listening')
  })
