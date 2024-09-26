import { UserRepository } from "@/repository/user-repository";
import { InvalidUserCredentialsError } from "./errors/invalid-user-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private UseRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.UseRepository.findByEmail(email);

    if (!user) {
      throw new InvalidUserCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidUserCredentialsError();
    }

    return {
      user,
    };
  }
}
