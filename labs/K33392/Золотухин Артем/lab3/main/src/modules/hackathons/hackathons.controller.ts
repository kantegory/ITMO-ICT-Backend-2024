import { FastifyRequest, FastifyReply } from 'fastify'
import {
  createHackathon,
  findAllHackathons,
  findHackathonById,
  updateHackathon,
  deleteHackathon,
} from './hackathons.service'
import { CreateHackathonInput, UpdateHackathonInput } from './hackathons.schema'

export const createHackathonHandler = async (
  request: FastifyRequest<{ Body: CreateHackathonInput }>,
  reply: FastifyReply
) => {
  const hackathon = await createHackathon(request.body)
  return reply.code(201).send(hackathon)
}

export const getAllHackathonsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const hackathons = await findAllHackathons()
  return reply.send(hackathons)
}

export const getHackathonHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  const hackathon = await findHackathonById(id)
  if (!hackathon) {
    return reply.code(404).send({ message: 'Hackathon not found' })
  }
  return reply.send(hackathon)
}

export const updateHackathonHandler = async (
  request: FastifyRequest<{
    Params: { id: number }
    Body: UpdateHackathonInput
  }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  const hackathon = await updateHackathon(id, request.body)
  return reply.send(hackathon)
}

export const deleteHackathonHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  await deleteHackathon(id)
  return reply.code(204).send()
}
