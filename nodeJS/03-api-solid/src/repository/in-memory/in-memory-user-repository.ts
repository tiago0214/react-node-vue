import { User, Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { ResourceNotFoundError } from "@/use-case/errors/resource-not-found-error";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
