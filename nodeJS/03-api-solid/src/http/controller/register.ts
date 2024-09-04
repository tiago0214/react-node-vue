import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-case/register'
import { PrismaUserRepository } from '@/repository/prisma-user-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerSchemaBody.parse(request.body)

  try {
    const prismaUserRespository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRespository)

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    return reply.status(409).send()
  }

  reply.status(201).send()
}
