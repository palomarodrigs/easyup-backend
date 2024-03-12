import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { transcriptionImage } from '../utils/transcription'

export async function createTranscriptionRoute(app: FastifyInstance) {
  const paramsSchema = z.object({
    imageId: z.string().uuid(),
  })

  app.post('/upload/:imageId/transcription', async (request, reply) => {
    const { imageId } = paramsSchema.parse(request.params)

    const image = await prisma.image.findFirstOrThrow({
      where: {
        id: imageId,
      },
    })

    const imagePath = image.path
    const response = await transcriptionImage(imagePath)
    const transcription = response

    await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        transcription,
      },
    })

    return {
      transcription,
    }
  })
}
