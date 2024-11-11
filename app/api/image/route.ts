import { auth } from "@clerk/nextjs"; 
import { type NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai"; // Importación correcta de OpenAIApi
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Configura el cliente de OpenAI con la API Key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

    // Llamada a la API de OpenAI para generar la imagen
    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    console.log('[response]', response);
    if (!isPro) {
      await increaseApiLimit();
    }
    const imageUrls = (response.data.data as { url: string }[]).map((image) => image.url);
    // Extrae los URLs de las imágenes generadas
    //const imageUrls = response.data.data.map((image) => image.url);

    return NextResponse.json({ imageUrls });
	
  } catch (error) {
    console.error('[IMAGE_ERROR]', error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
