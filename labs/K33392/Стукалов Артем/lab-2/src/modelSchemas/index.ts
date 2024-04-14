import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','passHash','passSalt','createdAt','isActive','isAdmin']);

export const DeviceScalarFieldEnumSchema = z.enum(['id','name','description','isConnected','uuid','type','userId','areaId']);

export const AreaScalarFieldEnumSchema = z.enum(['id','name','description','type','userId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const DeviceTypeSchema = z.enum(['Temperature','Relay']);

export type DeviceTypeType = `${z.infer<typeof DeviceTypeSchema>}`

export const AreaTypeSchema = z.enum(['Room']);

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
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  devices: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  areas: z.union([z.boolean(),z.lazy(() => AreaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  devices: z.boolean().optional(),
  areas: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  passHash: z.boolean().optional(),
  passSalt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  devices: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  areas: z.union([z.boolean(),z.lazy(() => AreaFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEVICE
//------------------------------------------------------

export const DeviceIncludeSchema: z.ZodType<Prisma.DeviceInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  area: z.union([z.boolean(),z.lazy(() => AreaArgsSchema)]).optional(),
}).strict()

export const DeviceArgsSchema: z.ZodType<Prisma.DeviceDefaultArgs> = z.object({
  select: z.lazy(() => DeviceSelectSchema).optional(),
  include: z.lazy(() => DeviceIncludeSchema).optional(),
}).strict();

export const DeviceSelectSchema: z.ZodType<Prisma.DeviceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  isConnected: z.boolean().optional(),
  uuid: z.boolean().optional(),
  type: z.boolean().optional(),
  userId: z.boolean().optional(),
  areaId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  area: z.union([z.boolean(),z.lazy(() => AreaArgsSchema)]).optional(),
}).strict()

// AREA
//------------------------------------------------------

export const AreaIncludeSchema: z.ZodType<Prisma.AreaInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Device: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AreaCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AreaArgsSchema: z.ZodType<Prisma.AreaDefaultArgs> = z.object({
  select: z.lazy(() => AreaSelectSchema).optional(),
  include: z.lazy(() => AreaIncludeSchema).optional(),
}).strict();

export const AreaCountOutputTypeArgsSchema: z.ZodType<Prisma.AreaCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AreaCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AreaCountOutputTypeSelectSchema: z.ZodType<Prisma.AreaCountOutputTypeSelect> = z.object({
  Device: z.boolean().optional(),
}).strict();

export const AreaSelectSchema: z.ZodType<Prisma.AreaSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  type: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Device: z.union([z.boolean(),z.lazy(() => DeviceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AreaCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passSalt: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
  areas: z.lazy(() => AreaListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passHash: z.lazy(() => SortOrderSchema).optional(),
  passSalt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  devices: z.lazy(() => DeviceOrderByRelationAggregateInputSchema).optional(),
  areas: z.lazy(() => AreaOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  passHash: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  passSalt: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  devices: z.lazy(() => DeviceListRelationFilterSchema).optional(),
  areas: z.lazy(() => AreaListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
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
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  passSalt: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isAdmin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const DeviceWhereInputSchema: z.ZodType<Prisma.DeviceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isConnected: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  uuid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDeviceTypeFilterSchema),z.lazy(() => DeviceTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  area: z.union([ z.lazy(() => AreaNullableRelationFilterSchema),z.lazy(() => AreaWhereInputSchema) ]).optional().nullable(),
}).strict();

export const DeviceOrderByWithRelationInputSchema: z.ZodType<Prisma.DeviceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  isConnected: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  areaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  area: z.lazy(() => AreaOrderByWithRelationInputSchema).optional()
}).strict();

export const DeviceWhereUniqueInputSchema: z.ZodType<Prisma.DeviceWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    uuid: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    uuid: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  uuid: z.string().optional(),
  AND: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceWhereInputSchema),z.lazy(() => DeviceWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isConnected: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumDeviceTypeFilterSchema),z.lazy(() => DeviceTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  area: z.union([ z.lazy(() => AreaNullableRelationFilterSchema),z.lazy(() => AreaWhereInputSchema) ]).optional().nullable(),
}).strict());

export const DeviceOrderByWithAggregationInputSchema: z.ZodType<Prisma.DeviceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  isConnected: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  areaId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => DeviceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DeviceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DeviceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DeviceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DeviceSumOrderByAggregateInputSchema).optional()
}).strict();

