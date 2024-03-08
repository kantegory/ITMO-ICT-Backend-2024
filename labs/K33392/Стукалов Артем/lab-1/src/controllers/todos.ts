import { TodoNotFound } from 'errors/todos'
import * as TodoSchema from 'schemas/todos'
import * as TodoService from 'services/todos'
import { ControllerHandler } from 'types/index'

export const getById: ControllerHandler<typeof TodoSchema.getById> = async (
  req,
  res,
) => {
  const todo = await TodoService.getById(parseInt(req.params.id))
  if (!todo) {
    throw new TodoNotFound()
  }

  return res.code(200).send({
    todo,
  })
}
