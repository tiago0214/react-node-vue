import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

// database integration
export class PrismaUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }
}
