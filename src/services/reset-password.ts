import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

interface RegisterServiceParams {
  id: string
  password: string
}
interface RegisterServiceResponse {
  user: User
}
export class ResetPasswordService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    password,
  }: RegisterServiceParams): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)
    const user = await this.usersRepository.updatePassword(id, password_hash)

    if (!user) {
      throw new Error('User not found')
    }

    return { user }
  }
}
