import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt-strategy'
import { ZodValidationPipes } from '@/pipes/zod-validation-pipes'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipes(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
  ) {
    const userId = user.sub

    const { title, content } = body

    const slug = this.generateSlug(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })

    return 'Ok'
  }

  private generateSlug(title: string): string {
    const replaceAccents = (str: string): string => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    return replaceAccents(title)
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }
}
