import * as CommandSchemaV1 from 'schemas/v1/commands'
import * as CommandService from 'services/commands'
import { ControllerHandler } from 'types/index'

export const execute: ControllerHandler<
  typeof CommandSchemaV1.execute
> = async (req, res) => {
  const command = await CommandService.executeCommand(req.body, req.user.id)
  return res.code(200).send(command)
}
