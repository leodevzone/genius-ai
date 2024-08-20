import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import   OpenAIApi  from "openai"; // Asegúrate de importar correctamente

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";



const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
}); // Inicializa OpenAIApi con la configuración

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("No está autorizado", { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("Clave de OpenAI no está configurada.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Se requiere un mensaje", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("La cantidad es requerida.", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("La resolución es requerida.", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("La versión gratis ha finalizado. Por favor actualice a Pro.", { status: 403 });
    }

    // Llamada asíncrona para crear la imagen
    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    // Extrae los datos de la respuesta correctamente
    const responseData = response.data;

    return NextResponse.json(responseData);
	
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
