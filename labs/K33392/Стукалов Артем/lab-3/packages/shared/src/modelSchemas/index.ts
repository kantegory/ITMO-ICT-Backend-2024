import { z } from 'zod'
import { Prisma } from '@repo/shared/db'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
  | Prisma.JsonValue
  | null
  | 'JsonNull'
  | 'DbNull'
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull
  if (v === 'JsonNull') return Prisma.JsonNull
  return v
}

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
)

export type JsonValueType = z.infer<typeof JsonValueSchema>

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v))

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(
  () =>
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
      z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
      z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    ])
)

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
])

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'username',
  'passHash',
  'passSalt',
  'createdAt',
  'isActive',
  'isAdmin',
])

export const DeviceScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'description',
  'isConnected',
  'uuid',
  'type',
  'userId',
  'areaId',
])

export const AreaScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'description',
  'type',
  'userId',
])

export const BaseCommandScalarFieldEnumSchema = z.enum(['id', 'name', 'args'])

export const CommandScalarFieldEnumSchema = z.enum([
  'id',
  'ts',
  'isExecuted',
  'status',
  'params',
  'userId',
  'deviceId',
  'baseCommandId',
])

export const ScriptScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'description',
  'conditionParams',
  'commandParams',
  'userId',
  'conditionDeviceId',
  'commandDeviceId',
  'baseCommandId',
])

export const DeviceDataScalarFieldEnumSchema = z.enum([
  'id',
  'ts',
  'status',
  'deviceId',
])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const JsonNullValueInputSchema = z
  .enum(['JsonNull'])
  .transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value))

export const QueryModeSchema = z.enum(['default', 'insensitive'])

export const NullsOrderSchema = z.enum(['first', 'last'])

export const JsonNullValueFilterSchema = z
  .enum(['DbNull', 'JsonNull', 'AnyNull'])
  .transform((value) =>
    value === 'JsonNull'
      ? Prisma.JsonNull
      : value === 'DbNull'
        ? Prisma.JsonNull
        : value === 'AnyNull'
          ? Prisma.AnyNull
          : value
  )

export const DeviceTypeSchema = z.enum(['Temperature', 'Relay'])

export type DeviceTypeType = `${z.infer<typeof DeviceTypeSchema>}`

export const AreaTypeSchema = z.enum(['Room'])

