import * as DevicesDataSchemaV1 from 'schemas/v1/deviceData'
import * as DevicesDataService from 'services/deviceData'
import { ControllerHandler } from 'types/index'

export const log: ControllerHandler<typeof DevicesDataSchemaV1.log> = async (
  req,
  res,
) => {
  await DevicesDataService.cerate(req.body)
  return res.code(200).send({
    res: true,
  })
}
