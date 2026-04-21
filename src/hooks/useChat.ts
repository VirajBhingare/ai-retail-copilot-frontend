import { useState, useRef, useEffect } from "react";
import type { Message } from "../types";
import { env } from "../config/env";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        'Hello! I am your Retail Copilot. I can monitor stock levels, check competitor pricing, and help you manage your catalog.\n\n**Try asking:**\n- "How is our stock looking for electronics?"\n- "Are there any items we should reorder?"',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const response = await fetch(`${env.VITE_API_BASE_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });

      const data = await response.json();
      const aiPayload = data?.data;

      if (!response.ok || !aiPayload?.response) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data?.message || "Sorry, I encountered an error.",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiPayload.response,
          tool_used: Boolean(aiPayload.tool_used),
        },
      ]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please ensure your backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, messagesEndRef, sendMessage };
};
