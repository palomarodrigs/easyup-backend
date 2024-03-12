import { fastify } from 'fastify'
import { uploadImageRoute } from './routes/upload-image'
import { createTranscriptionRoute } from './routes/create-transcription'

const app = fastify()

app.register(uploadImageRoute)
app.register(createTranscriptionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