export const DeviceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DeviceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema),z.lazy(() => DeviceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isConnected: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  uuid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDeviceTypeWithAggregatesFilterSchema),z.lazy(() => DeviceTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const AreaWhereInputSchema: z.ZodType<Prisma.AreaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumAreaTypeFilterSchema),z.lazy(() => AreaTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Device: z.lazy(() => DeviceListRelationFilterSchema).optional()
}).strict();

export const AreaOrderByWithRelationInputSchema: z.ZodType<Prisma.AreaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Device: z.lazy(() => DeviceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AreaWhereUniqueInputSchema: z.ZodType<Prisma.AreaWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaWhereInputSchema),z.lazy(() => AreaWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumAreaTypeFilterSchema),z.lazy(() => AreaTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  Device: z.lazy(() => DeviceListRelationFilterSchema).optional()
}).strict());

export const AreaOrderByWithAggregationInputSchema: z.ZodType<Prisma.AreaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AreaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AreaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AreaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AreaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AreaSumOrderByAggregateInputSchema).optional()
}).strict();

export const AreaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AreaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AreaScalarWhereWithAggregatesInputSchema),z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaScalarWhereWithAggregatesInputSchema),z.lazy(() => AreaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumAreaTypeWithAggregatesFilterSchema),z.lazy(() => AreaTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  devices: z.lazy(() => DeviceCreateNestedManyWithoutUserInputSchema).optional(),
  areas: z.lazy(() => AreaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  devices: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  areas: z.lazy(() => AreaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema).optional(),
  areas: z.lazy(() => AreaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  areas: z.lazy(() => AreaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceCreateInputSchema: z.ZodType<Prisma.DeviceCreateInput> = z.object({
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutDevicesInputSchema).optional(),
  area: z.lazy(() => AreaCreateNestedOneWithoutDeviceInputSchema).optional()
}).strict();

export const DeviceUncheckedCreateInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  userId: z.number().int().optional().nullable(),
  areaId: z.number().int().optional().nullable()
}).strict();

export const DeviceUpdateInputSchema: z.ZodType<Prisma.DeviceUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutDeviceNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DeviceCreateManyInputSchema: z.ZodType<Prisma.DeviceCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  userId: z.number().int().optional().nullable(),
  areaId: z.number().int().optional().nullable()
}).strict();

export const DeviceUpdateManyMutationInputSchema: z.ZodType<Prisma.DeviceUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AreaCreateInputSchema: z.ZodType<Prisma.AreaCreateInput> = z.object({
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAreasInputSchema),
  Device: z.lazy(() => DeviceCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaUncheckedCreateInputSchema: z.ZodType<Prisma.AreaUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema),
  userId: z.number().int(),
  Device: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaUpdateInputSchema: z.ZodType<Prisma.AreaUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAreasNestedInputSchema).optional(),
  Device: z.lazy(() => DeviceUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Device: z.lazy(() => DeviceUncheckedUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaCreateManyInputSchema: z.ZodType<Prisma.AreaCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema),
  userId: z.number().int()
}).strict();

export const AreaUpdateManyMutationInputSchema: z.ZodType<Prisma.AreaUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AreaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DeviceListRelationFilterSchema: z.ZodType<Prisma.DeviceListRelationFilter> = z.object({
  every: z.lazy(() => DeviceWhereInputSchema).optional(),
  some: z.lazy(() => DeviceWhereInputSchema).optional(),
  none: z.lazy(() => DeviceWhereInputSchema).optional()
}).strict();

export const AreaListRelationFilterSchema: z.ZodType<Prisma.AreaListRelationFilter> = z.object({
  every: z.lazy(() => AreaWhereInputSchema).optional(),
  some: z.lazy(() => AreaWhereInputSchema).optional(),
  none: z.lazy(() => AreaWhereInputSchema).optional()
}).strict();

