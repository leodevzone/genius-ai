import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Inicializar el cliente de OpenAI con la configuración correcta
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = "1", resolution = "1024x1024" } = body;

    if (!userId) {
      return new NextResponse("No está autorizado", { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("Clave de OpenAI no está configurada.", { 
        status: 500 
      });
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
      return new NextResponse(
        "La versión gratis ha finalizado. Por favor actualice a Pro.", 
        { status: 403 }
      );
    }

    // Llamada correcta a la API de OpenAI para generar imágenes
    const response = await openai.images.generate({
      model: "dall-e-3", // o "dall-e-2" dependiendo de tus necesidades
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution as "1024x1024" | "1024x1792" | "1792x1024", // dall-e-3 sizes
      quality: "standard", // "standard" o "hd" para dall-e-3
      style: "natural", // "natural" o "vivid" para dall-e-3
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    // La respuesta ahora incluye las URLs de las imágenes generadas
    const imageUrls = response.data.map((image) => image.url);

    return NextResponse.json({ imageUrls });
    
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Error interno", { status: 500 });
  }
}