import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterServiceParams {
  id: string
  name?: string
  email?: string
  password_hash?: string
  authenticatedUserId: string
}

interface RegisterServiceResponse {
  user: User
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password_hash,
    authenticatedUserId,
  }: RegisterServiceParams): Promise<RegisterServiceResponse> {
    if (id !== authenticatedUserId) {
      throw new Error('You are not authorized to update this user.')
    }

    const updateData: any = {}

    if (name) {
      updateData.name = name
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new UserAlreadyExistsError()
      }
      updateData.email = email
    }

    if (password_hash) {
      updateData.password_hash = await hash(password_hash, 6)
    }

    const user = await this.usersRepository.updateUser(id, updateData)

    return { user }
  }
}
