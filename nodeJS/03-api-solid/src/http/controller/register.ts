import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUseCase } from '@/use-case/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(7),
  })

  const { name, email, password } = registerSchemaBody.parse(request.body)

  try {
    registerUseCase({ name, email, password })
  } catch (err) {
    reply.status(409).send()
  }

  reply.status(201).send()
}
