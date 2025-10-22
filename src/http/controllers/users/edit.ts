import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserService } from '@/services/factories/make-update-user-service'

interface UpdateUserParams {
  id: string
}

export async function updateUser(
  request: FastifyRequest<{ Params: UpdateUserParams }>,
  reply: FastifyReply,
) {
  try {
    const updateUserBodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      password_hash: z.string().min(6).optional(),
    })

    const validatedData = updateUserBodySchema.parse(request.body)

  
    const { id } = request.params

    const updateUserService = makeUpdateUserService()

    const { user: updatedUser } = await updateUserService.execute({
      id,
      ...validatedData,
      authenticatedUserId: request.user.sub,
    
    })

    return reply.status(200).send({ user: updatedUser })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        error: 'Validation error',
        details: error.errors,
      })
    }

    return reply.status(500).send({
      error: 'Internal server error while updating user',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
