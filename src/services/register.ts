import { UsersRepository } from '@/repositories/users-repository'

import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface registerServiceParams {
  name: string
  email: string
  password: string

}
interface RegisterServiceResponse {
  user: User
}
export class RegisterService {
  constructor(private usersReporistory: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    
  }: registerServiceParams): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersReporistory.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersReporistory.create({
      name,
      email,
      password_hash,
      
    })

    return { user }
  }
}
