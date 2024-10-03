import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUserCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repository/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let userRespository: InMemoryUserRepository;
let sut: RegisterUserCase;

describe("Register use case", () => {
  beforeEach(() => {
    userRespository = new InMemoryUserRepository();
    sut = new RegisterUserCase(userRespository);
  });

  it("should register a new user", async () => {
    const users = await sut.execute({
      email: "john@gmail.com",
      name: "jhon",
      password: "123412312",
    });

    expect(users.user.id).toEqual(expect.any(String));
  });

  it("should hash user password on registration", async () => {
    const { user } = await sut.execute({
      email: "john@gmail.com",
      name: "jhon",
      password: "123412312",
    });

    const passwordHashMatch = await compare("123412312", user.password_hash);

    expect(passwordHashMatch).toBe(true);
  });

  it("users shouldn't be allowed to register twice with same email", async () => {
    const email = "john@gmail.com";

    await sut.execute({
      email,
      name: "jhon",
      password: "123412312",
    });

    expect(async () => {
      await sut.execute({
        email,
        name: "jhon",
        password: "123412312",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
