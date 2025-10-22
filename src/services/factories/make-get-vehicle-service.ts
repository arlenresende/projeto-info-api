import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { GetVehicleService } from '../get-vehicle'

export function makeGetVehicleService() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const getVehicleService = new GetVehicleService(vehiclesRepository)

  return getVehicleService
}