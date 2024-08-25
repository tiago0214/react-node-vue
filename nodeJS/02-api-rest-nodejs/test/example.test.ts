import { test, expect, beforeAll, afterAll } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('testando', async () => {
  const response = await request(app.server).post('/transactions').send({
    title: 'new transaction',
    amount: 1000,
    type: 'credit',
  })

  expect(response.statusCode).toEqual(201)
})