export const DeviceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DeviceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AreaOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passHash: z.lazy(() => SortOrderSchema).optional(),
  passSalt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passHash: z.lazy(() => SortOrderSchema).optional(),
  passSalt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  passHash: z.lazy(() => SortOrderSchema).optional(),
  passSalt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumDeviceTypeFilterSchema: z.ZodType<Prisma.EnumDeviceTypeFilter> = z.object({
  equals: z.lazy(() => DeviceTypeSchema).optional(),
  in: z.lazy(() => DeviceTypeSchema).array().optional(),
  notIn: z.lazy(() => DeviceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => NestedEnumDeviceTypeFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const AreaNullableRelationFilterSchema: z.ZodType<Prisma.AreaNullableRelationFilter> = z.object({
  is: z.lazy(() => AreaWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AreaWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DeviceCountOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  isConnected: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  isConnected: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceMinOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  isConnected: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeviceSumOrderByAggregateInputSchema: z.ZodType<Prisma.DeviceSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  areaId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDeviceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDeviceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DeviceTypeSchema).optional(),
  in: z.lazy(() => DeviceTypeSchema).array().optional(),
  notIn: z.lazy(() => DeviceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => NestedEnumDeviceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumAreaTypeFilterSchema: z.ZodType<Prisma.EnumAreaTypeFilter> = z.object({
  equals: z.lazy(() => AreaTypeSchema).optional(),
  in: z.lazy(() => AreaTypeSchema).array().optional(),
  notIn: z.lazy(() => AreaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => NestedEnumAreaTypeFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AreaCountOrderByAggregateInputSchema: z.ZodType<Prisma.AreaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AreaAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AreaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaMinOrderByAggregateInputSchema: z.ZodType<Prisma.AreaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AreaSumOrderByAggregateInputSchema: z.ZodType<Prisma.AreaSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAreaTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAreaTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AreaTypeSchema).optional(),
  in: z.lazy(() => AreaTypeSchema).array().optional(),
  notIn: z.lazy(() => AreaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => NestedEnumAreaTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional()
}).strict();

export const DeviceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AreaCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AreaCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutUserInputSchema),z.lazy(() => AreaCreateWithoutUserInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AreaUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutUserInputSchema),z.lazy(() => AreaCreateWithoutUserInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DeviceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AreaUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AreaUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutUserInputSchema),z.lazy(() => AreaCreateWithoutUserInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceCreateWithoutUserInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AreaUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutUserInputSchema),z.lazy(() => AreaCreateWithoutUserInputSchema).array(),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema),z.lazy(() => AreaCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AreaUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AreaCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AreaWhereUniqueInputSchema),z.lazy(() => AreaWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AreaUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AreaUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDevicesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AreaCreateNestedOneWithoutDeviceInputSchema: z.ZodType<Prisma.AreaCreateNestedOneWithoutDeviceInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutDeviceInputSchema),z.lazy(() => AreaUncheckedCreateWithoutDeviceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AreaCreateOrConnectWithoutDeviceInputSchema).optional(),
  connect: z.lazy(() => AreaWhereUniqueInputSchema).optional()
}).strict();

export const EnumDeviceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDeviceTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DeviceTypeSchema).optional()
}).strict();

export const UserUpdateOneWithoutDevicesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutDevicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDevicesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDevicesInputSchema),z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]).optional(),
}).strict();

export const AreaUpdateOneWithoutDeviceNestedInputSchema: z.ZodType<Prisma.AreaUpdateOneWithoutDeviceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AreaCreateWithoutDeviceInputSchema),z.lazy(() => AreaUncheckedCreateWithoutDeviceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AreaCreateOrConnectWithoutDeviceInputSchema).optional(),
  upsert: z.lazy(() => AreaUpsertWithoutDeviceInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AreaWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AreaWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AreaWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AreaUpdateToOneWithWhereWithoutDeviceInputSchema),z.lazy(() => AreaUpdateWithoutDeviceInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutDeviceInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserCreateNestedOneWithoutAreasInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAreasInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAreasInputSchema),z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAreasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DeviceCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.DeviceCreateNestedManyWithoutAreaInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutAreaInputSchema),z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyAreaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedCreateNestedManyWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateNestedManyWithoutAreaInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutAreaInputSchema),z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyAreaInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumAreaTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAreaTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AreaTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAreasNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAreasNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAreasInputSchema),z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAreasInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAreasInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAreasInputSchema),z.lazy(() => UserUpdateWithoutAreasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAreasInputSchema) ]).optional(),
}).strict();

