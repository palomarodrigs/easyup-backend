import { fastify } from 'fastify'
import { uploadImageRoute } from './routes/upload-image'

const app = fastify()

app.register(uploadImageRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
