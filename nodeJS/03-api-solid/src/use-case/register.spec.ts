import { expect, describe, it } from "vitest";
import { RegisterUserCase } from "./register";
import { compare } from "bcryptjs";

describe("Register use case", () => {
  it("should hash user password on registration", async () => {
    const useCase = new RegisterUserCase({
      async findByEmail() {
        return null;
      },

      async create(data) {
        return {
          id: "uuser-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await useCase.execute({
      email: "john@gmail.com",
      name: "jhon",
      password: "123412312",
    });

    const passwordHashMatch = await compare("123412312", user.password_hash);

    expect(passwordHashMatch).toBe(true);
  });
});
