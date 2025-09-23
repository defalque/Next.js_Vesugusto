"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function DrawerDialog({
  className,
  open,
  setOpen,
  direction = "left",
  children,
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-1000 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-white/70 backdrop-blur-xs transition-opacity duration-500 ease-in-out data-closed:opacity-0 dark:bg-black/60"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`${direction === "left" ? "left-0" : "right-0"} pointer-events-none fixed inset-y-0 flex max-w-full`}
          >
            <DialogPanel
              transition
              className={`pointer-events-auto relative grid w-screen max-w-xs transform grid-cols-1 transition duration-500 ease-in-out ${direction === "left" ? "border-r border-r-gray-200 data-closed:-translate-x-full dark:border-r-zinc-900" : "border-l border-l-gray-200 data-closed:translate-x-full dark:border-l-zinc-900"} sm:max-w-sm sm:duration-700`}
            >
              <div
                className={`relative flex h-full flex-col gap-3 ${className}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="focus-visible:ring-primary-950 mr-2.5 cursor-pointer self-end rounded-xl px-2 py-1.5 hover:bg-gray-200/80 focus-visible:ring-2 focus-visible:outline-none active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
                >
                  <span className="sr-only">
                    {direction === "left"
                      ? "Chiudi filtri"
                      : "Chiudi menu di navigazione mobile"}
                  </span>
                  <XMarkIcon aria-hidden="true" className="size-5" />
                </button>
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default DrawerDialog;
