import prisma from '../../utils/prisma'
import { CreateCommentInput, UpdateCommentInput } from './comments.schema'

export const createComment = async (data: CreateCommentInput) => {
  return await prisma.comment.create({ data })
}

export const findCommentsByProjectId = async (projectId: number) => {
  return await prisma.comment.findMany({ where: { projectId } })
}

export const updateComment = async (id: number, data: UpdateCommentInput) => {
  return await prisma.comment.update({ where: { id }, data })
}

export const deleteComment = async (id: number) => {
  return await prisma.comment.delete({ where: { id } })
}
