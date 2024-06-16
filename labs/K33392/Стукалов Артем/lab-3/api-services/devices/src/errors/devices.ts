import { NotFoundError } from '@repo/shared/errors'

export class DeviceNotFound extends NotFoundError {
  constructor() {
    super('Device not found')
    this.name = DeviceNotFound.name
  }
}
