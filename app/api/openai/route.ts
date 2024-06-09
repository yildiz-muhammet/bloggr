import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge'

export async function POST(req: Request, res: Response) {
    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: "You are the chatbot of the Next  blog application. You are here to answer the users' questions and assist them. Users will seek your advice on various topics while writing their posts. Respond to the users with this vision in mind"
            }
            ,
            ...messages
        ],
        stream: true,
        temperature: 1
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}