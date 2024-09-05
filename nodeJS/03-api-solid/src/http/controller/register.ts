import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-case/register'
import { PrismaUserRepository } from '@/repository/prisma/prisma-user-repository'
import { EmailAlreadyExistsError } from '@/use-case/errors/email-already-exists-error'

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
    if (err instanceof EmailAlreadyExistsError) {
      reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  reply.status(201).send()
}
