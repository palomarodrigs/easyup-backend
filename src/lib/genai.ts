import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY as string)
