import { expect, describe, it } from "vitest";
import { RegisterUserCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repository/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register use case", () => {
  it("should register a new user", async () => {
    const userRespository = new InMemoryUserRepository();
    const useCase = new RegisterUserCase(userRespository);

    const users = await useCase.execute({
      email: "john@gmail.com",
      name: "jhon",
      password: "123412312",
    });

    expect(users.user.id).toEqual(expect.any(String));
  });

  it("should hash user password on registration", async () => {
    const userRespository = new InMemoryUserRepository();
    const useCase = new RegisterUserCase(userRespository);

    const { user } = await useCase.execute({
      email: "john@gmail.com",
      name: "jhon",
      password: "123412312",
    });

    const passwordHashMatch = await compare("123412312", user.password_hash);

    expect(passwordHashMatch).toBe(true);
  });

  it("users shouldn't be allowed to register twice with same email", async () => {
    const userRespository = new InMemoryUserRepository();
    const useCase = new RegisterUserCase(userRespository);

    const email = "john@gmail.com";

    await useCase.execute({
      email,
      name: "jhon",
      password: "123412312",
    });

    expect(async () => {
      await useCase.execute({
        email,
        name: "jhon",
        password: "123412312",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
