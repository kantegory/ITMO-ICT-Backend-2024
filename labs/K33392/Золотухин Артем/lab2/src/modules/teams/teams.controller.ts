// team.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import {
  createTeam,
  findAllTeams,
  findTeamById,
  updateTeam,
  deleteTeam,
} from './teams.service'
import { CreateTeamInput, UpdateTeamInput } from './teams.schema'

export const createTeamHandler = async (
  request: FastifyRequest<{ Body: CreateTeamInput }>,
  reply: FastifyReply
) => {
  const team = await createTeam(request.body)
  return reply.code(201).send(team)
}

export const getAllTeamsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const teams = await findAllTeams()
  return reply.send(teams)
}

export const getTeamHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  const team = await findTeamById(id)
  if (!team) {
    return reply.code(404).send({ message: 'Team not found' })
  }
  return reply.send(team)
}

export const updateTeamHandler = async (
  request: FastifyRequest<{ Params: { id: number }; Body: UpdateTeamInput }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  const team = await updateTeam(id, request.body)
  return reply.send(team)
}

export const deleteTeamHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  await deleteTeam(id)
  return reply.code(204).send()
}
