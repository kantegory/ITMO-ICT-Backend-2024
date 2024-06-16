import app from './app'

const start = async () => {
  try {
    await app.listen({ port: 3000 })
    console.log('Server is running at http://localhost:3000')
    console.log(
      'Swagger documentation is available at http://localhost:3000/documentation'
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
