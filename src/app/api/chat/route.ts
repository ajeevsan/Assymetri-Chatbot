// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log('prompt_Data___', prompt)


  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  const response = chatCompletion.choices[0].message.content;
  return NextResponse.json({ response });
}
