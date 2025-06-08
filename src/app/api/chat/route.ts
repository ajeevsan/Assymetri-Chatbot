// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log('prompt_Data___', prompt)

  const systemPrompt = `
You are an expert frontend engineer. When given a prompt, respond with a complete HTML + CSS code for a landing page in a single HTML file. Do not include JavaScript unless asked. Focus on responsiveness, layout, and clean structure.
Ensure:
- No external CSS files
- Use embedded <style> tag
- Page must be minimal, modern, and responsive
- Avoid external font links
Return only code.
`;


  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  const response = chatCompletion.choices[0].message.content;
  return NextResponse.json({ response });
}