export const DeviceUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithoutAreaNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutAreaInputSchema),z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyAreaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DeviceUncheckedUpdateManyWithoutAreaNestedInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutAreaNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeviceCreateWithoutAreaInputSchema),z.lazy(() => DeviceCreateWithoutAreaInputSchema).array(),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema),z.lazy(() => DeviceCreateOrConnectWithoutAreaInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => DeviceUpsertWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DeviceCreateManyAreaInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeviceWhereUniqueInputSchema),z.lazy(() => DeviceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema),z.lazy(() => DeviceUpdateWithWhereUniqueWithoutAreaInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema),z.lazy(() => DeviceUpdateManyWithWhereWithoutAreaInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumDeviceTypeFilterSchema: z.ZodType<Prisma.NestedEnumDeviceTypeFilter> = z.object({
  equals: z.lazy(() => DeviceTypeSchema).optional(),
  in: z.lazy(() => DeviceTypeSchema).array().optional(),
  notIn: z.lazy(() => DeviceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => NestedEnumDeviceTypeFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumDeviceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDeviceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DeviceTypeSchema).optional(),
  in: z.lazy(() => DeviceTypeSchema).array().optional(),
  notIn: z.lazy(() => DeviceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => NestedEnumDeviceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDeviceTypeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumAreaTypeFilterSchema: z.ZodType<Prisma.NestedEnumAreaTypeFilter> = z.object({
  equals: z.lazy(() => AreaTypeSchema).optional(),
  in: z.lazy(() => AreaTypeSchema).array().optional(),
  notIn: z.lazy(() => AreaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => NestedEnumAreaTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAreaTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAreaTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AreaTypeSchema).optional(),
  in: z.lazy(() => AreaTypeSchema).array().optional(),
  notIn: z.lazy(() => AreaTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => NestedEnumAreaTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAreaTypeFilterSchema).optional()
}).strict();

export const DeviceCreateWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateWithoutUserInput> = z.object({
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  area: z.lazy(() => AreaCreateNestedOneWithoutDeviceInputSchema).optional()
}).strict();

export const DeviceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  areaId: z.number().int().optional().nullable()
}).strict();

export const DeviceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DeviceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.DeviceCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DeviceCreateManyUserInputSchema),z.lazy(() => DeviceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AreaCreateWithoutUserInputSchema: z.ZodType<Prisma.AreaCreateWithoutUserInput> = z.object({
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema),
  Device: z.lazy(() => DeviceCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema),
  Device: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutAreaInputSchema).optional()
}).strict();

export const AreaCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AreaCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AreaCreateWithoutUserInputSchema),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AreaCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AreaCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AreaCreateManyUserInputSchema),z.lazy(() => AreaCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DeviceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DeviceUpdateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DeviceCreateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DeviceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateWithoutUserInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const DeviceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => DeviceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateManyMutationInputSchema),z.lazy(() => DeviceUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const DeviceScalarWhereInputSchema: z.ZodType<Prisma.DeviceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeviceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeviceScalarWhereInputSchema),z.lazy(() => DeviceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isConnected: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  uuid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDeviceTypeFilterSchema),z.lazy(() => DeviceTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  areaId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const AreaUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AreaUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AreaUpdateWithoutUserInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AreaCreateWithoutUserInputSchema),z.lazy(() => AreaUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AreaUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AreaUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AreaUpdateWithoutUserInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AreaUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AreaUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AreaScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AreaUpdateManyMutationInputSchema),z.lazy(() => AreaUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AreaScalarWhereInputSchema: z.ZodType<Prisma.AreaScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AreaScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AreaScalarWhereInputSchema),z.lazy(() => AreaScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumAreaTypeFilterSchema),z.lazy(() => AreaTypeSchema) ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateWithoutDevicesInput> = z.object({
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  areas: z.lazy(() => AreaCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDevicesInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  areas: z.lazy(() => AreaUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]),
}).strict();

