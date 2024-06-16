import { BaseError, NotFoundError } from '@repo/shared/errors'

export class UserNotFound extends NotFoundError {
  constructor() {
    super('User not found')
    this.name = UserNotFound.name
  }
}

export class WrongPassword extends BaseError {
  constructor(message = 'Wrong password') {
    super(401, message)
    this.name = WrongPassword.name
  }
}
