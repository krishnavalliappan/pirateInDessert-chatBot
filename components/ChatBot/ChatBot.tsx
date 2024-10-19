import React, { useState, useRef, useEffect } from "react";
import { BotMessage } from "./BotMessage";
import { UserMessage } from "./UserMessage";
import PredefinedQuestions from "./PredefinedQuestions";
import { ChatInput } from "./ChatInput";
import { useBotChat } from "@/hooks/useBotChat";

interface Message {
  role: "bot" | "user";
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Ahoy! What would ye like to know about this seafarin' developer?",
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
    <div className="bg-background rounded-lg shadow-lg flex flex-col h-[600px] max-w-2xl w-full mx-auto overflow-hidden border border-border">
      <div className="bg-primary text-primary-foreground p-4 font-bold text-lg flex justify-between items-center">
        <span>Chat with Pirate Dev</span>
        {inputEnabled && (
          <button
            onClick={handleReset}
            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-accent transition duration-300"
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) =>
          msg.role === "bot" ? (
            <BotMessage key={index} content={msg.content} />
          ) : (
            <UserMessage key={index} content={msg.content} />
          ),
        )}
        {isLoading && (
          <div className="text-center">Thinkin&apos; like a pirate...</div>
        )}
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
