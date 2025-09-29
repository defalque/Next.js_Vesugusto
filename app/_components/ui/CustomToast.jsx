"use client";

import { CircleCheck, CircleX } from "lucide-react";

export async function showCustomPromiseToast(toast, promise, messages) {
  const toastId = toast.custom((t) => (
    <ToastTemplate
      t={t}
      type="loading"
      message={messages.loading}
      onClose={() => toast.dismiss(t.id)}
    />
  ));

  try {
    const result = await promise;

    toast.custom(
      (t) => (
        <ToastTemplate
          t={t}
          type="success"
          message={messages.success}
          onClose={() => toast.dismiss(t.id)}
        />
      ),
      { id: toastId },
    );

    return result;
  } catch (err) {
    toast.custom(
      (t) => (
        <ToastTemplate
          t={t}
          type="error"
          message={
            typeof messages.error === "function"
              ? messages.error(err)
              : messages.error
          }
          onClose={() => toast.dismiss(t.id)}
        />
      ),
      { id: toastId },
    );

    throw err;
  }
}

export async function showCustomSuccessToast(toast) {
  return toast.custom((t) => (
    <ToastTemplate
      t={t}
      type="success"
      message={message}
      onClose={() => toast.dismiss(t.id)}
    />
  ));
}

export async function showCustomErrorToast(toast, errorMessage) {
  const message =
    typeof errorMessage === "string"
      ? errorMessage
      : errorMessage?.message || "Errore imprevisto";

  toast.custom((t) => (
    <ToastTemplate
      t={t}
      type="error"
      message={message}
      onClose={() => toast.dismiss(t.id)}
    />
  ));
}

export function ToastTemplate({ t, type, message, onClose }) {
  if (!t.visible) return null;

  const typeStyles = {
    loading: "bg-white dark:bg-zinc-900 text-black dark:text-white",
    success: "bg-white dark:bg-zinc-900 text-green-900 dark:text-green-50",
    error: "bg-white dark:bg-zinc-900 text-red-900 dark:text-red-50",
  };

  return (
    <div
      className={`flex w-fit items-center justify-between gap-4 rounded-md border border-gray-300 px-4 py-3 shadow-md dark:border-zinc-800 ${typeStyles[type]}`}
    >
      <div
        role={type === "error" ? "alert" : "status"}
        aria-live={type === "error" ? "assertive" : "polite"}
        aria-atomic="true"
        className="flex items-center gap-3"
      >
        {type === "loading" && (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-zinc-700 dark:border-t-white/90" />
          </div>
        )}

        {type === "success" && (
          <CircleCheck
            aria-hidden
            className="size-6 fill-green-500 text-white dark:fill-green-400 dark:text-zinc-900"
          />
        )}

        {type === "error" && (
          <CircleX
            aria-hidden
            className="size-6 fill-red-500 text-white dark:fill-red-400 dark:text-zinc-900"
          />
        )}

        <span className="text-sm font-medium">{message}</span>
      </div>

      {type !== "loading" && (
        <button
          onClick={() => {
            onClose?.();
          }}
          className="cursor-pointer text-sm font-semibold underline hover:opacity-70 active:opacity-70 dark:hover:brightness-110 dark:active:brightness-110"
        >
          Chiudi
        </button>
      )}
    </div>
  );
}
