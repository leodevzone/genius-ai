"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/loader";
import { Heading } from "@/components/heading";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
// import { MessageDisplay } from "@/components/ui/messagedisplay";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { conversationFormSchema } from "@/schemas";
import { MessagesList } from '@/components/ui/MessagesList';

// Define el tipo de mensaje con historial de conversación
type ChatCompletionRequestMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof conversationFormSchema>>({
    resolver: zodResolver(conversationFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof conversationFormSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };


      // Agrega el mensaje del usuario al historial
      const updatedMessages = [...messages, userMessage];

      // Envía el historial de mensajes a la API
      const response = await axios.post("/api/conversation", {
        messages: updatedMessages,
      });

      // Actualiza el historial de mensajes con la respuesta del asistente
      setMessages([...updatedMessages, response.data]);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Ocurrió un error.");
        console.error(error);
      }
    } finally {
      form.reset();
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversación"
        description="Nuestro modelo de conversación avanzado."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
  
        <MessagesList messages={messages} isLoadingAnswer={isLoading} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Escribe tu mensaje aquí..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Consultar
            </Button>
          </form>
        </Form>
 
      </div>
    </div>
  );
};


export default ConversationPage;
