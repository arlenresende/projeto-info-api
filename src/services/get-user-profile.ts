import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resources-not-found-error'

interface GetUserProfileServiceRequestParams {
  userId: string
}

interface GetUserProfileServiceResponseParams {
  user: User
}
export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequestParams): Promise<GetUserProfileServiceResponseParams> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
