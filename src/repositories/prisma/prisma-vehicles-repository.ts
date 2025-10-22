import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { VehiclesRepository } from '../vehicles-repository'

export class PrismaVehiclesRepository implements VehiclesRepository {
  async findById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      }
    })

    return vehicle
  }

  async findByPlaca(placa: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        placa,
      },
    })

    return vehicle
  }

  async findByChassi(chassi: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        chassi,
      },
    })

    return vehicle
  }

  async findByRenavam(renavam: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        renavam,
      },
    })

    return vehicle
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    
    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.vehicle.count()
    ])

    return {
      vehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    }
  }

  async create(data: Prisma.VehicleCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    })

    return vehicle
  }

  async update(id: string, data: Prisma.VehicleUncheckedUpdateInput) {
    const vehicleExists = await this.findById(id)
    if (!vehicleExists) {
      throw new Error('Vehicle not found')
    }

    return prisma.vehicle.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    const vehicleExists = await this.findById(id)
    if (!vehicleExists) {
      throw new Error('Vehicle not found')
    }

    return prisma.vehicle.delete({
      where: { id },
    })
  }
}