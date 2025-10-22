import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resources-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'

interface GetUserProfileServiceRequestParams {
  id: string
  authenticatedUserId: string
}
interface GetUserProfileServiceResponseParams {
  user: User
}
export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    authenticatedUserId,
  }: GetUserProfileServiceRequestParams): Promise<GetUserProfileServiceResponseParams> {
    if (id !== authenticatedUserId) {
      throw new Error('You are not authorized to update this user.')
    }

    const user = await this.usersRepository.deleteUser(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
