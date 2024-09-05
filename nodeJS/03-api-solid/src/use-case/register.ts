import { UserRepository } from '@/repository/user-repository'
import { hash } from 'bcryptjs'

interface registerUseCaseParams {
  name: string
  email: string
  password: string
}
// services
export class RegisterUseCase {
  constructor(private useRepository: UserRepository) {}

  async execute({ name, email, password }: registerUseCaseParams) {
    const userWithSameEmail = await this.useRepository.findEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already in use')
    }

    const password_hash = await hash(password, 6)

    await this.useRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
