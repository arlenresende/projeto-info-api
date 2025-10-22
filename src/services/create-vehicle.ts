import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists-error'
import { Vehicle } from '@prisma/client'

interface CreateVehicleServiceParams {
  placa: string
  chassi: string
  renavam: string
  modelo: string
  marca: string
  ano: number
  descricao?: string
  photo?: string
}

interface CreateVehicleServiceResponse {
  vehicle: Vehicle
}

export class CreateVehicleService {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    placa,
    chassi,
    renavam,
    modelo,
    marca,
    ano,
    descricao,
    photo,
  }: CreateVehicleServiceParams): Promise<CreateVehicleServiceResponse> {
    // Verificar se já existe veículo com a mesma placa
    const vehicleWithSamePlaca = await this.vehiclesRepository.findByPlaca(placa)
    if (vehicleWithSamePlaca) {
      throw new VehicleAlreadyExistsError()
    }

    // Verificar se já existe veículo com o mesmo chassi
    const vehicleWithSameChassi = await this.vehiclesRepository.findByChassi(chassi)
    if (vehicleWithSameChassi) {
      throw new VehicleAlreadyExistsError()
    }

    // Verificar se já existe veículo com o mesmo renavam
    const vehicleWithSameRenavam = await this.vehiclesRepository.findByRenavam(renavam)
    if (vehicleWithSameRenavam) {
      throw new VehicleAlreadyExistsError()
    }

    const vehicle = await this.vehiclesRepository.create({
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
      descricao,
      photo,
    })

    return { vehicle }
  }
}