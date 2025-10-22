import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateVehicleService } from '@/services/factories/make-create-vehicle-service'
import { VehicleAlreadyExistsError } from '@/services/errors/vehicle-already-exists-error'

export async function createVehicle(request: FastifyRequest, reply: FastifyReply) {
  const createVehicleBodySchema = z.object({
    placa: z.string(),
    chassi: z.string(),
    renavam: z.string(),
    modelo: z.string(),
    marca: z.string(),
    ano: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    descricao: z.string().optional(),
    photo: z.string().optional(),
  })

  const { placa, chassi, renavam, modelo, marca, ano, descricao, photo } = createVehicleBodySchema.parse(request.body)

  try {
    const createVehicleService = makeCreateVehicleService()

    const { vehicle } = await createVehicleService.execute({
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
      descricao,
      photo,
    })

    return reply.status(201).send({
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

    throw err
  }
}