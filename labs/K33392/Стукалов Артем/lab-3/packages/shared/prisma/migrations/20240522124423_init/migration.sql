-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('Temperature', 'Relay');

-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('Room');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "passHash" TEXT NOT NULL,
    "passSalt" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "uuid" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL,
    "userId" INTEGER,
    "areaId" INTEGER,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "AreaType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseCommand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "args" JSONB NOT NULL,

    CONSTRAINT "BaseCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" SERIAL NOT NULL,
    "ts" INTEGER NOT NULL,
    "isExecuted" BOOLEAN NOT NULL DEFAULT false,
    "status" JSONB NOT NULL,
    "params" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "baseCommandId" INTEGER NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "conditionParams" JSONB NOT NULL,
    "commandParams" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "conditionDeviceId" INTEGER,
    "commandDeviceId" INTEGER NOT NULL,
    "baseCommandId" INTEGER NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceData" (
    "id" SERIAL NOT NULL,
    "ts" INTEGER NOT NULL,
    "status" JSONB NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "DeviceData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Device_uuid_key" ON "Device"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "BaseCommand_name_key" ON "BaseCommand"("name");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_baseCommandId_fkey" FOREIGN KEY ("baseCommandId") REFERENCES "BaseCommand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_conditionDeviceId_fkey" FOREIGN KEY ("conditionDeviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_commandDeviceId_fkey" FOREIGN KEY ("commandDeviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_baseCommandId_fkey" FOREIGN KEY ("baseCommandId") REFERENCES "BaseCommand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceData" ADD CONSTRAINT "DeviceData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
