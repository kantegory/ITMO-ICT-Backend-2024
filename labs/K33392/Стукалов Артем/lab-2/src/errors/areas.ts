import { NotFoundError } from 'errors/base'

export class AreaNotFound extends NotFoundError {
  constructor() {
    super('Area not found')
    this.name = AreaNotFound.name
  }
}
