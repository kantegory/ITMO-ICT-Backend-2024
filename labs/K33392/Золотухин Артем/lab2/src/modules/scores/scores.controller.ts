import { FastifyRequest, FastifyReply } from 'fastify'
import {
  createScore,
  findScoresByProjectId,
  updateScore,
  deleteScore,
} from './scores.service'
import { CreateScoreInput, UpdateScoreInput } from './scores.schema'

export const createScoreHandler = async (
  request: FastifyRequest<{ Body: CreateScoreInput }>,
  reply: FastifyReply
) => {
  const score = await createScore(request.body)
  return reply.code(201).send(score)
}

export const getScoresByProjectIdHandler = async (
  request: FastifyRequest<{ Params: { projectId: number } }>,
  reply: FastifyReply
) => {
  const { projectId } = request.params
  const scores = await findScoresByProjectId(projectId)
  return reply.send(scores)
}

export const updateScoreHandler = async (
  request: FastifyRequest<{ Params: { id: number }; Body: UpdateScoreInput }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const score = await updateScore(id, request.body)
  return reply.send(score)
}

export const deleteScoreHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  await deleteScore(id)
  return reply.code(204).send()
}
