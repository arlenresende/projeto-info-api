import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetVehicleService } from '@/services/factories/make-get-vehicle-service'
import { ResourceNotFoundError } from '@/services/errors/resources-not-found-error'

export async function getVehicle(request: FastifyRequest, reply: FastifyReply) {
  const getVehicleParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getVehicleParamsSchema.parse(request.params)

  try {
    const getVehicleService = makeGetVehicleService()

    const { vehicle } = await getVehicleService.execute({
      vehicleId: id,
    })

    return reply.status(200).send({
      vehicle: {
        id: vehicle.id,
        placa: vehicle.placa,
        chassi: vehicle.chassi,
        renavam: vehicle.renavam,
        modelo: vehicle.modelo,
        marca: vehicle.marca,
        ano: vehicle.ano,
        descricao: vehicle.descricao,
        photo: vehicle.photo,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Vehicle not found' })
    }

    throw err
  }
}