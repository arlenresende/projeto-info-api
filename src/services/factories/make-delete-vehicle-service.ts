import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { DeleteVehicleService } from '../delete-vehicle'

export function makeDeleteVehicleService() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const deleteVehicleService = new DeleteVehicleService(vehiclesRepository)

  return deleteVehicleService
}