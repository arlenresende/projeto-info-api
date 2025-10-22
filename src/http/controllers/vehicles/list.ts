import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListVehiclesService } from '@/services/factories/make-list-vehicles-service'

export async function listVehicles(request: FastifyRequest, reply: FastifyReply) {
  const listVehiclesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  })

  const { page, limit } = listVehiclesQuerySchema.parse(request.query)

  try {
    const listVehiclesService = makeListVehiclesService()

    const { vehicles, pagination } = await listVehiclesService.execute({
      page,
      limit,
    })

    return reply.status(200).send({
      vehicles: vehicles.map(vehicle => ({
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
      })),
      pagination,
    })
  } catch (err) {
    throw err
  }
}