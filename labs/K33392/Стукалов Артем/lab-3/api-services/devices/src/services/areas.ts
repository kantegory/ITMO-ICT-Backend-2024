import { AreaSchema as AreaModelSchema } from '@repo/shared/modelSchemas'

import { Area, prisma } from '@repo/shared/db'
import { z } from 'zod'

export async function getById(areaId: number): Promise<Area | undefined> {
  const area =
    (await prisma.area.findFirst({
      where: {
        id: areaId,
      },
    })) ?? undefined

  return area
}

const createData = AreaModelSchema.pick({
  name: true,
  description: true,
  type: true,
})
export async function cerate(
  data: z.infer<typeof createData>,
  userId: number
): Promise<Area> {
  const area = await prisma.area.create({
    data: {
      ...data,
      userId,
    },
  })
  return area
}

export async function addDevice(
  areaId: number,
  deviceId: number
): Promise<boolean> {
  await prisma.device.update({
    where: {
      id: deviceId,
    },
    data: {
      areaId,
    },
  })
  return true
}

export async function removeDevice(
  areaId: number,
  deviceId: number
): Promise<boolean> {
  await prisma.device.update({
    where: {
      id: deviceId,
      areaId,
    },
    data: {
      areaId: null,
    },
  })
  return true
}
export async function getWithOffset(
  offset: number,
  count: number,
  userId: number
): Promise<{
  areas: Area[]
  count: number
}> {
  const query = {
    where: {
      userId,
    },
    skip: offset,
    take: count,
  } as const

  const { areas, allCount } = await prisma.$transaction(async (tx) => {
    const allCount = await tx.area.count(query)
    if (allCount === 0) {
      return {
        allCount,
        areas: [],
      }
    }

    const areas = await tx.area.findMany(query)
    return {
      allCount,
      areas,
    }
  })
  return {
    areas,
    count: allCount,
  }
}
