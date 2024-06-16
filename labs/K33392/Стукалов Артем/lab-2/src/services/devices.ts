import { prisma } from 'config/db'
import { DeviceSchema as DeviceModelSchema } from 'modelSchemas'

import { Device } from '@prisma/client'
import { z } from 'zod'

export async function getById(deviceId: number): Promise<Device | undefined> {
  const device =
    (await prisma.device.findFirst({
      where: {
        id: deviceId,
      },
    })) ?? undefined

  return device
}

export async function getByUUID(uuid: string): Promise<Device | undefined> {
  const device =
    (await prisma.device.findFirst({
      where: {
        uuid,
      },
    })) ?? undefined

  return device
}

const createData = DeviceModelSchema.pick({
  name: true,
  description: true,
  type: true,
  uuid: true,
})
export async function cerate(
  data: z.infer<typeof createData>,
): Promise<Device> {
  const device = await prisma.device.create({
    data,
  })
  return device
}

export async function link(uuid: string, userId: number): Promise<boolean> {
  await prisma.device.update({
    where: {
      uuid,
    },
    data: {
      userId,
    },
  })
  return true
}

export async function deLink(
  deviceId: number,
  userId: number,
): Promise<boolean> {
  await prisma.device.update({
    where: {
      id: deviceId,
      userId,
    },
    data: {
      userId: null,
    },
  })
  return true
}

export async function getWithOffset(
  offset: number,
  count: number,
  userId: number,
): Promise<{
  devices: Device[]
  count: number
}> {
  const query = {
    where: {
      userId,
    },
    skip: offset,
    take: count,
  } as const

  const { devices, allCount } = await prisma.$transaction(async (tx) => {
    const allCount = await tx.device.count(query)
    if (allCount === 0) {
      return {
        allCount,
        devices: [],
      }
    }

    const devices = await tx.device.findMany(query)
    return {
      allCount,
      devices,
    }
  })
  return {
    devices,
    count: allCount,
  }
}
