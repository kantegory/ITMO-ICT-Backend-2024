import prisma from '../../utils/prisma'
import { CreateScoreInput, UpdateScoreInput } from './scores.schema'

export const createScore = async (data: CreateScoreInput) => {
  return await prisma.score.create({ data })
}

export const findScoresByProjectId = async (projectId: number) => {
  return await prisma.score.findMany({ where: { projectId } })
}

export const updateScore = async (id: number, data: UpdateScoreInput) => {
  return await prisma.score.update({ where: { id }, data })
}

export const deleteScore = async (id: number) => {
  return await prisma.score.delete({ where: { id } })
}
