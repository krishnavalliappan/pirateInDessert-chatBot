import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (inputValue: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({ onSubmit, disabled = false }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        className="flex-1 py-2 px-4 rounded-l-full bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled}
      />
      <Button
        type="submit"
        className="bg-primary hover:bg-primary/90 py-2 px-6 rounded-r-full text-primary-foreground transition duration-300"
        disabled={disabled}
      >
        Send
      </Button>
    </form>
  );
};
