import { Vehicle } from '@prisma/client'
import { VehiclesRepository } from '@/repositories/vehicles-repository'

interface ListVehiclesServiceParams {
  page?: number
  limit?: number
}

interface ListVehiclesServiceResponse {
  vehicles: Vehicle[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export class ListVehiclesService {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    page = 1,
    limit = 10,
  }: ListVehiclesServiceParams): Promise<ListVehiclesServiceResponse> {
    const result = await this.vehiclesRepository.findAll(page, limit)

    return result
  }
}