import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { UpdateVehicleService } from '../update-vehicle'

export function makeUpdateVehicleService() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const updateVehicleService = new UpdateVehicleService(vehiclesRepository)

  return updateVehicleService
}