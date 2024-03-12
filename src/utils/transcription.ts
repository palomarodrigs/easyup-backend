import { genAI } from '../lib/genai'

export async function transcriptionImage(imagePath) {
  const imageResponse = await fetch(imagePath)
  const imageBuffer = await imageResponse.arrayBuffer()

  const prompt = 'Transcribe text in image accurately, preserving original formatting.'
  const imagePart = {
    inlineData: {
      data: Buffer.from(imageBuffer).toString('base64'),
      mimeType: 'image/png',
    },
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

  const result = await model.generateContent([prompt, imagePart])
  const response = await result.response
  const transcription = response.text()

  return transcription
}
