import { InMemoryUserRepository } from "@/repository/in-memory/in-memory-user-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidUserCredentialsError } from "./errors/invalid-user-credentials-error";

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it("should authenticate an user", async () => {
    await userRepository.create({
      name: "john",
      email: "john@jhon.com",
      password_hash: await hash("123123", 6),
    });

    const { user } = await sut.execute({
      email: "john@jhon.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("shouldn't be able to login with wrong email", async () => {
    await userRepository.create({
      name: "john",
      email: "john@jhon.com",
      password_hash: await hash("123123", 6),
    });

    expect(async () => {
      await sut.execute({
        email: "john@joh.com",
        password: "123123",
      });
    }).rejects.toBeInstanceOf(InvalidUserCredentialsError);
  });

  it("shouldn't allow user to login with wrong password", async () => {
    await userRepository.create({
      name: "john",
      email: "john@john.com",
      password_hash: await hash("123123", 6),
    });

    expect(async () => {
      await sut.execute({
        email: "john@john.com",
        password: "123124",
      });
    }).rejects.toBeInstanceOf(InvalidUserCredentialsError);
  });
});
