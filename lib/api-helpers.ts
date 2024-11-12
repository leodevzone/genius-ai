// lib/api-helpers.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkApiLimit } from "./api-limit";
import { checkSubscription } from "./subscription";

export async function checkRequestValidity(req: Request) {
  const { userId } = auth();
  const body = await req.json();
  const { messages } = body; // Asegúrate de que 'messages' contenga el historial completo

  if (!userId) {
    return NextResponse.json("No está autorizado", { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json("Clave de OpenAI no configurada.", { status: 500 });
  }
  if (!messages) {
    return new NextResponse("Se requiere un mensaje", { status: 400 });
  }
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json("Se requiere un historial de mensajes válido.", { status: 400 });
  }

  const freeTrial = await checkApiLimit();
  const isPro = await checkSubscription();

  if (!freeTrial && !isPro) {
    return NextResponse.json("La versión gratis ha finalizado. Por favor actualizar a Pro.", { status: 403 });
  }

  return { userId, messages };
}
