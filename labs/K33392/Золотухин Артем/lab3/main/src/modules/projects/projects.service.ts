// project.service.ts
import prisma from '../../utils/prisma'
import { CreateProjectInput, UpdateProjectInput } from './projects.schema'

export const createProject = async (data: CreateProjectInput) => {
  return await prisma.project.create({ data })
}

export const findAllProjects = async () => {
  return await prisma.project.findMany()
}

export const findProjectById = async (id: number) => {
  return await prisma.project.findUnique({ where: { id } })
}

export const updateProject = async (id: number, data: UpdateProjectInput) => {
  return await prisma.project.update({ where: { id }, data })
}

export const deleteProject = async (id: number) => {
  return await prisma.project.delete({ where: { id } })
}
