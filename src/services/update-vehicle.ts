import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists-error'
import { Vehicle } from '@prisma/client'

interface UpdateVehicleServiceParams {
  id: string
  placa?: string
  chassi?: string
  renavam?: string
  modelo?: string
  marca?: string
  ano?: number
  descricao?: string
  photo?: string
}

interface UpdateVehicleServiceResponse {
  vehicle: Vehicle
}

export class UpdateVehicleService {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    id,
    placa,
    chassi,
    renavam,
    modelo,
    marca,
    ano,
    descricao,
    photo,
  }: UpdateVehicleServiceParams): Promise<UpdateVehicleServiceResponse> {
    const updateData: any = {}

    if (placa) {
      const vehicleWithSamePlaca = await this.vehiclesRepository.findByPlaca(placa)
      if (vehicleWithSamePlaca && vehicleWithSamePlaca.id !== id) {
        throw new VehicleAlreadyExistsError()
      }
      updateData.placa = placa
    }

    if (chassi) {
      const vehicleWithSameChassi = await this.vehiclesRepository.findByChassi(chassi)
      if (vehicleWithSameChassi && vehicleWithSameChassi.id !== id) {
        throw new VehicleAlreadyExistsError()
      }
      updateData.chassi = chassi
    }

    if (renavam) {
      const vehicleWithSameRenavam = await this.vehiclesRepository.findByRenavam(renavam)
      if (vehicleWithSameRenavam && vehicleWithSameRenavam.id !== id) {
        throw new VehicleAlreadyExistsError()
      }
      updateData.renavam = renavam
    }

    if (modelo) {
      updateData.modelo = modelo
    }

    if (marca) {
      updateData.marca = marca
    }

    if (ano) {
      updateData.ano = ano
    }

    if (descricao !== undefined) {
      updateData.descricao = descricao
    }

    if (photo !== undefined) {
      updateData.photo = photo
    }

    const vehicle = await this.vehiclesRepository.update(id, updateData)

    return { vehicle }
  }
}