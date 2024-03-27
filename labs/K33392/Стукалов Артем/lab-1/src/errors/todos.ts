import { NotFoundError } from 'errors/base'

export class TodoNotFound extends NotFoundError {
  constructor() {
    super('Todo not found')
    this.name = TodoNotFound.name
  }
}
