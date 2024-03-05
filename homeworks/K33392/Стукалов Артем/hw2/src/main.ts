import fastify from 'fastify'
import { a_fn } from './a/a'
import { b_fn } from './b/b'

const app = fastify({ logger: true })

app.get('/ping', async (req) => {
  const res = `Response!: ${a_fn()} ${b_fn()}`
  return res
})

app.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('🚀 Server ready at: http://localhost:3000')
})
