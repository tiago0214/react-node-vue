import { UserRepository } from "@/repository/user-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User | null;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!userId) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
