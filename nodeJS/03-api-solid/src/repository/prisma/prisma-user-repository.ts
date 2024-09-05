import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UserRepository } from '../user-repository'

// database integration
export class PrismaUserRepository implements UserRepository {
  async findEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }
}
