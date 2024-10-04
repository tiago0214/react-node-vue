import { it, describe, beforeEach, expect } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUserRepository } from "@/repository/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let userRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it("should return an user from given id", async () => {
    const user = await userRepository.create({
      email: "john@john.com",
      name: "john",
      password_hash: await hash("123123", 6),
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("shouldn't allow user to get profile without an ID", async () => {
    await userRepository.create({
      email: "john@john.com",
      name: "john",
      password_hash: await hash("123123", 6),
    });

    expect(async () => {
      await sut.execute({ userId: "not-existing-id" });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
