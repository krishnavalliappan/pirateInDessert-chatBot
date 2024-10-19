import { useState } from "react";

interface UseBotChatResult {
  sendMessage: (message: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export const useBotChat = (): UseBotChatResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from bot");
      }

      const data = await response.json();
      return data.response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      return "Arrr, I be havin' trouble respondin'. Try again, matey!";
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};
