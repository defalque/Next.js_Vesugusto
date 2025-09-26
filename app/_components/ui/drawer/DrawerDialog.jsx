"use client";

import { notoSerif } from "@/app/_lib/font";
import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, X } from "lucide-react";

function DrawerDialog({
  className,
  open,
  setOpen,
  direction = "left",
  children,
  buttonStyles,
  ariaLabel,
}) {
  return (
    <>
      <Button
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-pressed={open}
        aria-label={
          direction === "left"
            ? "Mostra filtri"
            : "Apri per esplorare altre sezioni del sito"
        }
        onClick={() => setOpen(true)}
        className={buttonStyles}
      >
        {direction === "left" ? (
          <>
            <p className="text-sm sm:text-base">Filtri</p>
            <AdjustmentsHorizontalIcon aria-hidden className="size-5" />
          </>
        ) : (
          <Menu aria-hidden className="inline size-6 transition duration-300" />
        )}
      </Button>

      <Dialog
        open={open}
        onClose={setOpen}
        className="_relative _z-1000 fixed inset-0 z-1000 lg:hidden"
        aria-label={ariaLabel}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-inherit backdrop-blur-xs transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        {/* <div className="fixed inset-0 overflow-hidden overflow-y-auto"> */}
        {/* <div className="absolute inset-0 overflow-hidden"> */}
        <div
          className={`${direction === "left" ? "left-0" : "right-0"} pointer-events-none fixed inset-y-0 flex max-w-full`}
        >
          <DialogPanel
            transition
            className={`bgColor _px-3 pointer-events-auto relative flex w-screen max-w-xs transform flex-col gap-y-8 pt-4 transition duration-500 ease-in-out ${direction === "left" ? "border-r border-r-gray-200 data-closed:-translate-x-full dark:border-r-zinc-900" : "border-l border-l-gray-200 data-closed:translate-x-full dark:border-l-zinc-900"} sm:max-w-sm sm:duration-700`}
          >
            <div className="flex items-center justify-between px-5">
              {direction === "left" && (
                <span
                  className={`${notoSerif.className} text-3xl font-semibold`}
                >
                  Filtri
                </span>
              )}
              {direction === "right" && (
                <span
                  className={`${notoSerif.className} text-3xl font-semibold`}
                >
                  Sezioni
                </span>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="focus-visible:ring-primary-950 _mr-2.5 cursor-pointer rounded-xl border border-gray-200 px-2 py-1.5 transition-colors duration-200 hover:bg-gray-200/80 focus-visible:ring-2 focus-visible:outline-none active:bg-gray-200/80 dark:border-zinc-800 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
              >
                <span className="sr-only">
                  {direction === "left" ? "Chiudi filtri" : "Chiudi sezioni"}
                </span>
                <X aria-hidden="true" className="size-6 md:size-6" />
              </button>
            </div>
            <div
              className={`relative h-full flex-1 flex-col gap-5 overflow-y-auto px-4 ${className}`}
            >
              {children}
            </div>
          </DialogPanel>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Dialog>
    </>
  );
}

export default DrawerDialog;
