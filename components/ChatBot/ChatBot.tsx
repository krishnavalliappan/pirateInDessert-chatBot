import React, { useState, useRef, useEffect } from "react";
import { BotMessage } from "./BotMessage";
import { UserMessage } from "./UserMessage";
import PredefinedQuestions from "./PredefinedQuestions";
import { ChatInput } from "./ChatInput";
import { useBotChat } from "@/hooks/useBotChat";
import DOMPurify from "dompurify";
// import { FaComments } from "react-icons/fa";
import Image from "next/image";

interface Message {
  role: "bot" | "user";
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Ahoy! What would you like to know about this tech-savvy developer?",
    },
  ]);
  const [inputEnabled, setInputEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isLoading, error } = useBotChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleQuestionClick = async (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      { role: "bot", content: answer },
    ]);
    setInputEnabled(true);
  };

  const handleSubmit = async (inputValue: string) => {
    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);

    const botResponse = await sendMessage(inputValue);
    setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
  };

  const handleReset = () => {
    setMessages([
      {
        role: "bot",
        content:
          "Ahoy! What would ye like to know about this seafarin' developer?",
      },
    ]);
    setInputEnabled(false);
  };

  return (
    <div className="bg-background rounded-lg shadow-lg flex flex-col h-[550px] w-full max-w-4xl mx-auto overflow-hidden border border-border">
      <div className="bg-primary text-primary-foreground p-3 font-bold text-base flex justify-between items-center">
        <div className="flex items-center justify-center mb-2">
          <h2 className="text-lg sm:text-xl font-bold">
            Chat with the Desert Pirate Bot
          </h2>
          <Image
            src="/pirate_parrot.png"
            alt="Pirate Parrot"
            width={48}
            height={48}
            className="mr-2"
          />
        </div>
        {inputEnabled && (
          <button
            onClick={handleReset}
            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs hover:bg-accent transition duration-300"
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) =>
          msg.role === "bot" ? (
            <BotMessage key={index} content={DOMPurify.sanitize(msg.content)} />
          ) : (
            <UserMessage key={index} content={msg.content} />
          ),
        )}
        {isLoading && <div className="text-center">Thinking...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      {!inputEnabled ? (
        <div className="p-4 bg-muted">
          <PredefinedQuestions
            onQuestionClick={handleQuestionClick}
            onChatMoreClick={() => setInputEnabled(true)}
          />
        </div>
      ) : (
        <div className="border-t border-border p-4">
          <ChatInput onSubmit={handleSubmit} disabled={isLoading} />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
