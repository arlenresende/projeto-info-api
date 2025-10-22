import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async updatePassword(id: string, password: string) {
    const userExists = await this.findById(id)
    if (!userExists) {
      throw new Error('User not found')
    }

    return prisma.user.update({
      where: { id },
      data: { password_hash: password },
    })
  }

  async updateUser(id: string, data: Partial<Prisma.UserUncheckedUpdateInput>) {
    const userExists = await this.findById(id)
    if (!userExists) {
      throw new Error('User not found')
    }

    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteUser(id: string) {
    const userExists = await this.findById(id)
    if (!userExists) {
      throw new Error('User not found')
    }
   

    return prisma.user.delete({
      where: { id },
    })
  }
}
