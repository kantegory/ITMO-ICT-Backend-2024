import { ControllerHandler } from '@repo/shared/fastify'
import { AreaNotFound } from '../../errors/areas'
import * as AreasSchemaV1 from '../../schemas/v1/areas'
import * as AreasService from '../../services/areas'

export const getById: ControllerHandler<typeof AreasSchemaV1.getById> = async (
  req,
  res
) => {
  const area = await AreasService.getById(req.query.id)
  if (!area) {
    throw new AreaNotFound()
  }
  return res.code(200).send({
    area,
  })
}

export const get: ControllerHandler<typeof AreasSchemaV1.get> = async (
  req,
  res
) => {
  const result = await AreasService.getWithOffset(
    req.query.offset,
    req.query.count,
    req.user.id
  )
  return res.code(200).send(result)
}

export const create: ControllerHandler<typeof AreasSchemaV1.create> = async (
  req,
  res
) => {
  const result = await AreasService.cerate(req.body, req.user.id)
  return res.code(200).send(result)
}

export const addDevice: ControllerHandler<
  typeof AreasSchemaV1.addDevice
> = async (req, res) => {
  const result = await AreasService.addDevice(
    req.body.areaId,
    req.body.deviceId
  )
  return res.code(200).send({
    res: result,
  })
}

export const removeDevice: ControllerHandler<
  typeof AreasSchemaV1.removeDevice
> = async (req, res) => {
  const result = await AreasService.removeDevice(
    req.body.areaId,
    req.body.deviceId
  )
  return res.code(200).send({
    res: result,
  })
}
