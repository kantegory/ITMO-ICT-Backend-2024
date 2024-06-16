import { prisma } from 'config/db'
import { DeviceDataSchema as DeviceDataModelSchema } from 'modelSchemas'

import { DeviceData } from '@prisma/client'
import { z } from 'zod'

const createData = DeviceDataModelSchema.pick({
  deviceId: true,
  status: true,
})
export async function cerate(
  data: z.infer<typeof createData>,
): Promise<DeviceData> {
  const device = await prisma.deviceData.create({
    data: {
      ...data,
      status: data.status || {},
      ts: Math.floor(Date.now() / 1000),
    },
  })
  return device
}
