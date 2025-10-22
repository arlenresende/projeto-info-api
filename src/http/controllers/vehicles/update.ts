import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateVehicleService } from '@/services/factories/make-update-vehicle-service'
import { VehicleAlreadyExistsError } from '@/services/errors/vehicle-already-exists-error'
import { ResourceNotFoundError } from '@/services/errors/resources-not-found-error'

export async function updateVehicle(request: FastifyRequest, reply: FastifyReply) {
  const updateVehicleParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateVehicleBodySchema = z.object({
    placa: z.string().optional(),
    chassi: z.string().optional(),
    renavam: z.string().optional(),
    modelo: z.string().optional(),
    marca: z.string().optional(),
    ano: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
    descricao: z.string().optional(),
    photo: z.string().optional(),
  })

  const { id } = updateVehicleParamsSchema.parse(request.params)
  const { placa, chassi, renavam, modelo, marca, ano, descricao, photo } = updateVehicleBodySchema.parse(request.body)

  try {
    const updateVehicleService = makeUpdateVehicleService()

    const { vehicle } = await updateVehicleService.execute({
      id,
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
      descricao,
      photo,
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
    if (err instanceof VehicleAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Vehicle not found' })
    }

    throw err
  }
}