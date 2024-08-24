import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import crypto from 'node:crypto'
import { checkSessionIdExist } from '../middlewares/check-session-id-exist'

export async function transactionsRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', async (request) => {
  //   console.log(`[${request.method}] ${request.url}`)
  // }) globa;l {context} handler -> I can use as middleware for all my app in server.ts

  app.get('/', { preHandler: [checkSessionIdExist] }, async (request) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return { transactions }
  })

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExist] },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.get('/:id', { preHandler: [checkSessionIdExist] }, async (request) => {
    const { sessionId } = request.cookies

    const transactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = transactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions')
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return { transaction }
  })

  app.post('/', async (request, reply) => {
    const transactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = transactionSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
