import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

import OpenAI from 'openai';

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { checkRequestValidity } from "@/lib/api-helpers";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const validationResult = await checkRequestValidity(req);

    if (validationResult instanceof NextResponse) {
      // Retorna la respuesta de error si hay un fallo en la validación
      return validationResult;
    }
      const { userId, messages } = validationResult;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    const isPro = await checkSubscription();

    if (!isPro) {
      await increaseApiLimit();
    }
    console.log('[CONVERSATION]', response);
     // Devuelve solo el mensaje de respuesta del asistente
     const assistantMessage = response.choices[0].message;
     return NextResponse.json(assistantMessage);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}

