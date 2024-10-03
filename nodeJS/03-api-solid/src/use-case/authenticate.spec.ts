import { InMemoryUserRepository } from "@/repository/in-memory/in-memory-user-repository";
import { expect, it, describe } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

describe("Authenticate use case", () => {
  it("should authenticate an user", async () => {
    const userRespository = new InMemoryUserRepository();
    const sup = new AuthenticateUseCase(userRespository);

    await userRespository.create({
      name: "john",
      email: "john@jhon.com",
      password_hash: await hash("123123", 6),
    });

    const { user } = await sup.execute({
      email: "john@jhon.com",
      password: "123123",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
