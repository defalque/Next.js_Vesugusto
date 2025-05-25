"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import chatImg from "@/public/nextjs-icon.svg";
import {
  DocumentDuplicateIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMessage = { role: "ai", content: data.reply };
      setChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Errore:", error);
      setChat((prev) => [
        ...prev,
        { role: "ai", content: "Errore nella risposta." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  return (
    <div
      className="grid grid-rows-[minmax(0,1fr)_auto]"
      style={{ height: "calc(100vh - 73px)" }}
    >
      {/* Header */}

      {/* Chat scrollable */}
      <div className="overflow-y-auto overflow-x-hidden min-h-0 px-6 w-full">
        <div className="text-center py-5">
          <div className="relative inline-block py-1">
            <h1 className="text-5xl font-medium tracking-wide relative z-10">
              Chatta con Vesugusto
            </h1>
            <div className="absolute top-0 left-0 h-full w-full bg-white z-20 animate-slideReveal pointer-events-none" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-4 py-4 font-light">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary-950 text-white"
                    : "text-gray-800"
                }`}
              >
                {msg.role === "ai" ? (
                  <div className="flex items-start gap-4">
                    <Image
                      src={chatImg}
                      alt="Chat icon"
                      height={30}
                      width={30}
                      className="mt-1"
                    />
                    <div className="mt-2 pb-1 flex flex-col gap-3">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                      <button
                        className="rounded-full p-1.5 hover:bg-zinc-100 cursor-pointer self-start"
                        title="Copia"
                      >
                        <DocumentDuplicateIcon className="size-5"></DocumentDuplicateIcon>
                      </button>
                    </div>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-4 px-4 py-2">
              <Image
                src={chatImg}
                alt="Chat icon"
                height={30}
                width={30}
                className="mt-1 animate-spin"
              />
              <div className="text-primary-dark-900 text-md">
                Vesugusto sta pensando...
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-transparent pb-10">
        <div className="max-w-3xl mx-auto flex flex-col">
          <textarea
            className="w-full px-5 pt-2 border-t border-r border-l bg-white border-gray-300 rounded-tl-2xl rounded-tr-2xl resize-none outline-primary-950 leading-tight font-light outline-none overflow-y-auto"
            style={{
              minHeight: "40px",
              maxHeight: "150px",
            }}
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Chiedi a Vesugusto..."
            disabled={loading}
          />

          <div className="flex items-center justify-end py-2 rounded-br-2xl rounded-bl-2xl border-r border-l border-t-0 border-b bg-white border-gray-300">
            <button
              className="rounded-full mr-2 bg-primary-950 hover:bg-primary-800 transition-colors duration-200 px-1 py-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={sendMessage}
              disabled={loading}
            >
              <ArrowUpIcon className="size-6 text-primary-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
