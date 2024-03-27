import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { uploadImageRoute } from './routes/upload-image'
import { createTranscriptionRoute } from './routes/create-transcription'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(uploadImageRoute)
app.register(createTranscriptionRoute)

app
  .listen({
    port: 3333,
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
