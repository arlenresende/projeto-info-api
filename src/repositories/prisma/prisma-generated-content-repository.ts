import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { GeneratedContentRepository } from '../generated-content-repository'

export class PrismaGeneratedContentRepository implements GeneratedContentRepository {
  async create(data: Prisma.GeneratedContentCreateInput) {
    const generatedContent = await prisma.generatedContent.create({
      data,
    })

    return generatedContent
  }

  async findById(id: string) {
    const generatedContent = await prisma.generatedContent.findUnique({
      where: {
        id,
      },
    })

    return generatedContent
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    
    const [generatedContents, total] = await Promise.all([
      prisma.generatedContent.findMany({
        orderBy: {
          generatedAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.generatedContent.count()
    ])

    return {
      generatedContents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    }
  }
}