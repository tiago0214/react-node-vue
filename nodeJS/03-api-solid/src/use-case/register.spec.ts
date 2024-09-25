import { expect, describe, it } from "vitest";
import { RegisterUserCase } from "./register";
import { PrismaUsersRepository } from "@/repository/prisma/prisma-user-repository";
import { compare } from "bcryptjs";

describe("Register use case", () => {
  it("should hash user password on registration", async () => {
    const prismaRepository = new PrismaUsersRepository();
    const useCase = new RegisterUserCase(prismaRepository);

    const { user } = await useCase.execute({
      email: "john@gmail.com",
      name: "jhon",
      password: "123412312",
    });

    const passwordHashMatch = await compare("123412312", user.password_hash);

    expect(passwordHashMatch).toBe(true);
  });
});
