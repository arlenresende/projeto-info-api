import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

import { makeResetPasswordService } from '@/services/factories/make-reset-password-service'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const resetPasswordBodySchema = z.object({
    id: z.string(),
    password: z.string().min(6),
  })

  const { id, password } = resetPasswordBodySchema.parse(request.body)

  try {
    const recoverUseCase = makeResetPasswordService()

    await recoverUseCase.execute({ id, password })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
