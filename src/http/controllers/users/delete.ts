import { makeDeleteUserService } from '@/services/factories/make-delete-user'
import { FastifyReply, FastifyRequest } from 'fastify'

interface GetParams {
  id: string
}

export async function deleteUser(
  request: FastifyRequest<{ Params: GetParams }>,
  reply: FastifyReply,
) {
  const deleteUser = makeDeleteUserService()
  const { id } = request.params

  try {
    await deleteUser.execute({
      id,
      authenticatedUserId: request.user.sub,
    })
    return reply.status(200).send({ message: 'User deleted successfully' })
  } catch (err) {
    console.error(err)
    return reply
      .status(500)
      .send({ error: 'An error occurred while delete the User' })
  }
}
