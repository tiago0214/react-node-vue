import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUserCase } from "@/use-case/register";
import { PrismaUsersRepository } from "@/repository/prisma-user-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUsersRepository();
    const registerUserCase = new RegisterUserCase(userRepository);

    await registerUserCase.execute({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }

  reply.status(201).send();
}
