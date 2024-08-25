import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)
// I'm registering a plugin
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
