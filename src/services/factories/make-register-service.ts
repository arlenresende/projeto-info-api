import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '../register'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerSeriRegisterService = new RegisterService(usersRepository)

  return registerSeriRegisterService
}
