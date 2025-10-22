import { DeleteUserService } from '../delete-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeDeleteUserService() {
  const deleteRepository = new PrismaUsersRepository()
  const deleteService = new DeleteUserService(deleteRepository)

  return deleteService
}
