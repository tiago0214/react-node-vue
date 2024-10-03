import { InvalidUserCredentialsError } from "@/use-case/errors/invalid-user-credentials-error";
import { makeAuthenticateUseCase } from "@/use-case/fatories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidUserCredentialsError) {
      reply.status(400).send({ message: err.message });
    }
  }

  reply.status(200).send();
}
