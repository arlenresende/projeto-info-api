import { Prisma,  User } from '@prisma/client'


export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  updatePassword(id: string, password: string): Promise<User>
  updateUser(id: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>
  deleteUser(id: string): Promise<User | null>
}
