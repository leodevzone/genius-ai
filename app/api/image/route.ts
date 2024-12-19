import { auth } from "@clerk/nextjs/server";
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
    const { userId } = await auth();
    const body = await req.json();
    const { prompt, amount = "1", resolution = "1024x1024", quality="standard", style="natural"} = body;
    console.log('[body]', body);
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
      model: "dall-e-2", // o "dall-e-3" es necesario reemplazar parametros dependiendo de tus necesidades
      prompt: prompt,
      n: parseInt(amount, 5),
      size: resolution as "256x256"| "512x512"| "1024x1024", // dall-e-3 sizes
      // quality: quality as "standard" | "hd", // "standard" o "hd" para dall-e-3
      // style: style as "natural" |  "vivid", // "natural" o "vivid" para dall-e-3
    });
    console.log('[response]', response);
    //controlar esta parte, solo para las pruebas por los tiempos se comento
   // if (!isPro) {
   //   await increaseApiLimit();
   // }
   //
    // La respuesta ahora incluye las URLs de las imágenes generadas
    //dalle -3
    //const imageUrls = response.data.map((image) => image.url);
//dalle 2
    const imageUrls =response.data.map(item => item.url);
    return NextResponse.json({ imageUrls });
    
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Error interno", { status: 500 });
  }
}