import { fastify } from 'fastify'
import { uploadRoute } from './routes/upload'

const app = fastify()

app.register(uploadRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