export const AreaCreateWithoutDeviceInputSchema: z.ZodType<Prisma.AreaCreateWithoutDeviceInput> = z.object({
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutAreasInputSchema)
}).strict();

export const AreaUncheckedCreateWithoutDeviceInputSchema: z.ZodType<Prisma.AreaUncheckedCreateWithoutDeviceInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema),
  userId: z.number().int()
}).strict();

export const AreaCreateOrConnectWithoutDeviceInputSchema: z.ZodType<Prisma.AreaCreateOrConnectWithoutDeviceInput> = z.object({
  where: z.lazy(() => AreaWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AreaCreateWithoutDeviceInputSchema),z.lazy(() => AreaUncheckedCreateWithoutDeviceInputSchema) ]),
}).strict();

export const UserUpsertWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpsertWithoutDevicesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]),
}).strict();

export const UserUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateWithoutDevicesInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDevicesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  areas: z.lazy(() => AreaUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AreaUpsertWithoutDeviceInputSchema: z.ZodType<Prisma.AreaUpsertWithoutDeviceInput> = z.object({
  update: z.union([ z.lazy(() => AreaUpdateWithoutDeviceInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutDeviceInputSchema) ]),
  create: z.union([ z.lazy(() => AreaCreateWithoutDeviceInputSchema),z.lazy(() => AreaUncheckedCreateWithoutDeviceInputSchema) ]),
  where: z.lazy(() => AreaWhereInputSchema).optional()
}).strict();

export const AreaUpdateToOneWithWhereWithoutDeviceInputSchema: z.ZodType<Prisma.AreaUpdateToOneWithWhereWithoutDeviceInput> = z.object({
  where: z.lazy(() => AreaWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AreaUpdateWithoutDeviceInputSchema),z.lazy(() => AreaUncheckedUpdateWithoutDeviceInputSchema) ]),
}).strict();

export const AreaUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.AreaUpdateWithoutDeviceInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAreasNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateWithoutDeviceInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateWithoutDeviceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutAreasInputSchema: z.ZodType<Prisma.UserCreateWithoutAreasInput> = z.object({
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  devices: z.lazy(() => DeviceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAreasInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAreasInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  passHash: z.string(),
  passSalt: z.string(),
  createdAt: z.number().int(),
  isActive: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  devices: z.lazy(() => DeviceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAreasInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAreasInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAreasInputSchema),z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema) ]),
}).strict();

export const DeviceCreateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceCreateWithoutAreaInput> = z.object({
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutDevicesInputSchema).optional()
}).strict();

export const DeviceUncheckedCreateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedCreateWithoutAreaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  userId: z.number().int().optional().nullable()
}).strict();

export const DeviceCreateOrConnectWithoutAreaInputSchema: z.ZodType<Prisma.DeviceCreateOrConnectWithoutAreaInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DeviceCreateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema) ]),
}).strict();

export const DeviceCreateManyAreaInputEnvelopeSchema: z.ZodType<Prisma.DeviceCreateManyAreaInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DeviceCreateManyAreaInputSchema),z.lazy(() => DeviceCreateManyAreaInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutAreasInputSchema: z.ZodType<Prisma.UserUpsertWithoutAreasInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAreasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAreasInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAreasInputSchema),z.lazy(() => UserUncheckedCreateWithoutAreasInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAreasInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAreasInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAreasInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAreasInputSchema) ]),
}).strict();

