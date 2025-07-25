import { afterAll, beforeAll, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => await app.ready())

afterAll(async () => await app.close())

test('User should be able to create a new transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'New Transaction',
      amount: 1200,
      type: 'credit',
    })
    .expect(201)
})
