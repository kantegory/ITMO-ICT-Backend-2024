// team.service.ts
import prisma from '../../utils/prisma'
import { CreateTeamInput, UpdateTeamInput } from './teams.schema'

export const createTeam = async (data: CreateTeamInput) => {
  return await prisma.team.create({ data })
}

export const findAllTeams = async () => {
  return await prisma.team.findMany()
}

export const findTeamById = async (id: number) => {
  return await prisma.team.findUnique({ where: { id } })
}

export const updateTeam = async (id: number, data: UpdateTeamInput) => {
  return await prisma.team.update({ where: { id }, data })
}

export const deleteTeam = async (id: number) => {
  return await prisma.team.delete({ where: { id } })
}
