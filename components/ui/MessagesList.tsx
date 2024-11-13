import { MessageDisplay } from './MessageDisplay';
import { UserAvatar  } from '@/components/user-avatar';
import { BotAvatar }  from '@/components/bot-avatar';
import { Empty } from "./empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
// Define el tipo de mensaje con historial de conversación 
type ChatCompletionRequestMessage = { role: "system" | "user" | "assistant"; content: string; }; 
// Define las propiedades del componente MessagesList 
interface MessagesListProps { messages: ChatCompletionRequestMessage[]; isLoadingAnswer: boolean; }

const MessagesList: React.FC<MessagesListProps> = ({ messages, isLoadingAnswer }) => {
  return (
    <div className="chat-container max-w-3xl mx-auto pt-8 pb-[150px]">
      {isLoadingAnswer && (
        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
          <Loader />
        </div>
      )}
      {messages.length === 0 && !isLoadingAnswer && (
        <Empty label="No se ha iniciado una conversación." />
      )}
      {messages?.map((message, i) => {
        const isUser = message.role === 'user';

        if (message.role === 'system') return null;

        return (
          <div
            id={`message-${i}`}
            className={`message flex mb-4 fade-up ${isUser ? 'justify-end' : 'justify-start'} ${i === 1 ? 'max-w-md' : ''}`}
            key={message.content}
          >
            {!isUser && (
            //   <img
            //     src="https://www.teamsmart.ai/next-assets/team/ai.jpg"
            //     className="w-9 h-9 rounded-full"
            //     alt="avatar"
            //   />
            <BotAvatar />
            )}
            <div
              style={{ maxWidth: 'calc(100% - 45px)' }}
              className={`group relative px-3 py-2 rounded-lg ${isUser ? 'mr-2 bg-gradient-to-br from-primary-700 to-primary-600 text-white' : 'ml-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
            >
              <MessageDisplay messageContent={message.content.trim()} />
            </div>
            {isUser && (
                <UserAvatar /> 
            //   <img
            //     src="https://www.teamsmart.ai/next-assets/profile-image.png"
            //     className="w-9 h-9 rounded-full cursor-pointer"
            //     alt="avatar"
            //   />
            )}
          </div>
        );
      })}
    </div>
  );
};
export { MessagesList }; 

