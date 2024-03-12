import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const genAI = new GoogleGenerativeAI(process.env.API_KEY as string)
