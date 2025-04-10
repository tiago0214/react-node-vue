import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserPayload } from './jwt-strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)

// Não esqueça, eu estou atribuindo a propriedade user para o objeto request
// Se eu não lembrar direito basta ver a documentação do nest sobre AuthGuard
// porque nessa aplicação eu estou utilizando o passport para fazer os AuthGuard
// e estou utilizanndo o JWT para fazer os sign-in no token. e Fazendo umas configurações sobre o secret ou chave publica e privada