export type AreaTypeType = `${z.infer<typeof AreaTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean(),
  isAdmin: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// DEVICE SCHEMA
/////////////////////////////////////////

export const DeviceSchema = z.object({
  type: DeviceTypeSchema,
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean(),
  uuid: z.string(),
  userId: z.number().int().nullable(),
  areaId: z.number().int().nullable(),
})

export type Device = z.infer<typeof DeviceSchema>

/////////////////////////////////////////
// AREA SCHEMA
/////////////////////////////////////////

export const AreaSchema = z.object({
  type: AreaTypeSchema,
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  userId: z.number().int(),
})

export type Area = z.infer<typeof AreaSchema>

/////////////////////////////////////////
// BASE COMMAND SCHEMA
/////////////////////////////////////////

export const BaseCommandSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  args: JsonValueSchema.nullable(),
})

export type BaseCommand = z.infer<typeof BaseCommandSchema>

/////////////////////////////////////////
// COMMAND SCHEMA
/////////////////////////////////////////

export const CommandSchema = z.object({
  id: z.number().int(),
  ts: z.number().int(),
  isExecuted: z.boolean(),
  status: JsonValueSchema.nullable(),
  params: JsonValueSchema.nullable(),
  userId: z.number().int(),
  deviceId: z.number().int(),
  baseCommandId: z.number().int(),
})

export type Command = z.infer<typeof CommandSchema>

/////////////////////////////////////////
// SCRIPT SCHEMA
/////////////////////////////////////////

export const ScriptSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  conditionParams: JsonValueSchema.nullable(),
  commandParams: JsonValueSchema.nullable(),
  userId: z.number().int(),
  conditionDeviceId: z.number().int().nullable(),
  commandDeviceId: z.number().int(),
  baseCommandId: z.number().int(),
})

export type Script = z.infer<typeof ScriptSchema>

/////////////////////////////////////////
// DEVICE DATA SCHEMA
/////////////////////////////////////////

export const DeviceDataSchema = z.object({
  id: z.number().int(),
  ts: z.number().int(),
  status: JsonValueSchema.nullable(),
  deviceId: z.number().int(),
})

export type DeviceData = z.infer<typeof DeviceDataSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    devices: z
      .union([z.boolean(), z.lazy(() => DeviceFindManyArgsSchema)])
      .optional(),
    areas: z
      .union([z.boolean(), z.lazy(() => AreaFindManyArgsSchema)])
      .optional(),
    commands: z
      .union([z.boolean(), z.lazy(() => CommandFindManyArgsSchema)])
      .optional(),
    scripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict()

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict()

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      devices: z.boolean().optional(),
      areas: z.boolean().optional(),
      commands: z.boolean().optional(),
      scripts: z.boolean().optional(),
    })
    .strict()

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    username: z.boolean().optional(),
    passHash: z.boolean().optional(),
    passSalt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    isActive: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
    devices: z
      .union([z.boolean(), z.lazy(() => DeviceFindManyArgsSchema)])
      .optional(),
    areas: z
      .union([z.boolean(), z.lazy(() => AreaFindManyArgsSchema)])
      .optional(),
    commands: z
      .union([z.boolean(), z.lazy(() => CommandFindManyArgsSchema)])
      .optional(),
    scripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

// DEVICE
//------------------------------------------------------

export const DeviceIncludeSchema: z.ZodType<Prisma.DeviceInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    area: z.union([z.boolean(), z.lazy(() => AreaArgsSchema)]).optional(),
    commands: z
      .union([z.boolean(), z.lazy(() => CommandFindManyArgsSchema)])
      .optional(),
    conditionScripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    commandScripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    deviceData: z
      .union([z.boolean(), z.lazy(() => DeviceDataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => DeviceCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

export const DeviceArgsSchema: z.ZodType<Prisma.DeviceDefaultArgs> = z
  .object({
    select: z.lazy(() => DeviceSelectSchema).optional(),
    include: z.lazy(() => DeviceIncludeSchema).optional(),
  })
  .strict()

export const DeviceCountOutputTypeArgsSchema: z.ZodType<Prisma.DeviceCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => DeviceCountOutputTypeSelectSchema).nullish(),
    })
    .strict()

export const DeviceCountOutputTypeSelectSchema: z.ZodType<Prisma.DeviceCountOutputTypeSelect> =
  z
    .object({
      commands: z.boolean().optional(),
      conditionScripts: z.boolean().optional(),
      commandScripts: z.boolean().optional(),
      deviceData: z.boolean().optional(),
    })
    .strict()

export const DeviceSelectSchema: z.ZodType<Prisma.DeviceSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    isConnected: z.boolean().optional(),
    uuid: z.boolean().optional(),
    type: z.boolean().optional(),
    userId: z.boolean().optional(),
    areaId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    area: z.union([z.boolean(), z.lazy(() => AreaArgsSchema)]).optional(),
    commands: z
      .union([z.boolean(), z.lazy(() => CommandFindManyArgsSchema)])
      .optional(),
    conditionScripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    commandScripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    deviceData: z
      .union([z.boolean(), z.lazy(() => DeviceDataFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => DeviceCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

// AREA
//------------------------------------------------------

export const AreaIncludeSchema: z.ZodType<Prisma.AreaInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    devices: z
      .union([z.boolean(), z.lazy(() => DeviceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => AreaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

export const AreaArgsSchema: z.ZodType<Prisma.AreaDefaultArgs> = z
  .object({
    select: z.lazy(() => AreaSelectSchema).optional(),
    include: z.lazy(() => AreaIncludeSchema).optional(),
  })
  .strict()

export const AreaCountOutputTypeArgsSchema: z.ZodType<Prisma.AreaCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => AreaCountOutputTypeSelectSchema).nullish(),
    })
    .strict()

export const AreaCountOutputTypeSelectSchema: z.ZodType<Prisma.AreaCountOutputTypeSelect> =
  z
    .object({
      devices: z.boolean().optional(),
    })
    .strict()

export const AreaSelectSchema: z.ZodType<Prisma.AreaSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    type: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    devices: z
      .union([z.boolean(), z.lazy(() => DeviceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => AreaCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

// BASE COMMAND
//------------------------------------------------------

export const BaseCommandIncludeSchema: z.ZodType<Prisma.BaseCommandInclude> = z
  .object({
    commands: z
      .union([z.boolean(), z.lazy(() => CommandFindManyArgsSchema)])
      .optional(),
    scripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => BaseCommandCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

export const BaseCommandArgsSchema: z.ZodType<Prisma.BaseCommandDefaultArgs> = z
  .object({
    select: z.lazy(() => BaseCommandSelectSchema).optional(),
    include: z.lazy(() => BaseCommandIncludeSchema).optional(),
  })
  .strict()

export const BaseCommandCountOutputTypeArgsSchema: z.ZodType<Prisma.BaseCommandCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => BaseCommandCountOutputTypeSelectSchema).nullish(),
    })
    .strict()

export const BaseCommandCountOutputTypeSelectSchema: z.ZodType<Prisma.BaseCommandCountOutputTypeSelect> =
  z
    .object({
      commands: z.boolean().optional(),
      scripts: z.boolean().optional(),
    })
    .strict()

export const BaseCommandSelectSchema: z.ZodType<Prisma.BaseCommandSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    args: z.boolean().optional(),
    commands: z
      .union([z.boolean(), z.lazy(() => CommandFindManyArgsSchema)])
      .optional(),
    scripts: z
      .union([z.boolean(), z.lazy(() => ScriptFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => BaseCommandCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

// COMMAND
//------------------------------------------------------

export const CommandIncludeSchema: z.ZodType<Prisma.CommandInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
    baseCommand: z
      .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
      .optional(),
  })
  .strict()

export const CommandArgsSchema: z.ZodType<Prisma.CommandDefaultArgs> = z
  .object({
    select: z.lazy(() => CommandSelectSchema).optional(),
    include: z.lazy(() => CommandIncludeSchema).optional(),
  })
  .strict()

export const CommandSelectSchema: z.ZodType<Prisma.CommandSelect> = z
  .object({
    id: z.boolean().optional(),
    ts: z.boolean().optional(),
    isExecuted: z.boolean().optional(),
    status: z.boolean().optional(),
    params: z.boolean().optional(),
    userId: z.boolean().optional(),
    deviceId: z.boolean().optional(),
    baseCommandId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
    baseCommand: z
      .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
      .optional(),
  })
  .strict()

// SCRIPT
//------------------------------------------------------

export const ScriptIncludeSchema: z.ZodType<Prisma.ScriptInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    conditionDevice: z
      .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
      .optional(),
    commandDevice: z
      .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
      .optional(),
    baseCommand: z
      .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
      .optional(),
  })
  .strict()

export const ScriptArgsSchema: z.ZodType<Prisma.ScriptDefaultArgs> = z
  .object({
    select: z.lazy(() => ScriptSelectSchema).optional(),
    include: z.lazy(() => ScriptIncludeSchema).optional(),
  })
  .strict()

export const ScriptSelectSchema: z.ZodType<Prisma.ScriptSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    conditionParams: z.boolean().optional(),
    commandParams: z.boolean().optional(),
    userId: z.boolean().optional(),
    conditionDeviceId: z.boolean().optional(),
    commandDeviceId: z.boolean().optional(),
    baseCommandId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    conditionDevice: z
      .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
      .optional(),
    commandDevice: z
      .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
      .optional(),
    baseCommand: z
      .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
      .optional(),
  })
  .strict()

// DEVICE DATA
//------------------------------------------------------

export const DeviceDataIncludeSchema: z.ZodType<Prisma.DeviceDataInclude> = z
  .object({
    device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
  })
  .strict()

export const DeviceDataArgsSchema: z.ZodType<Prisma.DeviceDataDefaultArgs> = z
  .object({
    select: z.lazy(() => DeviceDataSelectSchema).optional(),
    include: z.lazy(() => DeviceDataIncludeSchema).optional(),
  })
  .strict()

export const DeviceDataSelectSchema: z.ZodType<Prisma.DeviceDataSelect> = z
  .object({
    id: z.boolean().optional(),
    ts: z.boolean().optional(),
    status: z.boolean().optional(),
    deviceId: z.boolean().optional(),
    device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
  })
  .strict()

// CREATE MANY USER AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyUserAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyUserAndReturnOutputTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      username: z.boolean().optional(),
      passHash: z.boolean().optional(),
      passSalt: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
    })
    .strict()

// CREATE MANY DEVICE AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyDeviceAndReturnOutputTypeIncludeSchema: z.ZodType<Prisma.CreateManyDeviceAndReturnOutputTypeInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
      area: z.union([z.boolean(), z.lazy(() => AreaArgsSchema)]).optional(),
    })
    .strict()

export const CreateManyDeviceAndReturnOutputTypeArgsSchema: z.ZodType<Prisma.CreateManyDeviceAndReturnOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => CreateManyDeviceAndReturnOutputTypeSelectSchema)
        .optional(),
      include: z
        .lazy(() => CreateManyDeviceAndReturnOutputTypeIncludeSchema)
        .optional(),
    })
    .strict()

export const CreateManyDeviceAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyDeviceAndReturnOutputTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      description: z.boolean().optional(),
      isConnected: z.boolean().optional(),
      uuid: z.boolean().optional(),
      type: z.boolean().optional(),
      userId: z.boolean().optional(),
      areaId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
      area: z.union([z.boolean(), z.lazy(() => AreaArgsSchema)]).optional(),
    })
    .strict()

// CREATE MANY AREA AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyAreaAndReturnOutputTypeIncludeSchema: z.ZodType<Prisma.CreateManyAreaAndReturnOutputTypeInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict()

export const CreateManyAreaAndReturnOutputTypeArgsSchema: z.ZodType<Prisma.CreateManyAreaAndReturnOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => CreateManyAreaAndReturnOutputTypeSelectSchema)
        .optional(),
      include: z
        .lazy(() => CreateManyAreaAndReturnOutputTypeIncludeSchema)
        .optional(),
    })
    .strict()

export const CreateManyAreaAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyAreaAndReturnOutputTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      description: z.boolean().optional(),
      type: z.boolean().optional(),
      userId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict()

// CREATE MANY BASE COMMAND AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyBaseCommandAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyBaseCommandAndReturnOutputTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      args: z.boolean().optional(),
    })
    .strict()

// CREATE MANY COMMAND AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyCommandAndReturnOutputTypeIncludeSchema: z.ZodType<Prisma.CreateManyCommandAndReturnOutputTypeInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
      device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
      baseCommand: z
        .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
        .optional(),
    })
    .strict()

export const CreateManyCommandAndReturnOutputTypeArgsSchema: z.ZodType<Prisma.CreateManyCommandAndReturnOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => CreateManyCommandAndReturnOutputTypeSelectSchema)
        .optional(),
      include: z
        .lazy(() => CreateManyCommandAndReturnOutputTypeIncludeSchema)
        .optional(),
    })
    .strict()

export const CreateManyCommandAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyCommandAndReturnOutputTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      ts: z.boolean().optional(),
      isExecuted: z.boolean().optional(),
      status: z.boolean().optional(),
      params: z.boolean().optional(),
      userId: z.boolean().optional(),
      deviceId: z.boolean().optional(),
      baseCommandId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
      device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
      baseCommand: z
        .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
        .optional(),
    })
    .strict()

// CREATE MANY SCRIPT AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyScriptAndReturnOutputTypeIncludeSchema: z.ZodType<Prisma.CreateManyScriptAndReturnOutputTypeInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
      conditionDevice: z
        .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
        .optional(),
      commandDevice: z
        .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
        .optional(),
      baseCommand: z
        .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
        .optional(),
    })
    .strict()

export const CreateManyScriptAndReturnOutputTypeArgsSchema: z.ZodType<Prisma.CreateManyScriptAndReturnOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => CreateManyScriptAndReturnOutputTypeSelectSchema)
        .optional(),
      include: z
        .lazy(() => CreateManyScriptAndReturnOutputTypeIncludeSchema)
        .optional(),
    })
    .strict()

export const CreateManyScriptAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyScriptAndReturnOutputTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      name: z.boolean().optional(),
      description: z.boolean().optional(),
      conditionParams: z.boolean().optional(),
      commandParams: z.boolean().optional(),
      userId: z.boolean().optional(),
      conditionDeviceId: z.boolean().optional(),
      commandDeviceId: z.boolean().optional(),
      baseCommandId: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
      conditionDevice: z
        .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
        .optional(),
      commandDevice: z
        .union([z.boolean(), z.lazy(() => DeviceArgsSchema)])
        .optional(),
      baseCommand: z
        .union([z.boolean(), z.lazy(() => BaseCommandArgsSchema)])
        .optional(),
    })
    .strict()

// CREATE MANY DEVICE DATA AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyDeviceDataAndReturnOutputTypeIncludeSchema: z.ZodType<Prisma.CreateManyDeviceDataAndReturnOutputTypeInclude> =
  z
    .object({
      device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
    })
    .strict()

export const CreateManyDeviceDataAndReturnOutputTypeArgsSchema: z.ZodType<Prisma.CreateManyDeviceDataAndReturnOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => CreateManyDeviceDataAndReturnOutputTypeSelectSchema)
        .optional(),
      include: z
        .lazy(() => CreateManyDeviceDataAndReturnOutputTypeIncludeSchema)
        .optional(),
    })
    .strict()

export const CreateManyDeviceDataAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyDeviceDataAndReturnOutputTypeSelect> =
  z
    .object({
      id: z.boolean().optional(),
      ts: z.boolean().optional(),
      status: z.boolean().optional(),
      deviceId: z.boolean().optional(),
      device: z.union([z.boolean(), z.lazy(() => DeviceArgsSchema)]).optional(),
    })
    .strict()

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    username: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    passHash: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    passSalt: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    isAdmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
    areas: z.lazy(() => AreaListRelationFilterSchema).optional(),
    commands: z.lazy(() => CommandListRelationFilterSchema).optional(),
    scripts: z.lazy(() => ScriptListRelationFilterSchema).optional(),
  })
  .strict()

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      passHash: z.lazy(() => SortOrderSchema).optional(),
      passSalt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
      devices: z
        .lazy(() => DeviceOrderByRelationAggregateInputSchema)
        .optional(),
      areas: z.lazy(() => AreaOrderByRelationAggregateInputSchema).optional(),
      commands: z
        .lazy(() => CommandOrderByRelationAggregateInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict()

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        username: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        username: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          username: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          passHash: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          passSalt: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          isActive: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          isAdmin: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
          areas: z.lazy(() => AreaListRelationFilterSchema).optional(),
          commands: z.lazy(() => CommandListRelationFilterSchema).optional(),
          scripts: z.lazy(() => ScriptListRelationFilterSchema).optional(),
        })
        .strict()
    )

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      passHash: z.lazy(() => SortOrderSchema).optional(),
      passSalt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      username: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      passHash: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      passSalt: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      isActive: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      isAdmin: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
    })
    .strict()

export const DeviceWhereInputSchema: z.ZodType<Prisma.DeviceWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DeviceWhereInputSchema),
        z.lazy(() => DeviceWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DeviceWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DeviceWhereInputSchema),
        z.lazy(() => DeviceWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    isConnected: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    uuid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    type: z
      .union([
        z.lazy(() => EnumDeviceTypeFilterSchema),
        z.lazy(() => DeviceTypeSchema),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    areaId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    user: z
      .union([
        z.lazy(() => UserNullableRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional()
      .nullable(),
    area: z
      .union([
        z.lazy(() => AreaNullableRelationFilterSchema),
        z.lazy(() => AreaWhereInputSchema),
      ])
      .optional()
      .nullable(),
    commands: z.lazy(() => CommandListRelationFilterSchema).optional(),
    conditionScripts: z.lazy(() => ScriptListRelationFilterSchema).optional(),
    commandScripts: z.lazy(() => ScriptListRelationFilterSchema).optional(),
    deviceData: z.lazy(() => DeviceDataListRelationFilterSchema).optional(),
  })
  .strict()

export const DeviceOrderByWithRelationInputSchema: z.ZodType<Prisma.DeviceOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      isConnected: z.lazy(() => SortOrderSchema).optional(),
      uuid: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      areaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      area: z.lazy(() => AreaOrderByWithRelationInputSchema).optional(),
      commands: z
        .lazy(() => CommandOrderByRelationAggregateInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptOrderByRelationAggregateInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptOrderByRelationAggregateInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict()

export const DeviceWhereUniqueInputSchema: z.ZodType<Prisma.DeviceWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        uuid: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        uuid: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          uuid: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => DeviceWhereInputSchema),
              z.lazy(() => DeviceWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => DeviceWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => DeviceWhereInputSchema),
              z.lazy(() => DeviceWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          isConnected: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          type: z
            .union([
              z.lazy(() => EnumDeviceTypeFilterSchema),
              z.lazy(() => DeviceTypeSchema),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          areaId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          user: z
            .union([
              z.lazy(() => UserNullableRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional()
            .nullable(),
          area: z
            .union([
              z.lazy(() => AreaNullableRelationFilterSchema),
              z.lazy(() => AreaWhereInputSchema),
            ])
            .optional()
            .nullable(),
          commands: z.lazy(() => CommandListRelationFilterSchema).optional(),
          conditionScripts: z
            .lazy(() => ScriptListRelationFilterSchema)
            .optional(),
          commandScripts: z
            .lazy(() => ScriptListRelationFilterSchema)
            .optional(),
          deviceData: z
            .lazy(() => DeviceDataListRelationFilterSchema)
            .optional(),
        })
        .strict()
    )

export const DeviceOrderByWithAggregationInputSchema: z.ZodType<Prisma.DeviceOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      isConnected: z.lazy(() => SortOrderSchema).optional(),
      uuid: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      areaId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => DeviceCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => DeviceAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => DeviceMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => DeviceMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => DeviceSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const DeviceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DeviceScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DeviceScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      isConnected: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      uuid: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumDeviceTypeWithAggregatesFilterSchema),
          z.lazy(() => DeviceTypeSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const AreaWhereInputSchema: z.ZodType<Prisma.AreaWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AreaWhereInputSchema),
        z.lazy(() => AreaWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AreaWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AreaWhereInputSchema),
        z.lazy(() => AreaWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    type: z
      .union([
        z.lazy(() => EnumAreaTypeFilterSchema),
        z.lazy(() => AreaTypeSchema),
      ])
      .optional(),
    userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
  })
  .strict()

export const AreaOrderByWithRelationInputSchema: z.ZodType<Prisma.AreaOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      devices: z
        .lazy(() => DeviceOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict()

export const AreaWhereUniqueInputSchema: z.ZodType<Prisma.AreaWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => AreaWhereInputSchema),
              z.lazy(() => AreaWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AreaWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AreaWhereInputSchema),
              z.lazy(() => AreaWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          type: z
            .union([
              z.lazy(() => EnumAreaTypeFilterSchema),
              z.lazy(() => AreaTypeSchema),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
        })
        .strict()
    )

export const AreaOrderByWithAggregationInputSchema: z.ZodType<Prisma.AreaOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => AreaCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => AreaAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => AreaMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => AreaMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => AreaSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const AreaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AreaScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AreaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AreaScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AreaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumAreaTypeWithAggregatesFilterSchema),
          z.lazy(() => AreaTypeSchema),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict()

export const BaseCommandWhereInputSchema: z.ZodType<Prisma.BaseCommandWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BaseCommandWhereInputSchema),
          z.lazy(() => BaseCommandWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BaseCommandWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BaseCommandWhereInputSchema),
          z.lazy(() => BaseCommandWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      args: z.lazy(() => JsonFilterSchema).optional(),
      commands: z.lazy(() => CommandListRelationFilterSchema).optional(),
      scripts: z.lazy(() => ScriptListRelationFilterSchema).optional(),
    })
    .strict()

export const BaseCommandOrderByWithRelationInputSchema: z.ZodType<Prisma.BaseCommandOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      args: z.lazy(() => SortOrderSchema).optional(),
      commands: z
        .lazy(() => CommandOrderByRelationAggregateInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandWhereUniqueInputSchema: z.ZodType<Prisma.BaseCommandWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => BaseCommandWhereInputSchema),
              z.lazy(() => BaseCommandWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => BaseCommandWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => BaseCommandWhereInputSchema),
              z.lazy(() => BaseCommandWhereInputSchema).array(),
            ])
            .optional(),
          args: z.lazy(() => JsonFilterSchema).optional(),
          commands: z.lazy(() => CommandListRelationFilterSchema).optional(),
          scripts: z.lazy(() => ScriptListRelationFilterSchema).optional(),
        })
        .strict()
    )

export const BaseCommandOrderByWithAggregationInputSchema: z.ZodType<Prisma.BaseCommandOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      args: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => BaseCommandCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => BaseCommandAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => BaseCommandMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => BaseCommandMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => BaseCommandSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const BaseCommandScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BaseCommandScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BaseCommandScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BaseCommandScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BaseCommandScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BaseCommandScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BaseCommandScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      args: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
    })
    .strict()

export const CommandWhereInputSchema: z.ZodType<Prisma.CommandWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommandWhereInputSchema),
        z.lazy(() => CommandWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommandWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommandWhereInputSchema),
        z.lazy(() => CommandWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    ts: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    isExecuted: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    status: z.lazy(() => JsonFilterSchema).optional(),
    params: z.lazy(() => JsonFilterSchema).optional(),
    userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    deviceId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    baseCommandId: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    device: z
      .union([
        z.lazy(() => DeviceRelationFilterSchema),
        z.lazy(() => DeviceWhereInputSchema),
      ])
      .optional(),
    baseCommand: z
      .union([
        z.lazy(() => BaseCommandRelationFilterSchema),
        z.lazy(() => BaseCommandWhereInputSchema),
      ])
      .optional(),
  })
  .strict()

export const CommandOrderByWithRelationInputSchema: z.ZodType<Prisma.CommandOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      isExecuted: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      params: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      device: z.lazy(() => DeviceOrderByWithRelationInputSchema).optional(),
      baseCommand: z
        .lazy(() => BaseCommandOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict()

export const CommandWhereUniqueInputSchema: z.ZodType<Prisma.CommandWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => CommandWhereInputSchema),
              z.lazy(() => CommandWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => CommandWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => CommandWhereInputSchema),
              z.lazy(() => CommandWhereInputSchema).array(),
            ])
            .optional(),
          ts: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          isExecuted: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          status: z.lazy(() => JsonFilterSchema).optional(),
          params: z.lazy(() => JsonFilterSchema).optional(),
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          deviceId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          baseCommandId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          device: z
            .union([
              z.lazy(() => DeviceRelationFilterSchema),
              z.lazy(() => DeviceWhereInputSchema),
            ])
            .optional(),
          baseCommand: z
            .union([
              z.lazy(() => BaseCommandRelationFilterSchema),
              z.lazy(() => BaseCommandWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    )

export const CommandOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommandOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      isExecuted: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      params: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => CommandCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => CommandAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => CommandMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => CommandMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => CommandSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const CommandScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommandScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CommandScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CommandScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CommandScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CommandScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CommandScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      ts: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      isExecuted: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      status: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      params: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      userId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      deviceId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      baseCommandId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict()

export const ScriptWhereInputSchema: z.ZodType<Prisma.ScriptWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ScriptWhereInputSchema),
        z.lazy(() => ScriptWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ScriptWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ScriptWhereInputSchema),
        z.lazy(() => ScriptWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    conditionParams: z.lazy(() => JsonFilterSchema).optional(),
    commandParams: z.lazy(() => JsonFilterSchema).optional(),
    userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    conditionDeviceId: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    commandDeviceId: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    baseCommandId: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    conditionDevice: z
      .union([
        z.lazy(() => DeviceNullableRelationFilterSchema),
        z.lazy(() => DeviceWhereInputSchema),
      ])
      .optional()
      .nullable(),
    commandDevice: z
      .union([
        z.lazy(() => DeviceRelationFilterSchema),
        z.lazy(() => DeviceWhereInputSchema),
      ])
      .optional(),
    baseCommand: z
      .union([
        z.lazy(() => BaseCommandRelationFilterSchema),
        z.lazy(() => BaseCommandWhereInputSchema),
      ])
      .optional(),
  })
  .strict()

export const ScriptOrderByWithRelationInputSchema: z.ZodType<Prisma.ScriptOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      conditionParams: z.lazy(() => SortOrderSchema).optional(),
      commandParams: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      conditionDeviceId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      commandDeviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      conditionDevice: z
        .lazy(() => DeviceOrderByWithRelationInputSchema)
        .optional(),
      commandDevice: z
        .lazy(() => DeviceOrderByWithRelationInputSchema)
        .optional(),
      baseCommand: z
        .lazy(() => BaseCommandOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict()

export const ScriptWhereUniqueInputSchema: z.ZodType<Prisma.ScriptWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ScriptWhereInputSchema),
              z.lazy(() => ScriptWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ScriptWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ScriptWhereInputSchema),
              z.lazy(() => ScriptWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          description: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          conditionParams: z.lazy(() => JsonFilterSchema).optional(),
          commandParams: z.lazy(() => JsonFilterSchema).optional(),
          userId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          conditionDeviceId: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          commandDeviceId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          baseCommandId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          conditionDevice: z
            .union([
              z.lazy(() => DeviceNullableRelationFilterSchema),
              z.lazy(() => DeviceWhereInputSchema),
            ])
            .optional()
            .nullable(),
          commandDevice: z
            .union([
              z.lazy(() => DeviceRelationFilterSchema),
              z.lazy(() => DeviceWhereInputSchema),
            ])
            .optional(),
          baseCommand: z
            .union([
              z.lazy(() => BaseCommandRelationFilterSchema),
              z.lazy(() => BaseCommandWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    )

export const ScriptOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScriptOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      conditionParams: z.lazy(() => SortOrderSchema).optional(),
      commandParams: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      conditionDeviceId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      commandDeviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ScriptCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => ScriptAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ScriptMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ScriptMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ScriptSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const ScriptScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScriptScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ScriptScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ScriptScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ScriptScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ScriptScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ScriptScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      conditionParams: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      commandParams: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      userId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      conditionDeviceId: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      baseCommandId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict()

export const DeviceDataWhereInputSchema: z.ZodType<Prisma.DeviceDataWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DeviceDataWhereInputSchema),
          z.lazy(() => DeviceDataWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DeviceDataWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DeviceDataWhereInputSchema),
          z.lazy(() => DeviceDataWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      ts: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      status: z.lazy(() => JsonFilterSchema).optional(),
      deviceId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      device: z
        .union([
          z.lazy(() => DeviceRelationFilterSchema),
          z.lazy(() => DeviceWhereInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataOrderByWithRelationInputSchema: z.ZodType<Prisma.DeviceDataOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      device: z.lazy(() => DeviceOrderByWithRelationInputSchema).optional(),
    })
    .strict()

export const DeviceDataWhereUniqueInputSchema: z.ZodType<Prisma.DeviceDataWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => DeviceDataWhereInputSchema),
              z.lazy(() => DeviceDataWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => DeviceDataWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => DeviceDataWhereInputSchema),
              z.lazy(() => DeviceDataWhereInputSchema).array(),
            ])
            .optional(),
          ts: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          status: z.lazy(() => JsonFilterSchema).optional(),
          deviceId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          device: z
            .union([
              z.lazy(() => DeviceRelationFilterSchema),
              z.lazy(() => DeviceWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    )

export const DeviceDataOrderByWithAggregationInputSchema: z.ZodType<Prisma.DeviceDataOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => DeviceDataCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => DeviceDataAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => DeviceDataMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => DeviceDataMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => DeviceDataSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const DeviceDataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DeviceDataScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DeviceDataScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DeviceDataScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DeviceDataScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DeviceDataScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DeviceDataScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      ts: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      status: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
      deviceId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict()

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    username: z.string(),
    passHash: z.string(),
    passSalt: z.string(),
    createdAt: z.number().int(),
    isActive: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
    devices: z
      .lazy(() => DeviceCreateNestedManyWithoutUserInputSchema)
      .optional(),
    areas: z.lazy(() => AreaCreateNestedManyWithoutUserInputSchema).optional(),
    commands: z
      .lazy(() => CommandCreateNestedManyWithoutUserInputSchema)
      .optional(),
    scripts: z
      .lazy(() => ScriptCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })
  .strict()

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      devices: z
        .lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    username: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    passSalt: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isActive: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    isAdmin: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    devices: z
      .lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    areas: z.lazy(() => AreaUpdateManyWithoutUserNestedInputSchema).optional(),
    commands: z
      .lazy(() => CommandUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    scripts: z
      .lazy(() => ScriptUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })
  .strict()

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
    })
    .strict()

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceCreateInputSchema: z.ZodType<Prisma.DeviceCreateInput> = z
  .object({
    name: z.string(),
    description: z.string(),
    isConnected: z.boolean().optional(),
    uuid: z.string(),
    type: z.lazy(() => DeviceTypeSchema),
    user: z.lazy(() => UserCreateNestedOneWithoutDevicesInputSchema).optional(),
    area: z.lazy(() => AreaCreateNestedOneWithoutDevicesInputSchema).optional(),
    commands: z
      .lazy(() => CommandCreateNestedManyWithoutDeviceInputSchema)
      .optional(),
    conditionScripts: z
      .lazy(() => ScriptCreateNestedManyWithoutConditionDeviceInputSchema)
      .optional(),
    commandScripts: z
      .lazy(() => ScriptCreateNestedManyWithoutCommandDeviceInputSchema)
      .optional(),
    deviceData: z
      .lazy(() => DeviceDataCreateNestedManyWithoutDeviceInputSchema)
      .optional(),
  })
  .strict()

export const DeviceUncheckedCreateInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
      areaId: z.number().int().optional().nullable(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutConditionDeviceInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutCommandDeviceInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUpdateInputSchema: z.ZodType<Prisma.DeviceUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isConnected: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    uuid: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    type: z
      .union([
        z.lazy(() => DeviceTypeSchema),
        z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z.lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema).optional(),
    area: z.lazy(() => AreaUpdateOneWithoutDevicesNestedInputSchema).optional(),
    commands: z
      .lazy(() => CommandUpdateManyWithoutDeviceNestedInputSchema)
      .optional(),
    conditionScripts: z
      .lazy(() => ScriptUpdateManyWithoutConditionDeviceNestedInputSchema)
      .optional(),
    commandScripts: z
      .lazy(() => ScriptUpdateManyWithoutCommandDeviceNestedInputSchema)
      .optional(),
    deviceData: z
      .lazy(() => DeviceDataUpdateManyWithoutDeviceNestedInputSchema)
      .optional(),
  })
  .strict()

export const DeviceUncheckedUpdateInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceCreateManyInputSchema: z.ZodType<Prisma.DeviceCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
      areaId: z.number().int().optional().nullable(),
    })
    .strict()

export const DeviceUpdateManyMutationInputSchema: z.ZodType<Prisma.DeviceUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const AreaCreateInputSchema: z.ZodType<Prisma.AreaCreateInput> = z
  .object({
    name: z.string(),
    description: z.string(),
    type: z.lazy(() => AreaTypeSchema),
    user: z.lazy(() => UserCreateNestedOneWithoutAreasInputSchema),
    devices: z
      .lazy(() => DeviceCreateNestedManyWithoutAreaInputSchema)
      .optional(),
  })
  .strict()

export const AreaUncheckedCreateInputSchema: z.ZodType<Prisma.AreaUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      type: z.lazy(() => AreaTypeSchema),
      userId: z.number().int(),
      devices: z
        .lazy(() => DeviceUncheckedCreateNestedManyWithoutAreaInputSchema)
        .optional(),
    })
    .strict()

export const AreaUpdateInputSchema: z.ZodType<Prisma.AreaUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    type: z
      .union([
        z.lazy(() => AreaTypeSchema),
        z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAreasNestedInputSchema)
      .optional(),
    devices: z
      .lazy(() => DeviceUpdateManyWithoutAreaNestedInputSchema)
      .optional(),
  })
  .strict()

export const AreaUncheckedUpdateInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUncheckedUpdateManyWithoutAreaNestedInputSchema)
        .optional(),
    })
    .strict()

export const AreaCreateManyInputSchema: z.ZodType<Prisma.AreaCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      type: z.lazy(() => AreaTypeSchema),
      userId: z.number().int(),
    })
    .strict()

export const AreaUpdateManyMutationInputSchema: z.ZodType<Prisma.AreaUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const AreaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const BaseCommandCreateInputSchema: z.ZodType<Prisma.BaseCommandCreateInput> =
  z
    .object({
      name: z.string(),
      args: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutBaseCommandInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptCreateNestedManyWithoutBaseCommandInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUncheckedCreateInputSchema: z.ZodType<Prisma.BaseCommandUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      args: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commands: z
        .lazy(
          () => CommandUncheckedCreateNestedManyWithoutBaseCommandInputSchema
        )
        .optional(),
      scripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutBaseCommandInputSchema
        )
        .optional(),
    })
    .strict()

export const BaseCommandUpdateInputSchema: z.ZodType<Prisma.BaseCommandUpdateInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutBaseCommandNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUpdateManyWithoutBaseCommandNestedInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUncheckedUpdateInputSchema: z.ZodType<Prisma.BaseCommandUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commands: z
        .lazy(
          () => CommandUncheckedUpdateManyWithoutBaseCommandNestedInputSchema
        )
        .optional(),
      scripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutBaseCommandNestedInputSchema
        )
        .optional(),
    })
    .strict()

export const BaseCommandCreateManyInputSchema: z.ZodType<Prisma.BaseCommandCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      args: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict()

export const BaseCommandUpdateManyMutationInputSchema: z.ZodType<Prisma.BaseCommandUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const BaseCommandUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BaseCommandUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const CommandCreateInputSchema: z.ZodType<Prisma.CommandCreateInput> = z
  .object({
    ts: z.number().int(),
    isExecuted: z.boolean().optional(),
    status: z.union([
      z.lazy(() => JsonNullValueInputSchema),
      InputJsonValueSchema,
    ]),
    params: z.union([
      z.lazy(() => JsonNullValueInputSchema),
      InputJsonValueSchema,
    ]),
    user: z.lazy(() => UserCreateNestedOneWithoutCommandsInputSchema),
    device: z.lazy(() => DeviceCreateNestedOneWithoutCommandsInputSchema),
    baseCommand: z.lazy(
      () => BaseCommandCreateNestedOneWithoutCommandsInputSchema
    ),
  })
  .strict()

export const CommandUncheckedCreateInputSchema: z.ZodType<Prisma.CommandUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      deviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const CommandUpdateInputSchema: z.ZodType<Prisma.CommandUpdateInput> = z
  .object({
    ts: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    isExecuted: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    status: z
      .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
      .optional(),
    params: z
      .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutCommandsNestedInputSchema)
      .optional(),
    device: z
      .lazy(() => DeviceUpdateOneRequiredWithoutCommandsNestedInputSchema)
      .optional(),
    baseCommand: z
      .lazy(() => BaseCommandUpdateOneRequiredWithoutCommandsNestedInputSchema)
      .optional(),
  })
  .strict()

export const CommandUncheckedUpdateInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandCreateManyInputSchema: z.ZodType<Prisma.CommandCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      deviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const CommandUpdateManyMutationInputSchema: z.ZodType<Prisma.CommandUpdateManyMutationInput> =
  z
    .object({
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptCreateInputSchema: z.ZodType<Prisma.ScriptCreateInput> = z
  .object({
    name: z.string(),
    description: z.string(),
    conditionParams: z.union([
      z.lazy(() => JsonNullValueInputSchema),
      InputJsonValueSchema,
    ]),
    commandParams: z.union([
      z.lazy(() => JsonNullValueInputSchema),
      InputJsonValueSchema,
    ]),
    user: z.lazy(() => UserCreateNestedOneWithoutScriptsInputSchema),
    conditionDevice: z
      .lazy(() => DeviceCreateNestedOneWithoutConditionScriptsInputSchema)
      .optional(),
    commandDevice: z.lazy(
      () => DeviceCreateNestedOneWithoutCommandScriptsInputSchema
    ),
    baseCommand: z.lazy(
      () => BaseCommandCreateNestedOneWithoutScriptsInputSchema
    ),
  })
  .strict()

export const ScriptUncheckedCreateInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      conditionDeviceId: z.number().int().optional().nullable(),
      commandDeviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptUpdateInputSchema: z.ZodType<Prisma.ScriptUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    conditionParams: z
      .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
      .optional(),
    commandParams: z
      .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutScriptsNestedInputSchema)
      .optional(),
    conditionDevice: z
      .lazy(() => DeviceUpdateOneWithoutConditionScriptsNestedInputSchema)
      .optional(),
    commandDevice: z
      .lazy(() => DeviceUpdateOneRequiredWithoutCommandScriptsNestedInputSchema)
      .optional(),
    baseCommand: z
      .lazy(() => BaseCommandUpdateOneRequiredWithoutScriptsNestedInputSchema)
      .optional(),
  })
  .strict()

export const ScriptUncheckedUpdateInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptCreateManyInputSchema: z.ZodType<Prisma.ScriptCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      conditionDeviceId: z.number().int().optional().nullable(),
      commandDeviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptUpdateManyMutationInputSchema: z.ZodType<Prisma.ScriptUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataCreateInputSchema: z.ZodType<Prisma.DeviceDataCreateInput> =
  z
    .object({
      ts: z.number().int(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      device: z.lazy(() => DeviceCreateNestedOneWithoutDeviceDataInputSchema),
    })
    .strict()

export const DeviceDataUncheckedCreateInputSchema: z.ZodType<Prisma.DeviceDataUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      deviceId: z.number().int(),
    })
    .strict()

export const DeviceDataUpdateInputSchema: z.ZodType<Prisma.DeviceDataUpdateInput> =
  z
    .object({
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      device: z
        .lazy(() => DeviceUpdateOneRequiredWithoutDeviceDataNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceDataUncheckedUpdateInputSchema: z.ZodType<Prisma.DeviceDataUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataCreateManyInputSchema: z.ZodType<Prisma.DeviceDataCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      deviceId: z.number().int(),
    })
    .strict()

export const DeviceDataUpdateManyMutationInputSchema: z.ZodType<Prisma.DeviceDataUpdateManyMutationInput> =
  z
    .object({
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const DeviceDataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DeviceDataUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict()

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict()

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict()

export const DeviceListRelationFilterSchema: z.ZodType<Prisma.DeviceListRelationFilter> =
  z
    .object({
      every: z.lazy(() => DeviceWhereInputSchema).optional(),
      some: z.lazy(() => DeviceWhereInputSchema).optional(),
      none: z.lazy(() => DeviceWhereInputSchema).optional(),
    })
    .strict()

export const AreaListRelationFilterSchema: z.ZodType<Prisma.AreaListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AreaWhereInputSchema).optional(),
      some: z.lazy(() => AreaWhereInputSchema).optional(),
      none: z.lazy(() => AreaWhereInputSchema).optional(),
    })
    .strict()

export const CommandListRelationFilterSchema: z.ZodType<Prisma.CommandListRelationFilter> =
  z
    .object({
      every: z.lazy(() => CommandWhereInputSchema).optional(),
      some: z.lazy(() => CommandWhereInputSchema).optional(),
      none: z.lazy(() => CommandWhereInputSchema).optional(),
    })
    .strict()

export const ScriptListRelationFilterSchema: z.ZodType<Prisma.ScriptListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ScriptWhereInputSchema).optional(),
      some: z.lazy(() => ScriptWhereInputSchema).optional(),
      none: z.lazy(() => ScriptWhereInputSchema).optional(),
    })
    .strict()

export const DeviceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DeviceOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AreaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AreaOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const CommandOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommandOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ScriptOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ScriptOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      passHash: z.lazy(() => SortOrderSchema).optional(),
      passSalt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      passHash: z.lazy(() => SortOrderSchema).optional(),
      passSalt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      passHash: z.lazy(() => SortOrderSchema).optional(),
      passSalt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      isActive: z.lazy(() => SortOrderSchema).optional(),
      isAdmin: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict()

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict()

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict()

export const EnumDeviceTypeFilterSchema: z.ZodType<Prisma.EnumDeviceTypeFilter> =
  z
    .object({
      equals: z.lazy(() => DeviceTypeSchema).optional(),
      in: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => NestedEnumDeviceTypeFilterSchema),
        ])
        .optional(),
    })
    .strict()

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => UserWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => UserWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict()

export const AreaNullableRelationFilterSchema: z.ZodType<Prisma.AreaNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => AreaWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => AreaWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict()

export const DeviceDataListRelationFilterSchema: z.ZodType<Prisma.DeviceDataListRelationFilter> =
  z
    .object({
      every: z.lazy(() => DeviceDataWhereInputSchema).optional(),
      some: z.lazy(() => DeviceDataWhereInputSchema).optional(),
      none: z.lazy(() => DeviceDataWhereInputSchema).optional(),
    })
    .strict()

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict()

export const DeviceDataOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DeviceDataOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceCountOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      isConnected: z.lazy(() => SortOrderSchema).optional(),
      uuid: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      areaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      areaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      isConnected: z.lazy(() => SortOrderSchema).optional(),
      uuid: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      areaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceMinOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      isConnected: z.lazy(() => SortOrderSchema).optional(),
      uuid: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      areaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceSumOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      areaId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const EnumDeviceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDeviceTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => DeviceTypeSchema).optional(),
      in: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => NestedEnumDeviceTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional(),
    })
    .strict()

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict()

export const EnumAreaTypeFilterSchema: z.ZodType<Prisma.EnumAreaTypeFilter> = z
  .object({
    equals: z.lazy(() => AreaTypeSchema).optional(),
    in: z
      .lazy(() => AreaTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => AreaTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => AreaTypeSchema),
        z.lazy(() => NestedEnumAreaTypeFilterSchema),
      ])
      .optional(),
  })
  .strict()

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict()

export const AreaCountOrderByAggregateInputSchema: z.ZodType<Prisma.AreaCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AreaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AreaAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AreaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AreaMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AreaMinOrderByAggregateInputSchema: z.ZodType<Prisma.AreaMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AreaSumOrderByAggregateInputSchema: z.ZodType<Prisma.AreaSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const EnumAreaTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAreaTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => AreaTypeSchema).optional(),
      in: z
        .lazy(() => AreaTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => AreaTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => NestedEnumAreaTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional(),
    })
    .strict()

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().array().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict()

export const BaseCommandCountOrderByAggregateInputSchema: z.ZodType<Prisma.BaseCommandCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      args: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const BaseCommandAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BaseCommandAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const BaseCommandMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BaseCommandMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const BaseCommandMinOrderByAggregateInputSchema: z.ZodType<Prisma.BaseCommandMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const BaseCommandSumOrderByAggregateInputSchema: z.ZodType<Prisma.BaseCommandSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> =
  z
    .object({
      equals: InputJsonValueSchema.optional(),
      path: z.string().array().optional(),
      string_contains: z.string().optional(),
      string_starts_with: z.string().optional(),
      string_ends_with: z.string().optional(),
      array_contains: InputJsonValueSchema.optional().nullable(),
      array_starts_with: InputJsonValueSchema.optional().nullable(),
      array_ends_with: InputJsonValueSchema.optional().nullable(),
      lt: InputJsonValueSchema.optional(),
      lte: InputJsonValueSchema.optional(),
      gt: InputJsonValueSchema.optional(),
      gte: InputJsonValueSchema.optional(),
      not: InputJsonValueSchema.optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedJsonFilterSchema).optional(),
      _max: z.lazy(() => NestedJsonFilterSchema).optional(),
    })
    .strict()

export const DeviceRelationFilterSchema: z.ZodType<Prisma.DeviceRelationFilter> =
  z
    .object({
      is: z.lazy(() => DeviceWhereInputSchema).optional(),
      isNot: z.lazy(() => DeviceWhereInputSchema).optional(),
    })
    .strict()

export const BaseCommandRelationFilterSchema: z.ZodType<Prisma.BaseCommandRelationFilter> =
  z
    .object({
      is: z.lazy(() => BaseCommandWhereInputSchema).optional(),
      isNot: z.lazy(() => BaseCommandWhereInputSchema).optional(),
    })
    .strict()

export const CommandCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommandCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      isExecuted: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      params: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const CommandAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CommandAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const CommandMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommandMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      isExecuted: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const CommandMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommandMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      isExecuted: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const CommandSumOrderByAggregateInputSchema: z.ZodType<Prisma.CommandSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceNullableRelationFilterSchema: z.ZodType<Prisma.DeviceNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => DeviceWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => DeviceWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict()

export const ScriptCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScriptCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      conditionParams: z.lazy(() => SortOrderSchema).optional(),
      commandParams: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      conditionDeviceId: z.lazy(() => SortOrderSchema).optional(),
      commandDeviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ScriptAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ScriptAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      conditionDeviceId: z.lazy(() => SortOrderSchema).optional(),
      commandDeviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ScriptMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScriptMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      conditionDeviceId: z.lazy(() => SortOrderSchema).optional(),
      commandDeviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ScriptMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScriptMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      conditionDeviceId: z.lazy(() => SortOrderSchema).optional(),
      commandDeviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const ScriptSumOrderByAggregateInputSchema: z.ZodType<Prisma.ScriptSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      conditionDeviceId: z.lazy(() => SortOrderSchema).optional(),
      commandDeviceId: z.lazy(() => SortOrderSchema).optional(),
      baseCommandId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceDataCountOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceDataCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceDataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceDataAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceDataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceDataMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceDataMinOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceDataMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceDataSumOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceDataSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ts: z.lazy(() => SortOrderSchema).optional(),
      deviceId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const DeviceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutUserInputSchema),
          z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const AreaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AreaCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AreaCreateWithoutUserInputSchema),
          z.lazy(() => AreaCreateWithoutUserInputSchema).array(),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AreaCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommandCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutUserInputSchema),
          z.lazy(() => CommandCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ScriptCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutUserInputSchema),
          z.lazy(() => ScriptCreateWithoutUserInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutUserInputSchema),
          z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const AreaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AreaCreateWithoutUserInputSchema),
          z.lazy(() => AreaCreateWithoutUserInputSchema).array(),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AreaCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommandUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutUserInputSchema),
          z.lazy(() => CommandCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutUserInputSchema),
          z.lazy(() => ScriptCreateWithoutUserInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict()

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict()

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict()

export const DeviceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutUserInputSchema),
          z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DeviceScalarWhereInputSchema),
          z.lazy(() => DeviceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const AreaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AreaUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AreaCreateWithoutUserInputSchema),
          z.lazy(() => AreaCreateWithoutUserInputSchema).array(),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AreaCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AreaScalarWhereInputSchema),
          z.lazy(() => AreaScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommandUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutUserInputSchema),
          z.lazy(() => CommandCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommandUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommandUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommandUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommandUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommandUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => CommandUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutUserInputSchema),
          z.lazy(() => ScriptCreateWithoutUserInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ScriptUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ScriptUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ScriptUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ScriptUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ScriptUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => ScriptUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutUserInputSchema),
          z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DeviceScalarWhereInputSchema),
          z.lazy(() => DeviceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const AreaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AreaCreateWithoutUserInputSchema),
          z.lazy(() => AreaCreateWithoutUserInputSchema).array(),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AreaCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AreaWhereUniqueInputSchema),
          z.lazy(() => AreaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AreaScalarWhereInputSchema),
          z.lazy(() => AreaScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutUserInputSchema),
          z.lazy(() => CommandCreateWithoutUserInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommandUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommandUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommandUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => CommandUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommandUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => CommandUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutUserInputSchema),
          z.lazy(() => ScriptCreateWithoutUserInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => ScriptCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ScriptUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ScriptUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ScriptUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => ScriptUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ScriptUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => ScriptUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDevicesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDevicesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutDevicesInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict()

export const AreaCreateNestedOneWithoutDevicesInputSchema: z.ZodType<Prisma.AreaCreateNestedOneWithoutDevicesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AreaCreateWithoutDevicesInputSchema),
          z.lazy(() => AreaUncheckedCreateWithoutDevicesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => AreaCreateOrConnectWithoutDevicesInputSchema)
        .optional(),
      connect: z.lazy(() => AreaWhereUniqueInputSchema).optional(),
    })
    .strict()

export const CommandCreateNestedManyWithoutDeviceInputSchema: z.ZodType<Prisma.CommandCreateNestedManyWithoutDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptCreateNestedManyWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptCreateNestedManyWithoutConditionDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyConditionDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptCreateNestedManyWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptCreateNestedManyWithoutCommandDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyCommandDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataCreateNestedManyWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataCreateNestedManyWithoutDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema),
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceDataCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedCreateNestedManyWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUncheckedCreateNestedManyWithoutDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedCreateNestedManyWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateNestedManyWithoutConditionDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyConditionDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedCreateNestedManyWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateNestedManyWithoutCommandDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyCommandDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataUncheckedCreateNestedManyWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUncheckedCreateNestedManyWithoutDeviceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema),
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceDataCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const EnumDeviceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDeviceTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => DeviceTypeSchema).optional(),
    })
    .strict()

export const UserUpdateOneWithoutDevicesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutDevicesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutDevicesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutDevicesInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutDevicesInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutDevicesInputSchema),
          z.lazy(() => UserUpdateWithoutDevicesInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema),
        ])
        .optional(),
    })
    .strict()

export const AreaUpdateOneWithoutDevicesNestedInputSchema: z.ZodType<Prisma.AreaUpdateOneWithoutDevicesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AreaCreateWithoutDevicesInputSchema),
          z.lazy(() => AreaUncheckedCreateWithoutDevicesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => AreaCreateOrConnectWithoutDevicesInputSchema)
        .optional(),
      upsert: z.lazy(() => AreaUpsertWithoutDevicesInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => AreaWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => AreaWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => AreaWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => AreaUpdateToOneWithWhereWithoutDevicesInputSchema),
          z.lazy(() => AreaUpdateWithoutDevicesInputSchema),
          z.lazy(() => AreaUncheckedUpdateWithoutDevicesInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandUpdateManyWithoutDeviceNestedInputSchema: z.ZodType<Prisma.CommandUpdateManyWithoutDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommandUpsertWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => CommandUpsertWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommandUpdateWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => CommandUpdateWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommandUpdateManyWithWhereWithoutDeviceInputSchema),
          z
            .lazy(() => CommandUpdateManyWithWhereWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateManyWithoutConditionDeviceNestedInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithoutConditionDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ScriptUpsertWithWhereUniqueWithoutConditionDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpsertWithWhereUniqueWithoutConditionDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyConditionDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ScriptUpdateWithWhereUniqueWithoutConditionDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateWithWhereUniqueWithoutConditionDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ScriptUpdateManyWithWhereWithoutConditionDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateManyWithWhereWithoutConditionDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateManyWithoutCommandDeviceNestedInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithoutCommandDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ScriptUpsertWithWhereUniqueWithoutCommandDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpsertWithWhereUniqueWithoutCommandDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyCommandDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ScriptUpdateWithWhereUniqueWithoutCommandDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateWithWhereUniqueWithoutCommandDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ScriptUpdateManyWithWhereWithoutCommandDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateManyWithWhereWithoutCommandDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataUpdateManyWithoutDeviceNestedInputSchema: z.ZodType<Prisma.DeviceDataUpdateManyWithoutDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema),
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DeviceDataUpsertWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUpsertWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceDataCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DeviceDataUpdateWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUpdateWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DeviceDataUpdateManyWithWhereWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUpdateManyWithWhereWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DeviceDataScalarWhereInputSchema),
          z.lazy(() => DeviceDataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict()

export const CommandUncheckedUpdateManyWithoutDeviceNestedInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateManyWithoutDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema),
          z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema),
          z.lazy(() => CommandCreateOrConnectWithoutDeviceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommandUpsertWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => CommandUpsertWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommandUpdateWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => CommandUpdateWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommandUpdateManyWithWhereWithoutDeviceInputSchema),
          z
            .lazy(() => CommandUpdateManyWithWhereWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutConditionDeviceInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ScriptUpsertWithWhereUniqueWithoutConditionDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpsertWithWhereUniqueWithoutConditionDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyConditionDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ScriptUpdateWithWhereUniqueWithoutConditionDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateWithWhereUniqueWithoutConditionDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ScriptUpdateManyWithWhereWithoutConditionDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateManyWithWhereWithoutConditionDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema),
          z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutCommandDeviceInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ScriptUpsertWithWhereUniqueWithoutCommandDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpsertWithWhereUniqueWithoutCommandDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyCommandDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ScriptUpdateWithWhereUniqueWithoutCommandDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateWithWhereUniqueWithoutCommandDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ScriptUpdateManyWithWhereWithoutCommandDeviceInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateManyWithWhereWithoutCommandDeviceInputSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataUncheckedUpdateManyWithoutDeviceNestedInputSchema: z.ZodType<Prisma.DeviceDataUncheckedUpdateManyWithoutDeviceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema),
          z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema).array(),
          z.lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataCreateOrConnectWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DeviceDataUpsertWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUpsertWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceDataCreateManyDeviceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceDataWhereUniqueInputSchema),
          z.lazy(() => DeviceDataWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DeviceDataUpdateWithWhereUniqueWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUpdateWithWhereUniqueWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DeviceDataUpdateManyWithWhereWithoutDeviceInputSchema),
          z
            .lazy(() => DeviceDataUpdateManyWithWhereWithoutDeviceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DeviceDataScalarWhereInputSchema),
          z.lazy(() => DeviceDataScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutAreasInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAreasInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAreasInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAreasInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict()

export const DeviceCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.DeviceCreateNestedManyWithoutAreaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyAreaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateNestedManyWithoutAreaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyAreaInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const EnumAreaTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAreaTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => AreaTypeSchema).optional(),
    })
    .strict()

export const UserUpdateOneRequiredWithoutAreasNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAreasNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAreasInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAreasInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutAreasInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutAreasInputSchema),
          z.lazy(() => UserUpdateWithoutAreasInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAreasInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithoutAreaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema),
          z
            .lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyAreaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema),
          z
            .lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema),
          z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DeviceScalarWhereInputSchema),
          z.lazy(() => DeviceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutAreaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),
          z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema),
          z
            .lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DeviceCreateManyAreaInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DeviceWhereUniqueInputSchema),
          z.lazy(() => DeviceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema),
          z
            .lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema),
          z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DeviceScalarWhereInputSchema),
          z.lazy(() => DeviceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandCreateNestedManyWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandCreateNestedManyWithoutBaseCommandInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema),
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptCreateNestedManyWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptCreateNestedManyWithoutBaseCommandInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema),
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedCreateNestedManyWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUncheckedCreateNestedManyWithoutBaseCommandInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema),
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedCreateNestedManyWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateNestedManyWithoutBaseCommandInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema),
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandUpdateManyWithoutBaseCommandNestedInputSchema: z.ZodType<Prisma.CommandUpdateManyWithoutBaseCommandNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema),
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => CommandUpsertWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => CommandUpsertWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => CommandUpdateWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => CommandUpdateWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommandUpdateManyWithWhereWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandUpdateManyWithWhereWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateManyWithoutBaseCommandNestedInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithoutBaseCommandNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema),
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ScriptUpsertWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => ScriptUpsertWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ScriptUpdateWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ScriptUpdateManyWithWhereWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptUpdateManyWithWhereWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateManyWithoutBaseCommandNestedInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateManyWithoutBaseCommandNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema),
          z.lazy(() => CommandCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => CommandUpsertWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => CommandUpsertWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommandCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommandWhereUniqueInputSchema),
          z.lazy(() => CommandWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => CommandUpdateWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => CommandUpdateWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommandUpdateManyWithWhereWithoutBaseCommandInputSchema),
          z
            .lazy(() => CommandUpdateManyWithWhereWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutBaseCommandNestedInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutBaseCommandNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema),
          z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema).array(),
          z.lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptCreateOrConnectWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ScriptUpsertWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => ScriptUpsertWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ScriptCreateManyBaseCommandInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ScriptWhereUniqueInputSchema),
          z.lazy(() => ScriptWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ScriptUpdateWithWhereUniqueWithoutBaseCommandInputSchema
          ),
          z
            .lazy(
              () => ScriptUpdateWithWhereUniqueWithoutBaseCommandInputSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ScriptUpdateManyWithWhereWithoutBaseCommandInputSchema),
          z
            .lazy(() => ScriptUpdateManyWithWhereWithoutBaseCommandInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutCommandsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommandsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutCommandsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutCommandsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutCommandsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict()

export const DeviceCreateNestedOneWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceCreateNestedOneWithoutCommandsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutCommandsInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutCommandsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutCommandsInputSchema)
        .optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
    })
    .strict()

export const BaseCommandCreateNestedOneWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandCreateNestedOneWithoutCommandsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BaseCommandCreateWithoutCommandsInputSchema),
          z.lazy(() => BaseCommandUncheckedCreateWithoutCommandsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BaseCommandCreateOrConnectWithoutCommandsInputSchema)
        .optional(),
      connect: z.lazy(() => BaseCommandWhereUniqueInputSchema).optional(),
    })
    .strict()

export const UserUpdateOneRequiredWithoutCommandsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommandsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutCommandsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutCommandsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutCommandsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutCommandsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutCommandsInputSchema),
          z.lazy(() => UserUpdateWithoutCommandsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutCommandsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceUpdateOneRequiredWithoutCommandsNestedInputSchema: z.ZodType<Prisma.DeviceUpdateOneRequiredWithoutCommandsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutCommandsInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutCommandsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutCommandsInputSchema)
        .optional(),
      upsert: z.lazy(() => DeviceUpsertWithoutCommandsInputSchema).optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => DeviceUpdateToOneWithWhereWithoutCommandsInputSchema),
          z.lazy(() => DeviceUpdateWithoutCommandsInputSchema),
          z.lazy(() => DeviceUncheckedUpdateWithoutCommandsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const BaseCommandUpdateOneRequiredWithoutCommandsNestedInputSchema: z.ZodType<Prisma.BaseCommandUpdateOneRequiredWithoutCommandsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BaseCommandCreateWithoutCommandsInputSchema),
          z.lazy(() => BaseCommandUncheckedCreateWithoutCommandsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BaseCommandCreateOrConnectWithoutCommandsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => BaseCommandUpsertWithoutCommandsInputSchema)
        .optional(),
      connect: z.lazy(() => BaseCommandWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => BaseCommandUpdateToOneWithWhereWithoutCommandsInputSchema
          ),
          z.lazy(() => BaseCommandUpdateWithoutCommandsInputSchema),
          z.lazy(() => BaseCommandUncheckedUpdateWithoutCommandsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutScriptsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutScriptsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutScriptsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutScriptsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict()

export const DeviceCreateNestedOneWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceCreateNestedOneWithoutConditionScriptsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutConditionScriptsInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutConditionScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutConditionScriptsInputSchema)
        .optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
    })
    .strict()

export const DeviceCreateNestedOneWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceCreateNestedOneWithoutCommandScriptsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutCommandScriptsInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutCommandScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutCommandScriptsInputSchema)
        .optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
    })
    .strict()

export const BaseCommandCreateNestedOneWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandCreateNestedOneWithoutScriptsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BaseCommandCreateWithoutScriptsInputSchema),
          z.lazy(() => BaseCommandUncheckedCreateWithoutScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BaseCommandCreateOrConnectWithoutScriptsInputSchema)
        .optional(),
      connect: z.lazy(() => BaseCommandWhereUniqueInputSchema).optional(),
    })
    .strict()

export const UserUpdateOneRequiredWithoutScriptsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutScriptsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutScriptsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutScriptsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutScriptsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutScriptsInputSchema),
          z.lazy(() => UserUpdateWithoutScriptsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutScriptsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceUpdateOneWithoutConditionScriptsNestedInputSchema: z.ZodType<Prisma.DeviceUpdateOneWithoutConditionScriptsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutConditionScriptsInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutConditionScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutConditionScriptsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => DeviceUpsertWithoutConditionScriptsInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => DeviceWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => DeviceWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => DeviceUpdateToOneWithWhereWithoutConditionScriptsInputSchema
          ),
          z.lazy(() => DeviceUpdateWithoutConditionScriptsInputSchema),
          z.lazy(() => DeviceUncheckedUpdateWithoutConditionScriptsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceUpdateOneRequiredWithoutCommandScriptsNestedInputSchema: z.ZodType<Prisma.DeviceUpdateOneRequiredWithoutCommandScriptsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutCommandScriptsInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutCommandScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutCommandScriptsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => DeviceUpsertWithoutCommandScriptsInputSchema)
        .optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => DeviceUpdateToOneWithWhereWithoutCommandScriptsInputSchema
          ),
          z.lazy(() => DeviceUpdateWithoutCommandScriptsInputSchema),
          z.lazy(() => DeviceUncheckedUpdateWithoutCommandScriptsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const BaseCommandUpdateOneRequiredWithoutScriptsNestedInputSchema: z.ZodType<Prisma.BaseCommandUpdateOneRequiredWithoutScriptsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => BaseCommandCreateWithoutScriptsInputSchema),
          z.lazy(() => BaseCommandUncheckedCreateWithoutScriptsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => BaseCommandCreateOrConnectWithoutScriptsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => BaseCommandUpsertWithoutScriptsInputSchema)
        .optional(),
      connect: z.lazy(() => BaseCommandWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => BaseCommandUpdateToOneWithWhereWithoutScriptsInputSchema
          ),
          z.lazy(() => BaseCommandUpdateWithoutScriptsInputSchema),
          z.lazy(() => BaseCommandUncheckedUpdateWithoutScriptsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceCreateNestedOneWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceCreateNestedOneWithoutDeviceDataInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutDeviceDataInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutDeviceDataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutDeviceDataInputSchema)
        .optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
    })
    .strict()

export const DeviceUpdateOneRequiredWithoutDeviceDataNestedInputSchema: z.ZodType<Prisma.DeviceUpdateOneRequiredWithoutDeviceDataNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DeviceCreateWithoutDeviceDataInputSchema),
          z.lazy(() => DeviceUncheckedCreateWithoutDeviceDataInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DeviceCreateOrConnectWithoutDeviceDataInputSchema)
        .optional(),
      upsert: z.lazy(() => DeviceUpsertWithoutDeviceDataInputSchema).optional(),
      connect: z.lazy(() => DeviceWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => DeviceUpdateToOneWithWhereWithoutDeviceDataInputSchema),
          z.lazy(() => DeviceUpdateWithoutDeviceDataInputSchema),
          z.lazy(() => DeviceUncheckedUpdateWithoutDeviceDataInputSchema),
        ])
        .optional(),
    })
    .strict()

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict()

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict()

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict()

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict()

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict()

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict()

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict()

export const NestedEnumDeviceTypeFilterSchema: z.ZodType<Prisma.NestedEnumDeviceTypeFilter> =
  z
    .object({
      equals: z.lazy(() => DeviceTypeSchema).optional(),
      in: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => NestedEnumDeviceTypeFilterSchema),
        ])
        .optional(),
    })
    .strict()

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const NestedEnumDeviceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDeviceTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => DeviceTypeSchema).optional(),
      in: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => DeviceTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => NestedEnumDeviceTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional(),
    })
    .strict()

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict()

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const NestedEnumAreaTypeFilterSchema: z.ZodType<Prisma.NestedEnumAreaTypeFilter> =
  z
    .object({
      equals: z.lazy(() => AreaTypeSchema).optional(),
      in: z
        .lazy(() => AreaTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => AreaTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => NestedEnumAreaTypeFilterSchema),
        ])
        .optional(),
    })
    .strict()

export const NestedEnumAreaTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAreaTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => AreaTypeSchema).optional(),
      in: z
        .lazy(() => AreaTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => AreaTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => NestedEnumAreaTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional(),
    })
    .strict()

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z
  .object({
    equals: InputJsonValueSchema.optional(),
    path: z.string().array().optional(),
    string_contains: z.string().optional(),
    string_starts_with: z.string().optional(),
    string_ends_with: z.string().optional(),
    array_contains: InputJsonValueSchema.optional().nullable(),
    array_starts_with: InputJsonValueSchema.optional().nullable(),
    array_ends_with: InputJsonValueSchema.optional().nullable(),
    lt: InputJsonValueSchema.optional(),
    lte: InputJsonValueSchema.optional(),
    gt: InputJsonValueSchema.optional(),
    gte: InputJsonValueSchema.optional(),
    not: InputJsonValueSchema.optional(),
  })
  .strict()

export const DeviceCreateWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateWithoutUserInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      area: z
        .lazy(() => AreaCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutConditionDeviceInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutCommandDeviceInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      areaId: z.number().int().optional().nullable(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutConditionDeviceInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutCommandDeviceInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutUserInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const DeviceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.DeviceCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => DeviceCreateManyUserInputSchema),
        z.lazy(() => DeviceCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const AreaCreateWithoutUserInputSchema: z.ZodType<Prisma.AreaCreateWithoutUserInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      type: z.lazy(() => AreaTypeSchema),
      devices: z
        .lazy(() => DeviceCreateNestedManyWithoutAreaInputSchema)
        .optional(),
    })
    .strict()

export const AreaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      type: z.lazy(() => AreaTypeSchema),
      devices: z
        .lazy(() => DeviceUncheckedCreateNestedManyWithoutAreaInputSchema)
        .optional(),
    })
    .strict()

export const AreaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AreaCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AreaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AreaCreateWithoutUserInputSchema),
        z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const AreaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AreaCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => AreaCreateManyUserInputSchema),
        z.lazy(() => AreaCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const CommandCreateWithoutUserInputSchema: z.ZodType<Prisma.CommandCreateWithoutUserInput> =
  z
    .object({
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      device: z.lazy(() => DeviceCreateNestedOneWithoutCommandsInputSchema),
      baseCommand: z.lazy(
        () => BaseCommandCreateNestedOneWithoutCommandsInputSchema
      ),
    })
    .strict()

export const CommandUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommandUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      deviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const CommandCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommandCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommandCreateWithoutUserInputSchema),
        z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const CommandCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommandCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => CommandCreateManyUserInputSchema),
        z.lazy(() => CommandCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ScriptCreateWithoutUserInputSchema: z.ZodType<Prisma.ScriptCreateWithoutUserInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      conditionDevice: z
        .lazy(() => DeviceCreateNestedOneWithoutConditionScriptsInputSchema)
        .optional(),
      commandDevice: z.lazy(
        () => DeviceCreateNestedOneWithoutCommandScriptsInputSchema
      ),
      baseCommand: z.lazy(
        () => BaseCommandCreateNestedOneWithoutScriptsInputSchema
      ),
    })
    .strict()

export const ScriptUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      conditionDeviceId: z.number().int().optional().nullable(),
      commandDeviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ScriptCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutUserInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const ScriptCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ScriptCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ScriptCreateManyUserInputSchema),
        z.lazy(() => ScriptCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const DeviceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => DeviceUpdateWithoutUserInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutUserInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => DeviceUpdateWithoutUserInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => DeviceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => DeviceUpdateManyMutationInputSchema),
        z.lazy(() => DeviceUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict()

export const DeviceScalarWhereInputSchema: z.ZodType<Prisma.DeviceScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DeviceScalarWhereInputSchema),
          z.lazy(() => DeviceScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DeviceScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DeviceScalarWhereInputSchema),
          z.lazy(() => DeviceScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      isConnected: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      uuid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      type: z
        .union([
          z.lazy(() => EnumDeviceTypeFilterSchema),
          z.lazy(() => DeviceTypeSchema),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      areaId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict()

export const AreaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AreaUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AreaWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AreaUpdateWithoutUserInputSchema),
        z.lazy(() => AreaUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AreaCreateWithoutUserInputSchema),
        z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const AreaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AreaUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AreaWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AreaUpdateWithoutUserInputSchema),
        z.lazy(() => AreaUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const AreaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AreaUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AreaScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AreaUpdateManyMutationInputSchema),
        z.lazy(() => AreaUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict()

export const AreaScalarWhereInputSchema: z.ZodType<Prisma.AreaScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AreaScalarWhereInputSchema),
          z.lazy(() => AreaScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AreaScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AreaScalarWhereInputSchema),
          z.lazy(() => AreaScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      type: z
        .union([
          z.lazy(() => EnumAreaTypeFilterSchema),
          z.lazy(() => AreaTypeSchema),
        ])
        .optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict()

export const CommandUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommandUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => CommandUpdateWithoutUserInputSchema),
        z.lazy(() => CommandUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommandCreateWithoutUserInputSchema),
        z.lazy(() => CommandUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const CommandUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommandUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => CommandUpdateWithoutUserInputSchema),
        z.lazy(() => CommandUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const CommandUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommandUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => CommandScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => CommandUpdateManyMutationInputSchema),
        z.lazy(() => CommandUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict()

export const CommandScalarWhereInputSchema: z.ZodType<Prisma.CommandScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CommandScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CommandScalarWhereInputSchema),
          z.lazy(() => CommandScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      ts: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      isExecuted: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      status: z.lazy(() => JsonFilterSchema).optional(),
      params: z.lazy(() => JsonFilterSchema).optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      deviceId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      baseCommandId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
    })
    .strict()

export const ScriptUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ScriptUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ScriptUpdateWithoutUserInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutUserInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ScriptUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateWithoutUserInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => ScriptScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateManyMutationInputSchema),
        z.lazy(() => ScriptUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict()

export const ScriptScalarWhereInputSchema: z.ZodType<Prisma.ScriptScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ScriptScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ScriptScalarWhereInputSchema),
          z.lazy(() => ScriptScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      conditionParams: z.lazy(() => JsonFilterSchema).optional(),
      commandParams: z.lazy(() => JsonFilterSchema).optional(),
      userId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      conditionDeviceId: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      baseCommandId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
    })
    .strict()

export const UserCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateWithoutDevicesInput> =
  z
    .object({
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      areas: z
        .lazy(() => AreaCreateNestedManyWithoutUserInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutUserInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDevicesInput> =
  z
    .object({
      id: z.number().int().optional(),
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      areas: z
        .lazy(() => AreaUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserCreateOrConnectWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDevicesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutDevicesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),
      ]),
    })
    .strict()

export const AreaCreateWithoutDevicesInputSchema: z.ZodType<Prisma.AreaCreateWithoutDevicesInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      type: z.lazy(() => AreaTypeSchema),
      user: z.lazy(() => UserCreateNestedOneWithoutAreasInputSchema),
    })
    .strict()

export const AreaUncheckedCreateWithoutDevicesInputSchema: z.ZodType<Prisma.AreaUncheckedCreateWithoutDevicesInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      type: z.lazy(() => AreaTypeSchema),
      userId: z.number().int(),
    })
    .strict()

export const AreaCreateOrConnectWithoutDevicesInputSchema: z.ZodType<Prisma.AreaCreateOrConnectWithoutDevicesInput> =
  z
    .object({
      where: z.lazy(() => AreaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AreaCreateWithoutDevicesInputSchema),
        z.lazy(() => AreaUncheckedCreateWithoutDevicesInputSchema),
      ]),
    })
    .strict()

export const CommandCreateWithoutDeviceInputSchema: z.ZodType<Prisma.CommandCreateWithoutDeviceInput> =
  z
    .object({
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      user: z.lazy(() => UserCreateNestedOneWithoutCommandsInputSchema),
      baseCommand: z.lazy(
        () => BaseCommandCreateNestedOneWithoutCommandsInputSchema
      ),
    })
    .strict()

export const CommandUncheckedCreateWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUncheckedCreateWithoutDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const CommandCreateOrConnectWithoutDeviceInputSchema: z.ZodType<Prisma.CommandCreateOrConnectWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommandCreateWithoutDeviceInputSchema),
        z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const CommandCreateManyDeviceInputEnvelopeSchema: z.ZodType<Prisma.CommandCreateManyDeviceInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => CommandCreateManyDeviceInputSchema),
        z.lazy(() => CommandCreateManyDeviceInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ScriptCreateWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptCreateWithoutConditionDeviceInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      user: z.lazy(() => UserCreateNestedOneWithoutScriptsInputSchema),
      commandDevice: z.lazy(
        () => DeviceCreateNestedOneWithoutCommandScriptsInputSchema
      ),
      baseCommand: z.lazy(
        () => BaseCommandCreateNestedOneWithoutScriptsInputSchema
      ),
    })
    .strict()

export const ScriptUncheckedCreateWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateWithoutConditionDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      commandDeviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptCreateOrConnectWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptCreateOrConnectWithoutConditionDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema),
      ]),
    })
    .strict()

export const ScriptCreateManyConditionDeviceInputEnvelopeSchema: z.ZodType<Prisma.ScriptCreateManyConditionDeviceInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ScriptCreateManyConditionDeviceInputSchema),
        z.lazy(() => ScriptCreateManyConditionDeviceInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ScriptCreateWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptCreateWithoutCommandDeviceInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      user: z.lazy(() => UserCreateNestedOneWithoutScriptsInputSchema),
      conditionDevice: z
        .lazy(() => DeviceCreateNestedOneWithoutConditionScriptsInputSchema)
        .optional(),
      baseCommand: z.lazy(
        () => BaseCommandCreateNestedOneWithoutScriptsInputSchema
      ),
    })
    .strict()

export const ScriptUncheckedCreateWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateWithoutCommandDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      conditionDeviceId: z.number().int().optional().nullable(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptCreateOrConnectWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptCreateOrConnectWithoutCommandDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema),
      ]),
    })
    .strict()

export const ScriptCreateManyCommandDeviceInputEnvelopeSchema: z.ZodType<Prisma.ScriptCreateManyCommandDeviceInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ScriptCreateManyCommandDeviceInputSchema),
        z.lazy(() => ScriptCreateManyCommandDeviceInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const DeviceDataCreateWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataCreateWithoutDeviceInput> =
  z
    .object({
      ts: z.number().int(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict()

export const DeviceDataUncheckedCreateWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUncheckedCreateWithoutDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict()

export const DeviceDataCreateOrConnectWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataCreateOrConnectWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => DeviceDataWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema),
        z.lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const DeviceDataCreateManyDeviceInputEnvelopeSchema: z.ZodType<Prisma.DeviceDataCreateManyDeviceInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => DeviceDataCreateManyDeviceInputSchema),
        z.lazy(() => DeviceDataCreateManyDeviceInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const UserUpsertWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpsertWithoutDevicesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutDevicesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutDevicesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict()

export const UserUpdateToOneWithWhereWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDevicesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutDevicesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema),
      ]),
    })
    .strict()

export const UserUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateWithoutDevicesInput> =
  z
    .object({
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      areas: z
        .lazy(() => AreaUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDevicesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      areas: z
        .lazy(() => AreaUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const AreaUpsertWithoutDevicesInputSchema: z.ZodType<Prisma.AreaUpsertWithoutDevicesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => AreaUpdateWithoutDevicesInputSchema),
        z.lazy(() => AreaUncheckedUpdateWithoutDevicesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AreaCreateWithoutDevicesInputSchema),
        z.lazy(() => AreaUncheckedCreateWithoutDevicesInputSchema),
      ]),
      where: z.lazy(() => AreaWhereInputSchema).optional(),
    })
    .strict()

export const AreaUpdateToOneWithWhereWithoutDevicesInputSchema: z.ZodType<Prisma.AreaUpdateToOneWithWhereWithoutDevicesInput> =
  z
    .object({
      where: z.lazy(() => AreaWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => AreaUpdateWithoutDevicesInputSchema),
        z.lazy(() => AreaUncheckedUpdateWithoutDevicesInputSchema),
      ]),
    })
    .strict()

export const AreaUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.AreaUpdateWithoutDevicesInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutAreasNestedInputSchema)
        .optional(),
    })
    .strict()

export const AreaUncheckedUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateWithoutDevicesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandUpsertWithWhereUniqueWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUpsertWithWhereUniqueWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => CommandUpdateWithoutDeviceInputSchema),
        z.lazy(() => CommandUncheckedUpdateWithoutDeviceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommandCreateWithoutDeviceInputSchema),
        z.lazy(() => CommandUncheckedCreateWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const CommandUpdateWithWhereUniqueWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUpdateWithWhereUniqueWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => CommandUpdateWithoutDeviceInputSchema),
        z.lazy(() => CommandUncheckedUpdateWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const CommandUpdateManyWithWhereWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUpdateManyWithWhereWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => CommandScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => CommandUpdateManyMutationInputSchema),
        z.lazy(() => CommandUncheckedUpdateManyWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const ScriptUpsertWithWhereUniqueWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUpsertWithWhereUniqueWithoutConditionDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ScriptUpdateWithoutConditionDeviceInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutConditionDeviceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutConditionDeviceInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutConditionDeviceInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateWithWhereUniqueWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUpdateWithWhereUniqueWithoutConditionDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateWithoutConditionDeviceInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutConditionDeviceInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateManyWithWhereWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithWhereWithoutConditionDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateManyMutationInputSchema),
        z.lazy(
          () => ScriptUncheckedUpdateManyWithoutConditionDeviceInputSchema
        ),
      ]),
    })
    .strict()

export const ScriptUpsertWithWhereUniqueWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUpsertWithWhereUniqueWithoutCommandDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ScriptUpdateWithoutCommandDeviceInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutCommandDeviceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutCommandDeviceInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutCommandDeviceInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateWithWhereUniqueWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUpdateWithWhereUniqueWithoutCommandDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateWithoutCommandDeviceInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutCommandDeviceInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateManyWithWhereWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithWhereWithoutCommandDeviceInput> =
  z
    .object({
      where: z.lazy(() => ScriptScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateManyMutationInputSchema),
        z.lazy(() => ScriptUncheckedUpdateManyWithoutCommandDeviceInputSchema),
      ]),
    })
    .strict()

export const DeviceDataUpsertWithWhereUniqueWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUpsertWithWhereUniqueWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => DeviceDataWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => DeviceDataUpdateWithoutDeviceInputSchema),
        z.lazy(() => DeviceDataUncheckedUpdateWithoutDeviceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DeviceDataCreateWithoutDeviceInputSchema),
        z.lazy(() => DeviceDataUncheckedCreateWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const DeviceDataUpdateWithWhereUniqueWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUpdateWithWhereUniqueWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => DeviceDataWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => DeviceDataUpdateWithoutDeviceInputSchema),
        z.lazy(() => DeviceDataUncheckedUpdateWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const DeviceDataUpdateManyWithWhereWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUpdateManyWithWhereWithoutDeviceInput> =
  z
    .object({
      where: z.lazy(() => DeviceDataScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => DeviceDataUpdateManyMutationInputSchema),
        z.lazy(() => DeviceDataUncheckedUpdateManyWithoutDeviceInputSchema),
      ]),
    })
    .strict()

export const DeviceDataScalarWhereInputSchema: z.ZodType<Prisma.DeviceDataScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DeviceDataScalarWhereInputSchema),
          z.lazy(() => DeviceDataScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DeviceDataScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DeviceDataScalarWhereInputSchema),
          z.lazy(() => DeviceDataScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      ts: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      status: z.lazy(() => JsonFilterSchema).optional(),
      deviceId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict()

export const UserCreateWithoutAreasInputSchema: z.ZodType<Prisma.UserCreateWithoutAreasInput> =
  z
    .object({
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      devices: z
        .lazy(() => DeviceCreateNestedManyWithoutUserInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutUserInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedCreateWithoutAreasInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAreasInput> =
  z
    .object({
      id: z.number().int().optional(),
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      devices: z
        .lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserCreateOrConnectWithoutAreasInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAreasInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutAreasInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema),
      ]),
    })
    .strict()

export const DeviceCreateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceCreateWithoutAreaInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      user: z
        .lazy(() => UserCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutConditionDeviceInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutCommandDeviceInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutAreaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutConditionDeviceInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutCommandDeviceInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceCreateOrConnectWithoutAreaInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutAreaInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutAreaInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),
      ]),
    })
    .strict()

export const DeviceCreateManyAreaInputEnvelopeSchema: z.ZodType<Prisma.DeviceCreateManyAreaInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => DeviceCreateManyAreaInputSchema),
        z.lazy(() => DeviceCreateManyAreaInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const UserUpsertWithoutAreasInputSchema: z.ZodType<Prisma.UserUpsertWithoutAreasInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutAreasInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAreasInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutAreasInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict()

export const UserUpdateToOneWithWhereWithoutAreasInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAreasInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutAreasInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAreasInputSchema),
      ]),
    })
    .strict()

export const UserUpdateWithoutAreasInputSchema: z.ZodType<Prisma.UserUpdateWithoutAreasInput> =
  z
    .object({
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedUpdateWithoutAreasInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAreasInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUpsertWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpsertWithWhereUniqueWithoutAreaInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => DeviceUpdateWithoutAreaInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutAreaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutAreaInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpdateWithWhereUniqueWithoutAreaInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => DeviceUpdateWithoutAreaInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutAreaInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateManyWithWhereWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithWhereWithoutAreaInput> =
  z
    .object({
      where: z.lazy(() => DeviceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => DeviceUpdateManyMutationInputSchema),
        z.lazy(() => DeviceUncheckedUpdateManyWithoutAreaInputSchema),
      ]),
    })
    .strict()

export const CommandCreateWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandCreateWithoutBaseCommandInput> =
  z
    .object({
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      user: z.lazy(() => UserCreateNestedOneWithoutCommandsInputSchema),
      device: z.lazy(() => DeviceCreateNestedOneWithoutCommandsInputSchema),
    })
    .strict()

export const CommandUncheckedCreateWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUncheckedCreateWithoutBaseCommandInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      deviceId: z.number().int(),
    })
    .strict()

export const CommandCreateOrConnectWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandCreateOrConnectWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommandCreateWithoutBaseCommandInputSchema),
        z.lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const CommandCreateManyBaseCommandInputEnvelopeSchema: z.ZodType<Prisma.CommandCreateManyBaseCommandInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => CommandCreateManyBaseCommandInputSchema),
        z.lazy(() => CommandCreateManyBaseCommandInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ScriptCreateWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptCreateWithoutBaseCommandInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      user: z.lazy(() => UserCreateNestedOneWithoutScriptsInputSchema),
      conditionDevice: z
        .lazy(() => DeviceCreateNestedOneWithoutConditionScriptsInputSchema)
        .optional(),
      commandDevice: z.lazy(
        () => DeviceCreateNestedOneWithoutCommandScriptsInputSchema
      ),
    })
    .strict()

export const ScriptUncheckedCreateWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUncheckedCreateWithoutBaseCommandInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      conditionDeviceId: z.number().int().optional().nullable(),
      commandDeviceId: z.number().int(),
    })
    .strict()

export const ScriptCreateOrConnectWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptCreateOrConnectWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const ScriptCreateManyBaseCommandInputEnvelopeSchema: z.ZodType<Prisma.ScriptCreateManyBaseCommandInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ScriptCreateManyBaseCommandInputSchema),
        z.lazy(() => ScriptCreateManyBaseCommandInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const CommandUpsertWithWhereUniqueWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUpsertWithWhereUniqueWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => CommandUpdateWithoutBaseCommandInputSchema),
        z.lazy(() => CommandUncheckedUpdateWithoutBaseCommandInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommandCreateWithoutBaseCommandInputSchema),
        z.lazy(() => CommandUncheckedCreateWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const CommandUpdateWithWhereUniqueWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUpdateWithWhereUniqueWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => CommandWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => CommandUpdateWithoutBaseCommandInputSchema),
        z.lazy(() => CommandUncheckedUpdateWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const CommandUpdateManyWithWhereWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUpdateManyWithWhereWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => CommandScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => CommandUpdateManyMutationInputSchema),
        z.lazy(() => CommandUncheckedUpdateManyWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const ScriptUpsertWithWhereUniqueWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUpsertWithWhereUniqueWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ScriptUpdateWithoutBaseCommandInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutBaseCommandInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ScriptCreateWithoutBaseCommandInputSchema),
        z.lazy(() => ScriptUncheckedCreateWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateWithWhereUniqueWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUpdateWithWhereUniqueWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => ScriptWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateWithoutBaseCommandInputSchema),
        z.lazy(() => ScriptUncheckedUpdateWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const ScriptUpdateManyWithWhereWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUpdateManyWithWhereWithoutBaseCommandInput> =
  z
    .object({
      where: z.lazy(() => ScriptScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ScriptUpdateManyMutationInputSchema),
        z.lazy(() => ScriptUncheckedUpdateManyWithoutBaseCommandInputSchema),
      ]),
    })
    .strict()

export const UserCreateWithoutCommandsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommandsInput> =
  z
    .object({
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      devices: z
        .lazy(() => DeviceCreateNestedManyWithoutUserInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaCreateNestedManyWithoutUserInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedCreateWithoutCommandsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommandsInput> =
  z
    .object({
      id: z.number().int().optional(),
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      devices: z
        .lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserCreateOrConnectWithoutCommandsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommandsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutCommandsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommandsInputSchema),
      ]),
    })
    .strict()

export const DeviceCreateWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceCreateWithoutCommandsInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      user: z
        .lazy(() => UserCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutConditionDeviceInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutCommandDeviceInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutCommandsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
      areaId: z.number().int().optional().nullable(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutConditionDeviceInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutCommandDeviceInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceCreateOrConnectWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutCommandsInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutCommandsInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutCommandsInputSchema),
      ]),
    })
    .strict()

export const BaseCommandCreateWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandCreateWithoutCommandsInput> =
  z
    .object({
      name: z.string(),
      args: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      scripts: z
        .lazy(() => ScriptCreateNestedManyWithoutBaseCommandInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUncheckedCreateWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandUncheckedCreateWithoutCommandsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      args: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      scripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutBaseCommandInputSchema
        )
        .optional(),
    })
    .strict()

export const BaseCommandCreateOrConnectWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandCreateOrConnectWithoutCommandsInput> =
  z
    .object({
      where: z.lazy(() => BaseCommandWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => BaseCommandCreateWithoutCommandsInputSchema),
        z.lazy(() => BaseCommandUncheckedCreateWithoutCommandsInputSchema),
      ]),
    })
    .strict()

export const UserUpsertWithoutCommandsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommandsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutCommandsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCommandsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutCommandsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutCommandsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict()

export const UserUpdateToOneWithWhereWithoutCommandsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommandsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutCommandsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutCommandsInputSchema),
      ]),
    })
    .strict()

export const UserUpdateWithoutCommandsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommandsInput> =
  z
    .object({
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedUpdateWithoutCommandsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommandsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      scripts: z
        .lazy(() => ScriptUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUpsertWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceUpsertWithoutCommandsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => DeviceUpdateWithoutCommandsInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutCommandsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutCommandsInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutCommandsInputSchema),
      ]),
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
    })
    .strict()

export const DeviceUpdateToOneWithWhereWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceUpdateToOneWithWhereWithoutCommandsInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => DeviceUpdateWithoutCommandsInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutCommandsInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutCommandsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptUpdateManyWithoutConditionDeviceNestedInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptUpdateManyWithoutCommandDeviceNestedInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateWithoutCommandsInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutCommandsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUpsertWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandUpsertWithoutCommandsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => BaseCommandUpdateWithoutCommandsInputSchema),
        z.lazy(() => BaseCommandUncheckedUpdateWithoutCommandsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => BaseCommandCreateWithoutCommandsInputSchema),
        z.lazy(() => BaseCommandUncheckedCreateWithoutCommandsInputSchema),
      ]),
      where: z.lazy(() => BaseCommandWhereInputSchema).optional(),
    })
    .strict()

export const BaseCommandUpdateToOneWithWhereWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandUpdateToOneWithWhereWithoutCommandsInput> =
  z
    .object({
      where: z.lazy(() => BaseCommandWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => BaseCommandUpdateWithoutCommandsInputSchema),
        z.lazy(() => BaseCommandUncheckedUpdateWithoutCommandsInputSchema),
      ]),
    })
    .strict()

export const BaseCommandUpdateWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandUpdateWithoutCommandsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      scripts: z
        .lazy(() => ScriptUpdateManyWithoutBaseCommandNestedInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUncheckedUpdateWithoutCommandsInputSchema: z.ZodType<Prisma.BaseCommandUncheckedUpdateWithoutCommandsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      scripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutBaseCommandNestedInputSchema
        )
        .optional(),
    })
    .strict()

export const UserCreateWithoutScriptsInputSchema: z.ZodType<Prisma.UserCreateWithoutScriptsInput> =
  z
    .object({
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      devices: z
        .lazy(() => DeviceCreateNestedManyWithoutUserInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaCreateNestedManyWithoutUserInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedCreateWithoutScriptsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutScriptsInput> =
  z
    .object({
      id: z.number().int().optional(),
      username: z.string(),
      passHash: z.string(),
      passSalt: z.string(),
      createdAt: z.number().int(),
      isActive: z.boolean().optional(),
      isAdmin: z.boolean().optional(),
      devices: z
        .lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict()

export const UserCreateOrConnectWithoutScriptsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutScriptsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutScriptsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutScriptsInputSchema),
      ]),
    })
    .strict()

export const DeviceCreateWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceCreateWithoutConditionScriptsInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      user: z
        .lazy(() => UserCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutCommandDeviceInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutConditionScriptsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
      areaId: z.number().int().optional().nullable(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutCommandDeviceInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceCreateOrConnectWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutConditionScriptsInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutConditionScriptsInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutConditionScriptsInputSchema),
      ]),
    })
    .strict()

export const DeviceCreateWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceCreateWithoutCommandScriptsInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      user: z
        .lazy(() => UserCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutConditionDeviceInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutCommandScriptsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
      areaId: z.number().int().optional().nullable(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutConditionDeviceInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceCreateOrConnectWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutCommandScriptsInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutCommandScriptsInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutCommandScriptsInputSchema),
      ]),
    })
    .strict()

export const BaseCommandCreateWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandCreateWithoutScriptsInput> =
  z
    .object({
      name: z.string(),
      args: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutBaseCommandInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUncheckedCreateWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandUncheckedCreateWithoutScriptsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      args: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commands: z
        .lazy(
          () => CommandUncheckedCreateNestedManyWithoutBaseCommandInputSchema
        )
        .optional(),
    })
    .strict()

export const BaseCommandCreateOrConnectWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandCreateOrConnectWithoutScriptsInput> =
  z
    .object({
      where: z.lazy(() => BaseCommandWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => BaseCommandCreateWithoutScriptsInputSchema),
        z.lazy(() => BaseCommandUncheckedCreateWithoutScriptsInputSchema),
      ]),
    })
    .strict()

export const UserUpsertWithoutScriptsInputSchema: z.ZodType<Prisma.UserUpsertWithoutScriptsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutScriptsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutScriptsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutScriptsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutScriptsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict()

export const UserUpdateToOneWithWhereWithoutScriptsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutScriptsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutScriptsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutScriptsInputSchema),
      ]),
    })
    .strict()

export const UserUpdateWithoutScriptsInputSchema: z.ZodType<Prisma.UserUpdateWithoutScriptsInput> =
  z
    .object({
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const UserUncheckedUpdateWithoutScriptsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutScriptsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passHash: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      passSalt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isActive: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isAdmin: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      areas: z
        .lazy(() => AreaUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUpsertWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceUpsertWithoutConditionScriptsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => DeviceUpdateWithoutConditionScriptsInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutConditionScriptsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutConditionScriptsInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutConditionScriptsInputSchema),
      ]),
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
    })
    .strict()

export const DeviceUpdateToOneWithWhereWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceUpdateToOneWithWhereWithoutConditionScriptsInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => DeviceUpdateWithoutConditionScriptsInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutConditionScriptsInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutConditionScriptsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptUpdateManyWithoutCommandDeviceNestedInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateWithoutConditionScriptsInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutConditionScriptsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUpsertWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceUpsertWithoutCommandScriptsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => DeviceUpdateWithoutCommandScriptsInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutCommandScriptsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutCommandScriptsInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutCommandScriptsInputSchema),
      ]),
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
    })
    .strict()

export const DeviceUpdateToOneWithWhereWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceUpdateToOneWithWhereWithoutCommandScriptsInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => DeviceUpdateWithoutCommandScriptsInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutCommandScriptsInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutCommandScriptsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptUpdateManyWithoutConditionDeviceNestedInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateWithoutCommandScriptsInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutCommandScriptsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUpsertWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandUpsertWithoutScriptsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => BaseCommandUpdateWithoutScriptsInputSchema),
        z.lazy(() => BaseCommandUncheckedUpdateWithoutScriptsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => BaseCommandCreateWithoutScriptsInputSchema),
        z.lazy(() => BaseCommandUncheckedCreateWithoutScriptsInputSchema),
      ]),
      where: z.lazy(() => BaseCommandWhereInputSchema).optional(),
    })
    .strict()

export const BaseCommandUpdateToOneWithWhereWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandUpdateToOneWithWhereWithoutScriptsInput> =
  z
    .object({
      where: z.lazy(() => BaseCommandWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => BaseCommandUpdateWithoutScriptsInputSchema),
        z.lazy(() => BaseCommandUncheckedUpdateWithoutScriptsInputSchema),
      ]),
    })
    .strict()

export const BaseCommandUpdateWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandUpdateWithoutScriptsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutBaseCommandNestedInputSchema)
        .optional(),
    })
    .strict()

export const BaseCommandUncheckedUpdateWithoutScriptsInputSchema: z.ZodType<Prisma.BaseCommandUncheckedUpdateWithoutScriptsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      args: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commands: z
        .lazy(
          () => CommandUncheckedUpdateManyWithoutBaseCommandNestedInputSchema
        )
        .optional(),
    })
    .strict()

export const DeviceCreateWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceCreateWithoutDeviceDataInput> =
  z
    .object({
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      user: z
        .lazy(() => UserCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaCreateNestedOneWithoutDevicesInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutConditionDeviceInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptCreateNestedManyWithoutCommandDeviceInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedCreateWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutDeviceDataInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
      areaId: z.number().int().optional().nullable(),
      commands: z
        .lazy(() => CommandUncheckedCreateNestedManyWithoutDeviceInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutConditionDeviceInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedCreateNestedManyWithoutCommandDeviceInputSchema
        )
        .optional(),
    })
    .strict()

export const DeviceCreateOrConnectWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutDeviceDataInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutDeviceDataInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutDeviceDataInputSchema),
      ]),
    })
    .strict()

export const DeviceUpsertWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceUpsertWithoutDeviceDataInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => DeviceUpdateWithoutDeviceDataInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutDeviceDataInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DeviceCreateWithoutDeviceDataInputSchema),
        z.lazy(() => DeviceUncheckedCreateWithoutDeviceDataInputSchema),
      ]),
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
    })
    .strict()

export const DeviceUpdateToOneWithWhereWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceUpdateToOneWithWhereWithoutDeviceDataInput> =
  z
    .object({
      where: z.lazy(() => DeviceWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => DeviceUpdateWithoutDeviceDataInputSchema),
        z.lazy(() => DeviceUncheckedUpdateWithoutDeviceDataInputSchema),
      ]),
    })
    .strict()

export const DeviceUpdateWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutDeviceDataInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      area: z
        .lazy(() => AreaUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptUpdateManyWithoutConditionDeviceNestedInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptUpdateManyWithoutCommandDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateWithoutDeviceDataInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutDeviceDataInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInputSchema
        )
        .optional(),
    })
    .strict()

export const DeviceCreateManyUserInputSchema: z.ZodType<Prisma.DeviceCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      areaId: z.number().int().optional().nullable(),
    })
    .strict()

export const AreaCreateManyUserInputSchema: z.ZodType<Prisma.AreaCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      type: z.lazy(() => AreaTypeSchema),
    })
    .strict()

export const CommandCreateManyUserInputSchema: z.ZodType<Prisma.CommandCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      deviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptCreateManyUserInputSchema: z.ZodType<Prisma.ScriptCreateManyUserInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      conditionDeviceId: z.number().int().optional().nullable(),
      commandDeviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const DeviceUpdateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutUserInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      area: z
        .lazy(() => AreaUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptUpdateManyWithoutConditionDeviceNestedInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptUpdateManyWithoutCommandDeviceNestedInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      areaId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const AreaUpdateWithoutUserInputSchema: z.ZodType<Prisma.AreaUpdateWithoutUserInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUpdateManyWithoutAreaNestedInputSchema)
        .optional(),
    })
    .strict()

export const AreaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      devices: z
        .lazy(() => DeviceUncheckedUpdateManyWithoutAreaNestedInputSchema)
        .optional(),
    })
    .strict()

export const AreaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => AreaTypeSchema),
          z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommandUpdateWithoutUserInput> =
  z
    .object({
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      device: z
        .lazy(() => DeviceUpdateOneRequiredWithoutCommandsNestedInputSchema)
        .optional(),
      baseCommand: z
        .lazy(
          () => BaseCommandUpdateOneRequiredWithoutCommandsNestedInputSchema
        )
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateWithoutUserInputSchema: z.ZodType<Prisma.ScriptUpdateWithoutUserInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      conditionDevice: z
        .lazy(() => DeviceUpdateOneWithoutConditionScriptsNestedInputSchema)
        .optional(),
      commandDevice: z
        .lazy(
          () => DeviceUpdateOneRequiredWithoutCommandScriptsNestedInputSchema
        )
        .optional(),
      baseCommand: z
        .lazy(() => BaseCommandUpdateOneRequiredWithoutScriptsNestedInputSchema)
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandCreateManyDeviceInputSchema: z.ZodType<Prisma.CommandCreateManyDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptCreateManyConditionDeviceInputSchema: z.ZodType<Prisma.ScriptCreateManyConditionDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      commandDeviceId: z.number().int(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const ScriptCreateManyCommandDeviceInputSchema: z.ZodType<Prisma.ScriptCreateManyCommandDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      conditionDeviceId: z.number().int().optional().nullable(),
      baseCommandId: z.number().int(),
    })
    .strict()

export const DeviceDataCreateManyDeviceInputSchema: z.ZodType<Prisma.DeviceDataCreateManyDeviceInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
    })
    .strict()

export const CommandUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUpdateWithoutDeviceInput> =
  z
    .object({
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutCommandsNestedInputSchema)
        .optional(),
      baseCommand: z
        .lazy(
          () => BaseCommandUpdateOneRequiredWithoutCommandsNestedInputSchema
        )
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateWithoutDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateManyWithoutDeviceInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateManyWithoutDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUpdateWithoutConditionDeviceInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutScriptsNestedInputSchema)
        .optional(),
      commandDevice: z
        .lazy(
          () => DeviceUpdateOneRequiredWithoutCommandScriptsNestedInputSchema
        )
        .optional(),
      baseCommand: z
        .lazy(() => BaseCommandUpdateOneRequiredWithoutScriptsNestedInputSchema)
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateWithoutConditionDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutConditionDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutConditionDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUpdateWithoutCommandDeviceInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutScriptsNestedInputSchema)
        .optional(),
      conditionDevice: z
        .lazy(() => DeviceUpdateOneWithoutConditionScriptsNestedInputSchema)
        .optional(),
      baseCommand: z
        .lazy(() => BaseCommandUpdateOneRequiredWithoutScriptsNestedInputSchema)
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateWithoutCommandDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutCommandDeviceInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutCommandDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      baseCommandId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUpdateWithoutDeviceInput> =
  z
    .object({
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const DeviceDataUncheckedUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUncheckedUpdateWithoutDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const DeviceDataUncheckedUpdateManyWithoutDeviceInputSchema: z.ZodType<Prisma.DeviceDataUncheckedUpdateManyWithoutDeviceInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
    })
    .strict()

export const DeviceCreateManyAreaInputSchema: z.ZodType<Prisma.DeviceCreateManyAreaInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      isConnected: z.boolean().optional(),
      uuid: z.string(),
      type: z.lazy(() => DeviceTypeSchema),
      userId: z.number().int().optional().nullable(),
    })
    .strict()

export const DeviceUpdateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutAreaInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema)
        .optional(),
      commands: z
        .lazy(() => CommandUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(() => ScriptUpdateManyWithoutConditionDeviceNestedInputSchema)
        .optional(),
      commandScripts: z
        .lazy(() => ScriptUpdateManyWithoutCommandDeviceNestedInputSchema)
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutAreaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commands: z
        .lazy(() => CommandUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
      conditionScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutConditionDeviceNestedInputSchema
        )
        .optional(),
      commandScripts: z
        .lazy(
          () => ScriptUncheckedUpdateManyWithoutCommandDeviceNestedInputSchema
        )
        .optional(),
      deviceData: z
        .lazy(() => DeviceDataUncheckedUpdateManyWithoutDeviceNestedInputSchema)
        .optional(),
    })
    .strict()

export const DeviceUncheckedUpdateManyWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutAreaInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isConnected: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      uuid: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.lazy(() => DeviceTypeSchema),
          z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const CommandCreateManyBaseCommandInputSchema: z.ZodType<Prisma.CommandCreateManyBaseCommandInput> =
  z
    .object({
      id: z.number().int().optional(),
      ts: z.number().int(),
      isExecuted: z.boolean().optional(),
      status: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      params: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      deviceId: z.number().int(),
    })
    .strict()

export const ScriptCreateManyBaseCommandInputSchema: z.ZodType<Prisma.ScriptCreateManyBaseCommandInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      description: z.string(),
      conditionParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      commandParams: z.union([
        z.lazy(() => JsonNullValueInputSchema),
        InputJsonValueSchema,
      ]),
      userId: z.number().int(),
      conditionDeviceId: z.number().int().optional().nullable(),
      commandDeviceId: z.number().int(),
    })
    .strict()

export const CommandUpdateWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUpdateWithoutBaseCommandInput> =
  z
    .object({
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutCommandsNestedInputSchema)
        .optional(),
      device: z
        .lazy(() => DeviceUpdateOneRequiredWithoutCommandsNestedInputSchema)
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateWithoutBaseCommandInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const CommandUncheckedUpdateManyWithoutBaseCommandInputSchema: z.ZodType<Prisma.CommandUncheckedUpdateManyWithoutBaseCommandInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ts: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      isExecuted: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      params: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      deviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUpdateWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUpdateWithoutBaseCommandInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutScriptsNestedInputSchema)
        .optional(),
      conditionDevice: z
        .lazy(() => DeviceUpdateOneWithoutConditionScriptsNestedInputSchema)
        .optional(),
      commandDevice: z
        .lazy(
          () => DeviceUpdateOneRequiredWithoutCommandScriptsNestedInputSchema
        )
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateWithoutBaseCommandInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const ScriptUncheckedUpdateManyWithoutBaseCommandInputSchema: z.ZodType<Prisma.ScriptUncheckedUpdateManyWithoutBaseCommandInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      commandParams: z
        .union([z.lazy(() => JsonNullValueInputSchema), InputJsonValueSchema])
        .optional(),
      userId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      conditionDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      commandDeviceId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict()

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict()

export const DeviceFindFirstArgsSchema: z.ZodType<Prisma.DeviceFindFirstArgs> =
  z
    .object({
      select: DeviceSelectSchema.optional(),
      include: DeviceIncludeSchema.optional(),
      where: DeviceWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceOrderByWithRelationInputSchema.array(),
          DeviceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DeviceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DeviceScalarFieldEnumSchema,
          DeviceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindFirstOrThrowArgs> =
  z
    .object({
      select: DeviceSelectSchema.optional(),
      include: DeviceIncludeSchema.optional(),
      where: DeviceWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceOrderByWithRelationInputSchema.array(),
          DeviceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DeviceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DeviceScalarFieldEnumSchema,
          DeviceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceFindManyArgsSchema: z.ZodType<Prisma.DeviceFindManyArgs> = z
  .object({
    select: DeviceSelectSchema.optional(),
    include: DeviceIncludeSchema.optional(),
    where: DeviceWhereInputSchema.optional(),
    orderBy: z
      .union([
        DeviceOrderByWithRelationInputSchema.array(),
        DeviceOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: DeviceWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DeviceScalarFieldEnumSchema, DeviceScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const DeviceAggregateArgsSchema: z.ZodType<Prisma.DeviceAggregateArgs> =
  z
    .object({
      where: DeviceWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceOrderByWithRelationInputSchema.array(),
          DeviceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DeviceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const DeviceGroupByArgsSchema: z.ZodType<Prisma.DeviceGroupByArgs> = z
  .object({
    where: DeviceWhereInputSchema.optional(),
    orderBy: z
      .union([
        DeviceOrderByWithAggregationInputSchema.array(),
        DeviceOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: DeviceScalarFieldEnumSchema.array(),
    having: DeviceScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const DeviceFindUniqueArgsSchema: z.ZodType<Prisma.DeviceFindUniqueArgs> =
  z
    .object({
      select: DeviceSelectSchema.optional(),
      include: DeviceIncludeSchema.optional(),
      where: DeviceWhereUniqueInputSchema,
    })
    .strict()

export const DeviceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindUniqueOrThrowArgs> =
  z
    .object({
      select: DeviceSelectSchema.optional(),
      include: DeviceIncludeSchema.optional(),
      where: DeviceWhereUniqueInputSchema,
    })
    .strict()

export const AreaFindFirstArgsSchema: z.ZodType<Prisma.AreaFindFirstArgs> = z
  .object({
    select: AreaSelectSchema.optional(),
    include: AreaIncludeSchema.optional(),
    where: AreaWhereInputSchema.optional(),
    orderBy: z
      .union([
        AreaOrderByWithRelationInputSchema.array(),
        AreaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: AreaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AreaScalarFieldEnumSchema, AreaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const AreaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AreaFindFirstOrThrowArgs> =
  z
    .object({
      select: AreaSelectSchema.optional(),
      include: AreaIncludeSchema.optional(),
      where: AreaWhereInputSchema.optional(),
      orderBy: z
        .union([
          AreaOrderByWithRelationInputSchema.array(),
          AreaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AreaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([AreaScalarFieldEnumSchema, AreaScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict()

export const AreaFindManyArgsSchema: z.ZodType<Prisma.AreaFindManyArgs> = z
  .object({
    select: AreaSelectSchema.optional(),
    include: AreaIncludeSchema.optional(),
    where: AreaWhereInputSchema.optional(),
    orderBy: z
      .union([
        AreaOrderByWithRelationInputSchema.array(),
        AreaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: AreaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AreaScalarFieldEnumSchema, AreaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const AreaAggregateArgsSchema: z.ZodType<Prisma.AreaAggregateArgs> = z
  .object({
    where: AreaWhereInputSchema.optional(),
    orderBy: z
      .union([
        AreaOrderByWithRelationInputSchema.array(),
        AreaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: AreaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const AreaGroupByArgsSchema: z.ZodType<Prisma.AreaGroupByArgs> = z
  .object({
    where: AreaWhereInputSchema.optional(),
    orderBy: z
      .union([
        AreaOrderByWithAggregationInputSchema.array(),
        AreaOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AreaScalarFieldEnumSchema.array(),
    having: AreaScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const AreaFindUniqueArgsSchema: z.ZodType<Prisma.AreaFindUniqueArgs> = z
  .object({
    select: AreaSelectSchema.optional(),
    include: AreaIncludeSchema.optional(),
    where: AreaWhereUniqueInputSchema,
  })
  .strict()

export const AreaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AreaFindUniqueOrThrowArgs> =
  z
    .object({
      select: AreaSelectSchema.optional(),
      include: AreaIncludeSchema.optional(),
      where: AreaWhereUniqueInputSchema,
    })
    .strict()

export const BaseCommandFindFirstArgsSchema: z.ZodType<Prisma.BaseCommandFindFirstArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      where: BaseCommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          BaseCommandOrderByWithRelationInputSchema.array(),
          BaseCommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BaseCommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BaseCommandScalarFieldEnumSchema,
          BaseCommandScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const BaseCommandFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BaseCommandFindFirstOrThrowArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      where: BaseCommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          BaseCommandOrderByWithRelationInputSchema.array(),
          BaseCommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BaseCommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BaseCommandScalarFieldEnumSchema,
          BaseCommandScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const BaseCommandFindManyArgsSchema: z.ZodType<Prisma.BaseCommandFindManyArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      where: BaseCommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          BaseCommandOrderByWithRelationInputSchema.array(),
          BaseCommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BaseCommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          BaseCommandScalarFieldEnumSchema,
          BaseCommandScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const BaseCommandAggregateArgsSchema: z.ZodType<Prisma.BaseCommandAggregateArgs> =
  z
    .object({
      where: BaseCommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          BaseCommandOrderByWithRelationInputSchema.array(),
          BaseCommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BaseCommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const BaseCommandGroupByArgsSchema: z.ZodType<Prisma.BaseCommandGroupByArgs> =
  z
    .object({
      where: BaseCommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          BaseCommandOrderByWithAggregationInputSchema.array(),
          BaseCommandOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: BaseCommandScalarFieldEnumSchema.array(),
      having: BaseCommandScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const BaseCommandFindUniqueArgsSchema: z.ZodType<Prisma.BaseCommandFindUniqueArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      where: BaseCommandWhereUniqueInputSchema,
    })
    .strict()

export const BaseCommandFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BaseCommandFindUniqueOrThrowArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      where: BaseCommandWhereUniqueInputSchema,
    })
    .strict()

export const CommandFindFirstArgsSchema: z.ZodType<Prisma.CommandFindFirstArgs> =
  z
    .object({
      select: CommandSelectSchema.optional(),
      include: CommandIncludeSchema.optional(),
      where: CommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommandOrderByWithRelationInputSchema.array(),
          CommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CommandScalarFieldEnumSchema,
          CommandScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const CommandFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommandFindFirstOrThrowArgs> =
  z
    .object({
      select: CommandSelectSchema.optional(),
      include: CommandIncludeSchema.optional(),
      where: CommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommandOrderByWithRelationInputSchema.array(),
          CommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CommandScalarFieldEnumSchema,
          CommandScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const CommandFindManyArgsSchema: z.ZodType<Prisma.CommandFindManyArgs> =
  z
    .object({
      select: CommandSelectSchema.optional(),
      include: CommandIncludeSchema.optional(),
      where: CommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommandOrderByWithRelationInputSchema.array(),
          CommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CommandScalarFieldEnumSchema,
          CommandScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const CommandAggregateArgsSchema: z.ZodType<Prisma.CommandAggregateArgs> =
  z
    .object({
      where: CommandWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommandOrderByWithRelationInputSchema.array(),
          CommandOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommandWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const CommandGroupByArgsSchema: z.ZodType<Prisma.CommandGroupByArgs> = z
  .object({
    where: CommandWhereInputSchema.optional(),
    orderBy: z
      .union([
        CommandOrderByWithAggregationInputSchema.array(),
        CommandOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: CommandScalarFieldEnumSchema.array(),
    having: CommandScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const CommandFindUniqueArgsSchema: z.ZodType<Prisma.CommandFindUniqueArgs> =
  z
    .object({
      select: CommandSelectSchema.optional(),
      include: CommandIncludeSchema.optional(),
      where: CommandWhereUniqueInputSchema,
    })
    .strict()

export const CommandFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommandFindUniqueOrThrowArgs> =
  z
    .object({
      select: CommandSelectSchema.optional(),
      include: CommandIncludeSchema.optional(),
      where: CommandWhereUniqueInputSchema,
    })
    .strict()

export const ScriptFindFirstArgsSchema: z.ZodType<Prisma.ScriptFindFirstArgs> =
  z
    .object({
      select: ScriptSelectSchema.optional(),
      include: ScriptIncludeSchema.optional(),
      where: ScriptWhereInputSchema.optional(),
      orderBy: z
        .union([
          ScriptOrderByWithRelationInputSchema.array(),
          ScriptOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ScriptWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ScriptScalarFieldEnumSchema,
          ScriptScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScriptFindFirstOrThrowArgs> =
  z
    .object({
      select: ScriptSelectSchema.optional(),
      include: ScriptIncludeSchema.optional(),
      where: ScriptWhereInputSchema.optional(),
      orderBy: z
        .union([
          ScriptOrderByWithRelationInputSchema.array(),
          ScriptOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ScriptWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ScriptScalarFieldEnumSchema,
          ScriptScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const ScriptFindManyArgsSchema: z.ZodType<Prisma.ScriptFindManyArgs> = z
  .object({
    select: ScriptSelectSchema.optional(),
    include: ScriptIncludeSchema.optional(),
    where: ScriptWhereInputSchema.optional(),
    orderBy: z
      .union([
        ScriptOrderByWithRelationInputSchema.array(),
        ScriptOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ScriptWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ScriptScalarFieldEnumSchema, ScriptScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const ScriptAggregateArgsSchema: z.ZodType<Prisma.ScriptAggregateArgs> =
  z
    .object({
      where: ScriptWhereInputSchema.optional(),
      orderBy: z
        .union([
          ScriptOrderByWithRelationInputSchema.array(),
          ScriptOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ScriptWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const ScriptGroupByArgsSchema: z.ZodType<Prisma.ScriptGroupByArgs> = z
  .object({
    where: ScriptWhereInputSchema.optional(),
    orderBy: z
      .union([
        ScriptOrderByWithAggregationInputSchema.array(),
        ScriptOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ScriptScalarFieldEnumSchema.array(),
    having: ScriptScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const ScriptFindUniqueArgsSchema: z.ZodType<Prisma.ScriptFindUniqueArgs> =
  z
    .object({
      select: ScriptSelectSchema.optional(),
      include: ScriptIncludeSchema.optional(),
      where: ScriptWhereUniqueInputSchema,
    })
    .strict()

export const ScriptFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScriptFindUniqueOrThrowArgs> =
  z
    .object({
      select: ScriptSelectSchema.optional(),
      include: ScriptIncludeSchema.optional(),
      where: ScriptWhereUniqueInputSchema,
    })
    .strict()

export const DeviceDataFindFirstArgsSchema: z.ZodType<Prisma.DeviceDataFindFirstArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      where: DeviceDataWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceDataOrderByWithRelationInputSchema.array(),
          DeviceDataOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DeviceDataWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DeviceDataScalarFieldEnumSchema,
          DeviceDataScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DeviceDataFindFirstOrThrowArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      where: DeviceDataWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceDataOrderByWithRelationInputSchema.array(),
          DeviceDataOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DeviceDataWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DeviceDataScalarFieldEnumSchema,
          DeviceDataScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataFindManyArgsSchema: z.ZodType<Prisma.DeviceDataFindManyArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      where: DeviceDataWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceDataOrderByWithRelationInputSchema.array(),
          DeviceDataOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DeviceDataWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          DeviceDataScalarFieldEnumSchema,
          DeviceDataScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const DeviceDataAggregateArgsSchema: z.ZodType<Prisma.DeviceDataAggregateArgs> =
  z
    .object({
      where: DeviceDataWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceDataOrderByWithRelationInputSchema.array(),
          DeviceDataOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DeviceDataWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const DeviceDataGroupByArgsSchema: z.ZodType<Prisma.DeviceDataGroupByArgs> =
  z
    .object({
      where: DeviceDataWhereInputSchema.optional(),
      orderBy: z
        .union([
          DeviceDataOrderByWithAggregationInputSchema.array(),
          DeviceDataOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: DeviceDataScalarFieldEnumSchema.array(),
      having: DeviceDataScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const DeviceDataFindUniqueArgsSchema: z.ZodType<Prisma.DeviceDataFindUniqueArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      where: DeviceDataWhereUniqueInputSchema,
    })
    .strict()

export const DeviceDataFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DeviceDataFindUniqueOrThrowArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      where: DeviceDataWhereUniqueInputSchema,
    })
    .strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const UserAndReturnCreateManyArgsSchema: z.ZodType<Prisma.UserAndReturnCreateManyArgs> =
  z
    .object({
      data: z.union([
        UserCreateManyInputSchema,
        UserCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict()

export const DeviceCreateArgsSchema: z.ZodType<Prisma.DeviceCreateArgs> = z
  .object({
    select: DeviceSelectSchema.optional(),
    include: DeviceIncludeSchema.optional(),
    data: z.union([DeviceCreateInputSchema, DeviceUncheckedCreateInputSchema]),
  })
  .strict()

export const DeviceUpsertArgsSchema: z.ZodType<Prisma.DeviceUpsertArgs> = z
  .object({
    select: DeviceSelectSchema.optional(),
    include: DeviceIncludeSchema.optional(),
    where: DeviceWhereUniqueInputSchema,
    create: z.union([
      DeviceCreateInputSchema,
      DeviceUncheckedCreateInputSchema,
    ]),
    update: z.union([
      DeviceUpdateInputSchema,
      DeviceUncheckedUpdateInputSchema,
    ]),
  })
  .strict()

export const DeviceCreateManyArgsSchema: z.ZodType<Prisma.DeviceCreateManyArgs> =
  z
    .object({
      data: z.union([
        DeviceCreateManyInputSchema,
        DeviceCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const DeviceAndReturnCreateManyArgsSchema: z.ZodType<Prisma.DeviceAndReturnCreateManyArgs> =
  z
    .object({
      data: z.union([
        DeviceCreateManyInputSchema,
        DeviceCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const DeviceDeleteArgsSchema: z.ZodType<Prisma.DeviceDeleteArgs> = z
  .object({
    select: DeviceSelectSchema.optional(),
    include: DeviceIncludeSchema.optional(),
    where: DeviceWhereUniqueInputSchema,
  })
  .strict()

export const DeviceUpdateArgsSchema: z.ZodType<Prisma.DeviceUpdateArgs> = z
  .object({
    select: DeviceSelectSchema.optional(),
    include: DeviceIncludeSchema.optional(),
    data: z.union([DeviceUpdateInputSchema, DeviceUncheckedUpdateInputSchema]),
    where: DeviceWhereUniqueInputSchema,
  })
  .strict()

export const DeviceUpdateManyArgsSchema: z.ZodType<Prisma.DeviceUpdateManyArgs> =
  z
    .object({
      data: z.union([
        DeviceUpdateManyMutationInputSchema,
        DeviceUncheckedUpdateManyInputSchema,
      ]),
      where: DeviceWhereInputSchema.optional(),
    })
    .strict()

export const DeviceDeleteManyArgsSchema: z.ZodType<Prisma.DeviceDeleteManyArgs> =
  z
    .object({
      where: DeviceWhereInputSchema.optional(),
    })
    .strict()

export const AreaCreateArgsSchema: z.ZodType<Prisma.AreaCreateArgs> = z
  .object({
    select: AreaSelectSchema.optional(),
    include: AreaIncludeSchema.optional(),
    data: z.union([AreaCreateInputSchema, AreaUncheckedCreateInputSchema]),
  })
  .strict()

export const AreaUpsertArgsSchema: z.ZodType<Prisma.AreaUpsertArgs> = z
  .object({
    select: AreaSelectSchema.optional(),
    include: AreaIncludeSchema.optional(),
    where: AreaWhereUniqueInputSchema,
    create: z.union([AreaCreateInputSchema, AreaUncheckedCreateInputSchema]),
    update: z.union([AreaUpdateInputSchema, AreaUncheckedUpdateInputSchema]),
  })
  .strict()

export const AreaCreateManyArgsSchema: z.ZodType<Prisma.AreaCreateManyArgs> = z
  .object({
    data: z.union([
      AreaCreateManyInputSchema,
      AreaCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const AreaAndReturnCreateManyArgsSchema: z.ZodType<Prisma.AreaAndReturnCreateManyArgs> =
  z
    .object({
      data: z.union([
        AreaCreateManyInputSchema,
        AreaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const AreaDeleteArgsSchema: z.ZodType<Prisma.AreaDeleteArgs> = z
  .object({
    select: AreaSelectSchema.optional(),
    include: AreaIncludeSchema.optional(),
    where: AreaWhereUniqueInputSchema,
  })
  .strict()

export const AreaUpdateArgsSchema: z.ZodType<Prisma.AreaUpdateArgs> = z
  .object({
    select: AreaSelectSchema.optional(),
    include: AreaIncludeSchema.optional(),
    data: z.union([AreaUpdateInputSchema, AreaUncheckedUpdateInputSchema]),
    where: AreaWhereUniqueInputSchema,
  })
  .strict()

export const AreaUpdateManyArgsSchema: z.ZodType<Prisma.AreaUpdateManyArgs> = z
  .object({
    data: z.union([
      AreaUpdateManyMutationInputSchema,
      AreaUncheckedUpdateManyInputSchema,
    ]),
    where: AreaWhereInputSchema.optional(),
  })
  .strict()

export const AreaDeleteManyArgsSchema: z.ZodType<Prisma.AreaDeleteManyArgs> = z
  .object({
    where: AreaWhereInputSchema.optional(),
  })
  .strict()

export const BaseCommandCreateArgsSchema: z.ZodType<Prisma.BaseCommandCreateArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      data: z.union([
        BaseCommandCreateInputSchema,
        BaseCommandUncheckedCreateInputSchema,
      ]),
    })
    .strict()

export const BaseCommandUpsertArgsSchema: z.ZodType<Prisma.BaseCommandUpsertArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      where: BaseCommandWhereUniqueInputSchema,
      create: z.union([
        BaseCommandCreateInputSchema,
        BaseCommandUncheckedCreateInputSchema,
      ]),
      update: z.union([
        BaseCommandUpdateInputSchema,
        BaseCommandUncheckedUpdateInputSchema,
      ]),
    })
    .strict()

export const BaseCommandCreateManyArgsSchema: z.ZodType<Prisma.BaseCommandCreateManyArgs> =
  z
    .object({
      data: z.union([
        BaseCommandCreateManyInputSchema,
        BaseCommandCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const BaseCommandAndReturnCreateManyArgsSchema: z.ZodType<Prisma.BaseCommandAndReturnCreateManyArgs> =
  z
    .object({
      data: z.union([
        BaseCommandCreateManyInputSchema,
        BaseCommandCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const BaseCommandDeleteArgsSchema: z.ZodType<Prisma.BaseCommandDeleteArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      where: BaseCommandWhereUniqueInputSchema,
    })
    .strict()

export const BaseCommandUpdateArgsSchema: z.ZodType<Prisma.BaseCommandUpdateArgs> =
  z
    .object({
      select: BaseCommandSelectSchema.optional(),
      include: BaseCommandIncludeSchema.optional(),
      data: z.union([
        BaseCommandUpdateInputSchema,
        BaseCommandUncheckedUpdateInputSchema,
      ]),
      where: BaseCommandWhereUniqueInputSchema,
    })
    .strict()

export const BaseCommandUpdateManyArgsSchema: z.ZodType<Prisma.BaseCommandUpdateManyArgs> =
  z
    .object({
      data: z.union([
        BaseCommandUpdateManyMutationInputSchema,
        BaseCommandUncheckedUpdateManyInputSchema,
      ]),
      where: BaseCommandWhereInputSchema.optional(),
    })
    .strict()

export const BaseCommandDeleteManyArgsSchema: z.ZodType<Prisma.BaseCommandDeleteManyArgs> =
  z
    .object({
      where: BaseCommandWhereInputSchema.optional(),
    })
    .strict()

export const CommandCreateArgsSchema: z.ZodType<Prisma.CommandCreateArgs> = z
  .object({
    select: CommandSelectSchema.optional(),
    include: CommandIncludeSchema.optional(),
    data: z.union([
      CommandCreateInputSchema,
      CommandUncheckedCreateInputSchema,
    ]),
  })
  .strict()

export const CommandUpsertArgsSchema: z.ZodType<Prisma.CommandUpsertArgs> = z
  .object({
    select: CommandSelectSchema.optional(),
    include: CommandIncludeSchema.optional(),
    where: CommandWhereUniqueInputSchema,
    create: z.union([
      CommandCreateInputSchema,
      CommandUncheckedCreateInputSchema,
    ]),
    update: z.union([
      CommandUpdateInputSchema,
      CommandUncheckedUpdateInputSchema,
    ]),
  })
  .strict()

export const CommandCreateManyArgsSchema: z.ZodType<Prisma.CommandCreateManyArgs> =
  z
    .object({
      data: z.union([
        CommandCreateManyInputSchema,
        CommandCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const CommandAndReturnCreateManyArgsSchema: z.ZodType<Prisma.CommandAndReturnCreateManyArgs> =
  z
    .object({
      data: z.union([
        CommandCreateManyInputSchema,
        CommandCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const CommandDeleteArgsSchema: z.ZodType<Prisma.CommandDeleteArgs> = z
  .object({
    select: CommandSelectSchema.optional(),
    include: CommandIncludeSchema.optional(),
    where: CommandWhereUniqueInputSchema,
  })
  .strict()

export const CommandUpdateArgsSchema: z.ZodType<Prisma.CommandUpdateArgs> = z
  .object({
    select: CommandSelectSchema.optional(),
    include: CommandIncludeSchema.optional(),
    data: z.union([
      CommandUpdateInputSchema,
      CommandUncheckedUpdateInputSchema,
    ]),
    where: CommandWhereUniqueInputSchema,
  })
  .strict()

export const CommandUpdateManyArgsSchema: z.ZodType<Prisma.CommandUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CommandUpdateManyMutationInputSchema,
        CommandUncheckedUpdateManyInputSchema,
      ]),
      where: CommandWhereInputSchema.optional(),
    })
    .strict()

export const CommandDeleteManyArgsSchema: z.ZodType<Prisma.CommandDeleteManyArgs> =
  z
    .object({
      where: CommandWhereInputSchema.optional(),
    })
    .strict()

export const ScriptCreateArgsSchema: z.ZodType<Prisma.ScriptCreateArgs> = z
  .object({
    select: ScriptSelectSchema.optional(),
    include: ScriptIncludeSchema.optional(),
    data: z.union([ScriptCreateInputSchema, ScriptUncheckedCreateInputSchema]),
  })
  .strict()

export const ScriptUpsertArgsSchema: z.ZodType<Prisma.ScriptUpsertArgs> = z
  .object({
    select: ScriptSelectSchema.optional(),
    include: ScriptIncludeSchema.optional(),
    where: ScriptWhereUniqueInputSchema,
    create: z.union([
      ScriptCreateInputSchema,
      ScriptUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ScriptUpdateInputSchema,
      ScriptUncheckedUpdateInputSchema,
    ]),
  })
  .strict()

export const ScriptCreateManyArgsSchema: z.ZodType<Prisma.ScriptCreateManyArgs> =
  z
    .object({
      data: z.union([
        ScriptCreateManyInputSchema,
        ScriptCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ScriptAndReturnCreateManyArgsSchema: z.ZodType<Prisma.ScriptAndReturnCreateManyArgs> =
  z
    .object({
      data: z.union([
        ScriptCreateManyInputSchema,
        ScriptCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ScriptDeleteArgsSchema: z.ZodType<Prisma.ScriptDeleteArgs> = z
  .object({
    select: ScriptSelectSchema.optional(),
    include: ScriptIncludeSchema.optional(),
    where: ScriptWhereUniqueInputSchema,
  })
  .strict()

export const ScriptUpdateArgsSchema: z.ZodType<Prisma.ScriptUpdateArgs> = z
  .object({
    select: ScriptSelectSchema.optional(),
    include: ScriptIncludeSchema.optional(),
    data: z.union([ScriptUpdateInputSchema, ScriptUncheckedUpdateInputSchema]),
    where: ScriptWhereUniqueInputSchema,
  })
  .strict()

export const ScriptUpdateManyArgsSchema: z.ZodType<Prisma.ScriptUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ScriptUpdateManyMutationInputSchema,
        ScriptUncheckedUpdateManyInputSchema,
      ]),
      where: ScriptWhereInputSchema.optional(),
    })
    .strict()

export const ScriptDeleteManyArgsSchema: z.ZodType<Prisma.ScriptDeleteManyArgs> =
  z
    .object({
      where: ScriptWhereInputSchema.optional(),
    })
    .strict()

export const DeviceDataCreateArgsSchema: z.ZodType<Prisma.DeviceDataCreateArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      data: z.union([
        DeviceDataCreateInputSchema,
        DeviceDataUncheckedCreateInputSchema,
      ]),
    })
    .strict()

export const DeviceDataUpsertArgsSchema: z.ZodType<Prisma.DeviceDataUpsertArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      where: DeviceDataWhereUniqueInputSchema,
      create: z.union([
        DeviceDataCreateInputSchema,
        DeviceDataUncheckedCreateInputSchema,
      ]),
      update: z.union([
        DeviceDataUpdateInputSchema,
        DeviceDataUncheckedUpdateInputSchema,
      ]),
    })
    .strict()

export const DeviceDataCreateManyArgsSchema: z.ZodType<Prisma.DeviceDataCreateManyArgs> =
  z
    .object({
      data: z.union([
        DeviceDataCreateManyInputSchema,
        DeviceDataCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const DeviceDataAndReturnCreateManyArgsSchema: z.ZodType<Prisma.DeviceDataAndReturnCreateManyArgs> =
  z
    .object({
      data: z.union([
        DeviceDataCreateManyInputSchema,
        DeviceDataCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const DeviceDataDeleteArgsSchema: z.ZodType<Prisma.DeviceDataDeleteArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      where: DeviceDataWhereUniqueInputSchema,
    })
    .strict()

export const DeviceDataUpdateArgsSchema: z.ZodType<Prisma.DeviceDataUpdateArgs> =
  z
    .object({
      select: DeviceDataSelectSchema.optional(),
      include: DeviceDataIncludeSchema.optional(),
      data: z.union([
        DeviceDataUpdateInputSchema,
        DeviceDataUncheckedUpdateInputSchema,
      ]),
      where: DeviceDataWhereUniqueInputSchema,
    })
    .strict()

export const DeviceDataUpdateManyArgsSchema: z.ZodType<Prisma.DeviceDataUpdateManyArgs> =
  z
    .object({
      data: z.union([
        DeviceDataUpdateManyMutationInputSchema,
        DeviceDataUncheckedUpdateManyInputSchema,
      ]),
      where: DeviceDataWhereInputSchema.optional(),
    })
    .strict()

export const DeviceDataDeleteManyArgsSchema: z.ZodType<Prisma.DeviceDataDeleteManyArgs> =
  z
    .object({
      where: DeviceDataWhereInputSchema.optional(),
    })
    .strict()
