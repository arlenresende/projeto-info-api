import { Prisma, GeneratedContent } from '@prisma/client'

interface PaginationResult {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface FindAllResult {
  generatedContents: GeneratedContent[]
  pagination: PaginationResult
}

export interface GeneratedContentRepository {
  create(data: Prisma.GeneratedContentCreateInput): Promise<GeneratedContent>
  findById(id: string): Promise<GeneratedContent | null>
  findAll(page?: number, limit?: number): Promise<FindAllResult>
}