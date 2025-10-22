import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
   
  })

  const { name, email, password } = registerBody.parse(request.body)

  try {
    const registerService = makeRegisterService()
    const { user } = await registerService.execute({ name, email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
  
    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
