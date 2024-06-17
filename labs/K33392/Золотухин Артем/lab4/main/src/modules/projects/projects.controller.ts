// project.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import {
  createProject,
  findAllProjects,
  findProjectById,
  updateProject,
  deleteProject,
} from './projects.service'
import { CreateProjectInput, UpdateProjectInput } from './projects.schema'

export const createProjectHandler = async (
  request: FastifyRequest<{ Body: CreateProjectInput }>,
  reply: FastifyReply
) => {
  const project = await createProject(request.body)
  return reply.code(201).send(project)
}

export const getAllProjectsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const projects = await findAllProjects()
  return reply.send(projects)
}

export const getProjectHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  const project = await findProjectById(id)
  if (!project) {
    return reply.code(404).send({ message: 'Project not found' })
  }
  return reply.send(project)
}

export const updateProjectHandler = async (
  request: FastifyRequest<{ Params: { id: number }; Body: UpdateProjectInput }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  const project = await updateProject(id, request.body)
  return reply.send(project)
}

export const deleteProjectHandler = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id = request.params.id
  await deleteProject(id)
  return reply.code(204).send()
}
