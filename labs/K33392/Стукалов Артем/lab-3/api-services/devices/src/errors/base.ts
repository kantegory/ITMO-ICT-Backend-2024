export class BaseError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = BaseError.name
    this.statusCode = statusCode
    Error.captureStackTrace(this)
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Not found') {
    super(404, message)
    this.name = NotFoundError.name
  }
}
