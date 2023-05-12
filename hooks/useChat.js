import { useState, useRef, useCallback, useEffect } from "react";
import initialstate from "../utils/initialstate";

export const useChat = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    chatWindowRef.current.scrollTo(0, chatWindowRef.current.scrollHeight);
  }, [messages]);

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    const chatHistory = [...messages, { role: "user", content: value }];
    setMessages(chatHistory);
    setValue("");
    setLoading(true);
    const response = await fetch("/api/openAIChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });
    const data = await response.json();
    setLoading(false);
    setMessages([
      ...chatHistory,
      {
        role: "assistant",
        content: data.result.choices[0].message.content,
      },
    ]);
  });

  const handleRefresh = useCallback(() => {
    inputRef.current?.focus();
    setValue("");
    setMessages(initialstate);
  });

  return {
    handleInput,
    handleFormSubmit,
    handleRefresh,
    chatWindowRef,
    inputRef,
    loading,
    value,
    messages,
  };
};
