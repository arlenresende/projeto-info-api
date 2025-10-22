import { ResetPasswordService } from '../reset-password'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeResetPasswordService() {
  const usersRepository = new PrismaUsersRepository()
  const resetPasswordService = new ResetPasswordService(usersRepository)

  return resetPasswordService
}