export const UserUpdateWithoutAreasInputSchema: z.ZodType<Prisma.UserUpdateWithoutAreasInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAreasInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAreasInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passSalt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  devices: z.lazy(() => DeviceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const DeviceUpsertWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpsertWithWhereUniqueWithoutAreaInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DeviceUpdateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutAreaInputSchema) ]),
  create: z.union([ z.lazy(() => DeviceCreateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedCreateWithoutAreaInputSchema) ]),
}).strict();

export const DeviceUpdateWithWhereUniqueWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpdateWithWhereUniqueWithoutAreaInput> = z.object({
  where: z.lazy(() => DeviceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateWithoutAreaInputSchema),z.lazy(() => DeviceUncheckedUpdateWithoutAreaInputSchema) ]),
}).strict();

export const DeviceUpdateManyWithWhereWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpdateManyWithWhereWithoutAreaInput> = z.object({
  where: z.lazy(() => DeviceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DeviceUpdateManyMutationInputSchema),z.lazy(() => DeviceUncheckedUpdateManyWithoutAreaInputSchema) ]),
}).strict();

export const DeviceCreateManyUserInputSchema: z.ZodType<Prisma.DeviceCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  areaId: z.number().int().optional().nullable()
}).strict();

export const AreaCreateManyUserInputSchema: z.ZodType<Prisma.AreaCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  type: z.lazy(() => AreaTypeSchema)
}).strict();

export const DeviceUpdateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  area: z.lazy(() => AreaUpdateOneWithoutDeviceNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DeviceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  areaId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AreaUpdateWithoutUserInputSchema: z.ZodType<Prisma.AreaUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  Device: z.lazy(() => DeviceUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
  Device: z.lazy(() => DeviceUncheckedUpdateManyWithoutAreaNestedInputSchema).optional()
}).strict();

export const AreaUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AreaUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => AreaTypeSchema),z.lazy(() => EnumAreaTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeviceCreateManyAreaInputSchema: z.ZodType<Prisma.DeviceCreateManyAreaInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  isConnected: z.boolean().optional(),
  uuid: z.string(),
  type: z.lazy(() => DeviceTypeSchema),
  userId: z.number().int().optional().nullable()
}).strict();

export const DeviceUpdateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUpdateWithoutAreaInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutDevicesNestedInputSchema).optional()
}).strict();

export const DeviceUncheckedUpdateWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateWithoutAreaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DeviceUncheckedUpdateManyWithoutAreaInputSchema: z.ZodType<Prisma.DeviceUncheckedUpdateManyWithoutAreaInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isConnected: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => DeviceTypeSchema),z.lazy(() => EnumDeviceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const DeviceFindFirstArgsSchema: z.ZodType<Prisma.DeviceFindFirstArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeviceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindFirstOrThrowArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeviceFindManyArgsSchema: z.ZodType<Prisma.DeviceFindManyArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeviceScalarFieldEnumSchema,DeviceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeviceAggregateArgsSchema: z.ZodType<Prisma.DeviceAggregateArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithRelationInputSchema.array(),DeviceOrderByWithRelationInputSchema ]).optional(),
  cursor: DeviceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DeviceGroupByArgsSchema: z.ZodType<Prisma.DeviceGroupByArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
  orderBy: z.union([ DeviceOrderByWithAggregationInputSchema.array(),DeviceOrderByWithAggregationInputSchema ]).optional(),
  by: DeviceScalarFieldEnumSchema.array(),
  having: DeviceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DeviceFindUniqueArgsSchema: z.ZodType<Prisma.DeviceFindUniqueArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const DeviceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DeviceFindUniqueOrThrowArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const AreaFindFirstArgsSchema: z.ZodType<Prisma.AreaFindFirstArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AreaScalarFieldEnumSchema,AreaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AreaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AreaFindFirstOrThrowArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AreaScalarFieldEnumSchema,AreaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AreaFindManyArgsSchema: z.ZodType<Prisma.AreaFindManyArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AreaScalarFieldEnumSchema,AreaScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AreaAggregateArgsSchema: z.ZodType<Prisma.AreaAggregateArgs> = z.object({
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithRelationInputSchema.array(),AreaOrderByWithRelationInputSchema ]).optional(),
  cursor: AreaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AreaGroupByArgsSchema: z.ZodType<Prisma.AreaGroupByArgs> = z.object({
  where: AreaWhereInputSchema.optional(),
  orderBy: z.union([ AreaOrderByWithAggregationInputSchema.array(),AreaOrderByWithAggregationInputSchema ]).optional(),
  by: AreaScalarFieldEnumSchema.array(),
  having: AreaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AreaFindUniqueArgsSchema: z.ZodType<Prisma.AreaFindUniqueArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const AreaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AreaFindUniqueOrThrowArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const DeviceCreateArgsSchema: z.ZodType<Prisma.DeviceCreateArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  data: z.union([ DeviceCreateInputSchema,DeviceUncheckedCreateInputSchema ]),
}).strict() ;

