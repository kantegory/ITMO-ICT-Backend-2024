import { ServerT } from 'config/server'

export function setupErrorHandler(server: ServerT): void {
  server.setErrorHandler((error, req, res) => {
    if (error.statusCode === undefined) {
      req.log.error(error)
      return res.status(500).send({
        statusCode: 500,
        error: 'Internal server error',
      })
    }

    return res.send(error)
  })
}
