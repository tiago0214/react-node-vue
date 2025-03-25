import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private prismaService: PrismaService,
  ) {}

  @Get()
  getHello() {
    return this.prismaService.user.findMany()
  }
}
