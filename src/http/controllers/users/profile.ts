import { makeUserGetProfileService } from '@/services/factories/make-user-get-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeUserGetProfileService()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
  })
}
