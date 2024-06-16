import { DeviceDataSchema as DeviceDataModelSchema } from '@repo/shared/modelSchemas'

import { DeviceData, prisma } from '@repo/shared/db'
import { z } from 'zod'

const createData = DeviceDataModelSchema.pick({
  deviceId: true,
  status: true,
})
export async function cerate(
  data: z.infer<typeof createData>
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
