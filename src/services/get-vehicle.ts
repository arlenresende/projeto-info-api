import { Vehicle } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resources-not-found-error'
import { VehiclesRepository } from '@/repositories/vehicles-repository'

interface GetVehicleServiceParams {
  vehicleId: string
}

interface GetVehicleServiceResponse {
  vehicle: Vehicle
}

export class GetVehicleService {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    vehicleId,
  }: GetVehicleServiceParams): Promise<GetVehicleServiceResponse> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId)

    if (!vehicle) {
      throw new ResourceNotFoundError()
    }

    return {
      vehicle,
    }
  }
}