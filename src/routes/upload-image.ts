import { FastifyInstance } from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { firebaseApp } from '../lib/firebase'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { prisma } from '../lib/prisma'

export async function uploadImageRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb
    },
  })

  app.post('/upload', async (request, reply) => {
    const data = await request.file()

    if (!data) {
      return reply.status(400).send({ error: 'Missing file input.' })
    }

    const extension = path.extname(data.filename)

    const allowedExtensions = ['.png', '.jpg', '.jpeg']

    if (!allowedExtensions.includes(extension)) {
      return reply
        .status(400)
        .send({ error: 'Invalid input type, please upload a PNG/JPG/JPEG.' })
    }

    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    const storage = getStorage(firebaseApp)
    const uploadDestination = ref(storage, `images/${fileUploadName}`)

    const buffer = await data.toBuffer()
    await uploadBytes(uploadDestination, buffer)

    const fileUrl = await getDownloadURL(uploadDestination)

    const image = await prisma.image.create({
      data: {
        name: data.filename,
        path: fileUrl,
      },
    })

    return {
      image,
    }
  })
}
