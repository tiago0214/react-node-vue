import { PrismaUsersRepository } from "@/repository/prisma/prisma-user-repository";
import { RegisterUserCase } from "../register";

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUserCase(userRepository);

  return registerUseCase;
}
