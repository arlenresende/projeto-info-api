import { UpdateUserService } from '../update-user'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeUpdateUserService() {
  const updateUserRepository = new PrismaUsersRepository()
  const updateUserService = new UpdateUserService(updateUserRepository)

  return updateUserService
}
