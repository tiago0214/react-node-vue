import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipes } from '@/pipes/zod-validation-pipes'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().default(1))

const queryValidationPipe = new ZodValidationPipes(pageQueryParamSchema)

type PageQueryParamSchem = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
export class FetchRecentQuestionController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchem) {
    const perPage = 1

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createAt: 'desc',
      },
    })

    return { questions }
  }
}
