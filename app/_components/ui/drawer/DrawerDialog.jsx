"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function DrawerDialog({ className, open, setOpen, children }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-1000 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-white/70 backdrop-blur-xs transition-opacity duration-500 ease-in-out data-closed:opacity-0 dark:bg-zinc-800/70"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <DialogPanel
              transition
              className="pointer-events-auto relative grid w-screen max-w-xs transform grid-cols-1 transition duration-500 ease-in-out data-closed:-translate-x-full sm:max-w-sm sm:duration-700"
            >
              <div
                className={`relative flex h-full flex-col gap-3 ${className}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="focus mr-2.5 cursor-pointer self-end rounded-full px-1 py-1 hover:bg-gray-100 dark:hover:bg-zinc-900"
                >
                  <span className="sr-only">Chiudi filtri</span>
                  <XMarkIcon aria-hidden="true" className="size-8" />
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
