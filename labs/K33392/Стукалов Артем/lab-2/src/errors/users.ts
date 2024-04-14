import { NotFoundError } from 'errors/base'

export class UserNotFound extends NotFoundError {
  constructor() {
    super('User not found')
    this.name = UserNotFound.name
  }
}

export class WrongPassword extends NotFoundError {
  constructor() {
    super('Wrong password')
    this.name = WrongPassword.name
  }
}
