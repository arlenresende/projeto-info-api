import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileService } from '../get-user-profile'

export function makeUserGetProfileService() {
  const usersRepository = new PrismaUsersRepository()
  const profileService = new GetUserProfileService(usersRepository)

  return profileService
}
