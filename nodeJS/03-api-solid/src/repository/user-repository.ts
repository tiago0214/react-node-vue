import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  findEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
