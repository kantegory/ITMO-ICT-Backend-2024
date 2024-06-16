import { DeviceNotFound } from 'errors/devices'
import * as DevicesSchemaV1 from 'schemas/v1/devices'
import * as DevicesService from 'services/devices'
import { ControllerHandler } from 'types/index'

export const getById: ControllerHandler<
  typeof DevicesSchemaV1.getById
> = async (req, res) => {
  const device = await DevicesService.getById(req.query.id)
  if (!device) {
    throw new DeviceNotFound()
  }
  return res.code(200).send({
    device,
  })
}

export const get: ControllerHandler<typeof DevicesSchemaV1.get> = async (
  req,
  res,
) => {
  const result = await DevicesService.getWithOffset(
    req.query.offset,
    req.query.count,
    req.user.id,
  )
  return res.code(200).send(result)
}

export const create: ControllerHandler<typeof DevicesSchemaV1.create> = async (
  req,
  res,
) => {
  const result = await DevicesService.cerate(req.body)
  return res.code(200).send(result)
}

export const link: ControllerHandler<typeof DevicesSchemaV1.link> = async (
  req,
  res,
) => {
  const result = await DevicesService.link(req.body.uuid, req.user.id)
  return res.code(200).send({
    res: result,
  })
}

export const deLink: ControllerHandler<typeof DevicesSchemaV1.deLink> = async (
  req,
  res,
) => {
  const result = await DevicesService.deLink(req.body.id, req.user.id)
  return res.code(200).send({
    res: result,
  })
}
