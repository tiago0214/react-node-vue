import { UserRepository } from '@/repository/user-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

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
      throw new EmailAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.useRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
