import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { ListVehiclesService } from '../list-vehicles'

export function makeListVehiclesService() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const listVehiclesService = new ListVehiclesService(vehiclesRepository)

  return listVehiclesService
}