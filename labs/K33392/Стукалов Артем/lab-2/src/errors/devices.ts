import { NotFoundError } from 'errors/base'

export class DeviceNotFound extends NotFoundError {
  constructor() {
    super('Device not found')
    this.name = DeviceNotFound.name
  }
}
