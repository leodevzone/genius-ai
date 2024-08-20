import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import OpenAIApi from 'openai';

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});



export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("No esta autorizado", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("Clave de OpenAI no esta configurado.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Se requiere un mensaje", { status: 400 });
    }
    if (!amount)
      return new NextResponse("La cantidad es requerida.", { status: 400 });

    if (!resolution)
      return new NextResponse("La resolución es requerida.", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("La versión gratis ha finalizado. Por favor actualizar a Pro.", { status: 403 });
    }
    const response = await openai.images.create({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

   if (!isPro) {
      await increaseApiLimit();
    }

    const responseData = response.data || response;

    return NextResponse.json(responseData);
	
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
