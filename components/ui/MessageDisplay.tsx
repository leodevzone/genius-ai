import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState, useEffect, FC } from "react";

interface MessageDisplayProps {
  messageContent: string;
}

const MessageDisplay: FC<MessageDisplayProps> = ({ messageContent }) => {
  const [cleanHtml, setCleanHtml] = useState<string>("");

  useEffect(() => {
    const processContent = async () => {
      const rawHtml = await marked(messageContent); // Usa await aquí si marked es asincrónico
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setCleanHtml(sanitizedHtml);
    };

    processContent();
  }, [messageContent]);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export { MessageDisplay }; 
