import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { CreateVehicleService } from '../create-vehicle'

export function makeCreateVehicleService() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const createVehicleService = new CreateVehicleService(vehiclesRepository)

  return createVehicleService
}