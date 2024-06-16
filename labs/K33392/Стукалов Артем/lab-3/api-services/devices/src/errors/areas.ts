import { NotFoundError } from '@repo/shared/errors'

export class AreaNotFound extends NotFoundError {
  constructor() {
    super('Area not found')
    this.name = AreaNotFound.name
  }
}
