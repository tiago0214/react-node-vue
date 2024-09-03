import fastify from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(7),
  })

  const { name, email, password } = registerSchemaBody.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  reply.status(201).send()
})
