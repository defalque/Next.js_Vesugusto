"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import logo from "@/public/vesugusto.png";
import {
  DocumentDuplicateIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const textareaRef = useRef(null);
  const messageRef = useRef(null);

  const defaultPrompts = [
    { id: 1, message: "Crea una ricetta dolce! 🍪" },
    { id: 2, message: "Crea una ricetta salata! 🧂" },
    { id: 3, message: "Una ricetta fantasiosa 🪄" },
    { id: 4, message: "Ricetta del giorno! 🗓️" },
  ];

  const sendMessage = async (customPrompt) => {
    const messageToSend = customPrompt || input.trim();
    if (!messageToSend || loading) return;

    setDisplay(true);

    const userMessage = { role: "user", content: messageToSend };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
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

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div
      className="grid grid-rows-[minmax(0,1fr)_auto]"
      style={{ height: "calc(100vh - 73px)" }}
    >
      {/* Chat scrollable */}
      <div
        className={`overflow-y-auto overflow-x-hidden min-h-0 px-6 w-full ${
          display ? "" : "flex flex-col items-center"
        }`}
      >
        <div className="text-center py-5">
          <div className="relative inline-block py-1">
            <h1 className="text-5xl font-medium tracking-wide relative z-10">
              creIAmo con{" "}
              <span className="tracking-wider font-medium text-primary-950">
                Vesugusto
              </span>
            </h1>
            <div className="absolute top-0 left-0 h-full w-full bg-white z-20 animate-slideReveal pointer-events-none" />
          </div>
        </div>

        <div
          className={`rounded-full p-2 bg-primary-50 h-max mt-10 ${
            display ? "hidden" : ""
          }`}
        >
          <Image
            src={logo}
            alt="Chat icon"
            height={150}
            width={150}
            className="shadow-md rounded-full"
          />
        </div>

        <div
          className={`grid grid-cols-2 gap-x-4 gap-y-3 max-w-xl font-light mt-auto mb-10 ${
            display ? "hidden" : ""
          }`}
        >
          {defaultPrompts.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => sendMessage(prompt.message)}
              className={`text-lg py-4 px-4 border border-gray-200 rounded-4xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
                prompt.id % 2 == 0
                  ? "animate-moveInFromRight"
                  : "animate-moveInFromLeft"
              }`}
            >
              {prompt.message}
            </button>
          ))}
        </div>

        <div
          className={`max-w-3xl mx-auto gap-4 py-4 font-light ${
            display ? "flex flex-col" : "hidden"
          }`}
        >
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                ref={messageRef}
                className={`px-4 py-2 rounded-xl whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary-950 text-white"
                    : "text-gray-800"
                }`}
              >
                {msg.role === "ai" ? (
                  <div className="flex items-start gap-4">
                    <Image
                      src={logo}
                      alt="Vesugusto logo"
                      height={50}
                      width={50}
                      className="mt-1"
                    />
                    <div className="mt-2 pb-1 flex flex-col gap-y-1.5">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          className="rounded-full p-1.5 hover:bg-zinc-50 cursor-pointer self-start"
                          title="Copia"
                        >
                          <DocumentDuplicateIcon className="size-5"></DocumentDuplicateIcon>
                        </button>
                        {msg.content.includes("ricetta") && (
                          <button className="text-sm rounded-4xl py-1 px-2 bg-primary-950 text-primary-50 cursor-pointer hover:bg-primary-800 font-medium">
                            Salva ricetta!
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-4">
              <Image
                src={logo}
                alt="Vesugusto logo"
                height={50}
                width={50}
                className=""
              />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-950 rounded-full animate-bounce-dot transition dot-delay-1"></div>
                <div className="w-2 h-2 bg-primary-950 rounded-full animate-bounce-dot transition dot-delay-2"></div>
                <div className="w-2 h-2 bg-primary-950 rounded-full animate-bounce-dot transition dot-delay-3"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-transparent pb-10">
        <div className="max-w-3xl mx-auto flex flex-col animate-reveal">
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
