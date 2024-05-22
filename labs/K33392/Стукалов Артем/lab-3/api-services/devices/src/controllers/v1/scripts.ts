import { ControllerHandler } from '@repo/shared/fastify'
import * as ScriptSchemaV1 from '../../schemas/v1/scripts'
import * as ScriptService from '../../services/scripts'

export const create: ControllerHandler<typeof ScriptSchemaV1.create> = async (
  req,
  res
) => {
  const script = await ScriptService.create(req.body, req.user.id)
  return res.code(200).send(script)
}
