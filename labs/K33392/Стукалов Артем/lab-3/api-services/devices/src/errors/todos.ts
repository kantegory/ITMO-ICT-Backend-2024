import { NotFoundError } from '@repo/shared/errors'

export class TodoNotFound extends NotFoundError {
  constructor() {
    super('Todo not found')
    this.name = TodoNotFound.name
  }
}
