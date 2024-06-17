import prisma from '../../utils/prisma'
import { CreateHackathonInput, UpdateHackathonInput } from './hackathons.schema'

export const createHackathon = async (data: CreateHackathonInput) => {
  return await prisma.hackathon.create({ data })
}

export const findAllHackathons = async () => {
  return await prisma.hackathon.findMany()
}

export const findHackathonById = async (id: number) => {
  return await prisma.hackathon.findUnique({ where: { id } })
}

export const updateHackathon = async (
  id: number,
  data: UpdateHackathonInput
) => {
  return await prisma.hackathon.update({ where: { id }, data })
}

export const deleteHackathon = async (id: number) => {
  return await prisma.hackathon.delete({ where: { id } })
}
