import * as TodoSchemaV1 from 'schemas/v1/todos'
import * as TodoService from 'services/todos'
import { ControllerHandler } from 'types/index'

export const getById: ControllerHandler<typeof TodoSchemaV1.getById> = async (
  req,
  res,
) => {
  const todo = await TodoService.getByIdSafe(req.query.id)
  return res.code(200).send({
    todo,
  })
}
export const create: ControllerHandler<typeof TodoSchemaV1.create> = async (
  req,
  res,
) => {
  const todo = await TodoService.cerate(req.body.title, req.body.description)
  return res.code(200).send({
    todo,
  })
}

export const get: ControllerHandler<typeof TodoSchemaV1.get> = async (
  req,
  res,
) => {
  req.body
  const result = await TodoService.getWithOffset(
    req.query.offset,
    req.query.count,
  )
  return res.code(200).send(result)
}
