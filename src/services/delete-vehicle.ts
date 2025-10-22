import { Vehicle } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resources-not-found-error'
import { VehiclesRepository } from '@/repositories/vehicles-repository'

interface DeleteVehicleServiceParams {
  id: string
}

interface DeleteVehicleServiceResponse {
  vehicle: Vehicle
}

export class DeleteVehicleService {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    id,
  }: DeleteVehicleServiceParams): Promise<DeleteVehicleServiceResponse> {
    const vehicle = await this.vehiclesRepository.delete(id)

    if (!vehicle) {
      throw new ResourceNotFoundError()
    }

    return {
      vehicle,
    }
  }
}