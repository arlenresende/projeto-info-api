import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateService()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const parseUserIdtoString = String(user.id)

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: parseUserIdtoString,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: parseUserIdtoString,
          expiresIn: '7d',
        },
      },
    )

    return reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
    }).status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
