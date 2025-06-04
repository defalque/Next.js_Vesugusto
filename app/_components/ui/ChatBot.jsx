"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import logo from "@/public/vesugusto.png";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { createRecipe } from "@/app/_lib/actions";
import SpinnerSuperMini from "./SpinnerSuperMini";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage({ userId }) {
  const [showBanner, setShowBanner] = useState(true);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const textareaRef = useRef(null);
  const messageRef = useRef(null);
  const [savedIds, setSavedIds] = useState([]);
  const [savingIds, setSavingIds] = useState([]);

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_PROD_URL}/api/chat`, {
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

  const handleSaveRecipe = async (content, id) => {
    setSavingIds((prev) => [...prev, id]);
    try {
      const splitIndex = content.indexOf("\n");
      const title = content.substring(0, splitIndex).replace(/^##\s*/, "");
      const description = content.substring(splitIndex + 2);

      const success = await createRecipe(title, description, userId);

      if (success) {
        setSavedIds((prev) => [...prev, id]);
      }
    } catch (error) {
      console.error("Errore nel salvataggio ricetta:", error);
    } finally {
      setSavingIds((prev) => prev.filter((savingId) => savingId !== id));
    }
  };

  return (
    <div
      className="grid grid-rows-[minmax(0,1fr)_auto] relative"
      style={{
        height: "calc(100vh - 73px)",
      }}
    >
      {!userId && (
        <AnimatePresence>
          {showBanner && (
            <motion.div
              className="absolute top-0 left-0 h-8 md:h-10 w-full z-[100] flex items-center justify-center"
              style={{
                backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(249, 5, 33, 0.5) 0%, transparent 70%),
              radial-gradient(circle at 80% 50%, rgba(248, 6, 179, 0.4) 0%, transparent 70%),
              radial-gradient(circle at 50% 100%, rgba(233, 190, 205, 0.3) 0%, transparent 70%)
            `,
                backdropFilter: "blur(12px)",
              }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-primary-dark-950 dark:text-primary-50 text-[10px] xs:text-xs md:text-sm text-center">
                Crea un account o accedi per salvare le ricette create dalla
                nostra IA!
              </span>

              <button
                className="absolute top-1 right-1 xxs:right-2 p-1 text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white cursor-pointer"
                onClick={() => setShowBanner(false)}
                aria-label="Chiudi"
              >
                <XMarkIcon className=" size-4 md:size-4.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Chat scrollable */}
      <div
        className={`overflow-y-auto overflow-x-hidden min-h-0 px-6 w-full ${
          display ? "" : "flex flex-col items-center"
        }`}
      >
        <div className={`text-center py-5 ${userId ? "" : "mt-12"}`}>
          <div className="relative inline-block py-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide relative z-10">
              creIAmo con{" "}
              <span className="tracking-wider font-medium text-primary-950">
                Vesugusto
              </span>
            </h1>
            <div className="absolute top-0 left-0 h-full w-full bg-white dark:bg-primary-dark-950 z-20 animate-slideReveal pointer-events-none" />
          </div>
        </div>

        <div
          className={`rounded-full flex items-center bg-primary-50 dark:bg-primary-dark-950 mt-5 md:mt-0 ${
            display ? "hidden" : ""
          } xl:h-max`}
        >
          <Image
            src={logo}
            alt="Chat icon"
            placeholder="blur"
            height={150}
            width={150}
            className="shadow-md rounded-full w-auto h-full"
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
              className={`text-[10px] xs:text-sm md:text-lg py-2 sm:py-4 px-2 sm:px-4 border border-gray-200 dark:border-dark-200 dark:bg-dark-300 rounded-4xl hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
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
          className={`max-w-xs xs:max-w-md sm:max-w-xl md:max-w-3xl mx-auto gap-4 py-4 font-light ${
            display ? "flex flex-col" : "hidden"
          }`}
        >
          {chat.map((msg, i) => {
            // console.log(msg); // stampa msg in console
            return (
              <div
                key={i}
                className={`flex text-xs xs:text-sm md:text-base ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  ref={messageRef}
                  className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-xl whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary-950 text-primary-50"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <div className="flex items-start gap-2 md:gap-4">
                      <div className="pb-1 flex flex-col gap-y-1.5 relative">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ReactMarkdown
                            components={{
                              h1: ({ node, ...props }) => (
                                <h1
                                  className="text-3xl font-bold my-4"
                                  {...props}
                                />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2
                                  className="text-lg font-bold sm:text-2xl sm:font-semibold my-0"
                                  {...props}
                                />
                              ),
                              p: ({ node, ...props }) => (
                                <p
                                  className=" text-sm sm:text-base leading-relaxed my-0"
                                  {...props}
                                />
                              ),
                              li: ({ node, ...props }) => (
                                <li
                                  className="ml-6 list-disc dark:marker:text-primary-950"
                                  {...props}
                                />
                              ),
                              code: ({ node, ...props }) => (
                                <code
                                  className="bg-gray-100 dark:bg-dark-200 px-1.5 py-0.5 rounded text-sm"
                                  {...props}
                                />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong className="font-semibold" {...props} />
                              ),
                              pre: ({ node, ...props }) => (
                                <pre
                                  className="bg-gray-900 text-gray-100 p-4 rounded-md max-w-md sm:max-w-xl md:max-w-2xl overflow-x-scroll my-4 mx-auto"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </motion.div>

                        <div className="flex items-center mt-3">
                          {userId &&
                            msg.content.includes("ricetta") &&
                            (savedIds.includes(i) ? (
                              <CheckCircleIcon className="size-7 fill-primary-950" />
                            ) : savingIds.includes(i) ? (
                              <SpinnerSuperMini />
                            ) : (
                              <button
                                className="text-xs md:text-sm rounded-4xl py-1 px-2 bg-primary-950 text-primary-50 dark:text-gray-200 cursor-pointer hover:bg-primary-800 font-medium"
                                onClick={() => handleSaveRecipe(msg.content, i)}
                              >
                                Salva!
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex items-center gap-2 sm:gap-4 px-4 py-2">
              <Image
                src={logo}
                alt="Vesugusto logo"
                height={50}
                width={50}
                className="-ml-8"
              />
              <div className="flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-primary-950 rounded-full animate-bounce-dot transition dot-delay-1"></div>
                <div className="w-2 h-2 bg-primary-950 rounded-full animate-bounce-dot transition dot-delay-2"></div>
                <div className="w-2 h-2 bg-primary-950 rounded-full animate-bounce-dot transition dot-delay-3"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-transparent pb-3 sm:pb-10 text-sm md:text-base">
        <div className="max-w-xs xs:max-w-md sm:max-w-xl md:max-w-3xl mx-auto flex flex-col animate-reveal">
          <textarea
            className="w-full px-5 pt-2 border-t border-r border-l bg-white dark:border-dark-200 dark:bg-dark-300 border-gray-300 rounded-tl-2xl rounded-tr-2xl resize-none outline-primary-950 leading-tight font-light outline-none overflow-y-auto"
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

          <div className="flex items-center justify-end py-2 rounded-br-2xl rounded-bl-2xl border-r border-l border-t-0 border-b bg-white border-gray-300 dark:border-dark-200 dark:bg-dark-300">
            <button
              className="rounded-full mr-2 bg-primary-950 hover:bg-primary-800 transition-colors duration-200 px-1 py-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={sendMessage}
              disabled={loading}
            >
              <ArrowUpIcon className="size-4 md:size-6 text-primary-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
