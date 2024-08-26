import { expect, beforeAll, afterAll, it, describe } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
    // ready() => will only be executed when fastify complete to loading my app an its plugins
    // if i dont this, my app won't be ready in time before the test to be executed.
  })

  afterAll(async () => {
    await app.close()
    // close() -> will drop my app from memory.
  })

  it('It should allows users to create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'new transaction',
      amount: 1000,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('It should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 1000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies!)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'new transaction',
        amount: 1000,
      }),
    ])
  })
})
