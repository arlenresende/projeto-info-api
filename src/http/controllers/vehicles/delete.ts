import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteVehicleService } from '@/services/factories/make-delete-vehicle-service'
import { ResourceNotFoundError } from '@/services/errors/resources-not-found-error'

export async function deleteVehicle(request: FastifyRequest, reply: FastifyReply) {
  const deleteVehicleParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteVehicleParamsSchema.parse(request.params)

  try {
    const deleteVehicleService = makeDeleteVehicleService()

    await deleteVehicleService.execute({
      id,
    })

    return reply.status(200).send({ message: 'Vehicle deleted successfully' })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Vehicle not found' })
    }

    throw err
  }
}