export const DeviceUpsertArgsSchema: z.ZodType<Prisma.DeviceUpsertArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
  create: z.union([ DeviceCreateInputSchema,DeviceUncheckedCreateInputSchema ]),
  update: z.union([ DeviceUpdateInputSchema,DeviceUncheckedUpdateInputSchema ]),
}).strict() ;

export const DeviceCreateManyArgsSchema: z.ZodType<Prisma.DeviceCreateManyArgs> = z.object({
  data: z.union([ DeviceCreateManyInputSchema,DeviceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DeviceDeleteArgsSchema: z.ZodType<Prisma.DeviceDeleteArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const DeviceUpdateArgsSchema: z.ZodType<Prisma.DeviceUpdateArgs> = z.object({
  select: DeviceSelectSchema.optional(),
  include: DeviceIncludeSchema.optional(),
  data: z.union([ DeviceUpdateInputSchema,DeviceUncheckedUpdateInputSchema ]),
  where: DeviceWhereUniqueInputSchema,
}).strict() ;

export const DeviceUpdateManyArgsSchema: z.ZodType<Prisma.DeviceUpdateManyArgs> = z.object({
  data: z.union([ DeviceUpdateManyMutationInputSchema,DeviceUncheckedUpdateManyInputSchema ]),
  where: DeviceWhereInputSchema.optional(),
}).strict() ;

export const DeviceDeleteManyArgsSchema: z.ZodType<Prisma.DeviceDeleteManyArgs> = z.object({
  where: DeviceWhereInputSchema.optional(),
}).strict() ;

export const AreaCreateArgsSchema: z.ZodType<Prisma.AreaCreateArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  data: z.union([ AreaCreateInputSchema,AreaUncheckedCreateInputSchema ]),
}).strict() ;

export const AreaUpsertArgsSchema: z.ZodType<Prisma.AreaUpsertArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
  create: z.union([ AreaCreateInputSchema,AreaUncheckedCreateInputSchema ]),
  update: z.union([ AreaUpdateInputSchema,AreaUncheckedUpdateInputSchema ]),
}).strict() ;

export const AreaCreateManyArgsSchema: z.ZodType<Prisma.AreaCreateManyArgs> = z.object({
  data: z.union([ AreaCreateManyInputSchema,AreaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AreaDeleteArgsSchema: z.ZodType<Prisma.AreaDeleteArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const AreaUpdateArgsSchema: z.ZodType<Prisma.AreaUpdateArgs> = z.object({
  select: AreaSelectSchema.optional(),
  include: AreaIncludeSchema.optional(),
  data: z.union([ AreaUpdateInputSchema,AreaUncheckedUpdateInputSchema ]),
  where: AreaWhereUniqueInputSchema,
}).strict() ;

export const AreaUpdateManyArgsSchema: z.ZodType<Prisma.AreaUpdateManyArgs> = z.object({
  data: z.union([ AreaUpdateManyMutationInputSchema,AreaUncheckedUpdateManyInputSchema ]),
  where: AreaWhereInputSchema.optional(),
}).strict() ;

export const AreaDeleteManyArgsSchema: z.ZodType<Prisma.AreaDeleteManyArgs> = z.object({
  where: AreaWhereInputSchema.optional(),
}).strict() ;