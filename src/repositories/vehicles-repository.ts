import { Prisma, Vehicle } from '@prisma/client'

export interface VehiclesRepository {
  findById(id: string): Promise<Vehicle | null>
  findByPlaca(placa: string): Promise<Vehicle | null>
  findByChassi(chassi: string): Promise<Vehicle | null>
  findByRenavam(renavam: string): Promise<Vehicle | null>
  findAll(page?: number, limit?: number): Promise<{
    vehicles: Vehicle[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
    }
  }>
  create(data: Prisma.VehicleCreateInput): Promise<Vehicle>
  update(id: string, data: Prisma.VehicleUncheckedUpdateInput): Promise<Vehicle>
  delete(id: string): Promise<Vehicle | null>
}