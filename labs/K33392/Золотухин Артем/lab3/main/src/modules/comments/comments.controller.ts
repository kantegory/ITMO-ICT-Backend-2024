import { FastifyRequest, FastifyReply } from 'fastify'
import {
  createComment,
  findCommentsByProjectId,
  updateComment,
  deleteComment,
} from './comments.service'
import { CreateCommentInput, UpdateCommentInput } from './comments.schema'

export const createCommentHandler = async (
  request: FastifyRequest<{ Body: CreateCommentInput }>,
  reply: FastifyReply
) => {
  const comment = await createComment(request.body)
  return reply.code(201).send(comment)
}

export const getCommentsByProjectIdHandler = async (
  request: FastifyRequest<{ Params: { projectId: number } }>,
  reply: FastifyReply
) => {
  const { projectId } = request.params
  const comments = await findCommentsByProjectId(projectId)
  return reply.send(comments)
}

export const updateCommentHandler = async (
  request: FastifyRequest<{ Params: { id: number }; Body: UpdateCommentInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const comment = await updateComment(id, request.body)
  return reply.send(comment)
}

export const deleteCommentHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  await deleteComment(id)
  return reply.code(204).send()
}
