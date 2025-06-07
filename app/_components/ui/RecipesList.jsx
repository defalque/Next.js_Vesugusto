"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import Downloader from "./Downloader";
import { AlertDialog } from "radix-ui";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

function RecipesList({ recipes }) {
  const [openDialog, setOpenDialog] = useState(null);

  return (
    <div className="flex flex-col my-10 rounded border border-gray-300 dark:border-dark-100">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className={`flex items-start gap-6 sm:gap-4 pb-3 pt-4 pr-4 pl-4 transition-all duration-300 relative ${
            index < recipes.length - 1
              ? "border-b border-b-gray-300 dark:border-b-dark-100"
              : ""
          }`}
        >
          <h1 className="text-xs sm:text-sm md:text-medium font-medium hover:text-primary-dark-100 dark:hover:text-primary-50 hover:underline transition-all duration-100 cursor-pointer">
            {recipe.title}
          </h1>

          <div className="flex items-center gap-3 ml-auto text-sm font-normal">
            <Downloader recipe={recipe} />

            <button
              onClick={() => setOpenDialog(recipe.id)}
              aria-label="Elimina"
              className="flex items-center gap-2 px-2 md:px-3  py-1 bg-primary-950 text-primary-50 rounded-lg hover:bg-primary-900 transition duration-200 cursor-pointer"
            >
              <TrashIcon className="size-2.5 sm:size-3 md:size-4" />
            </button>

            <AnimatePresence>
              {openDialog === recipe.id && (
                <AlertDialog.Root
                  open={true}
                  onOpenChange={() => setOpenDialog(null)}
                >
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 bg-gray-50/80 dark:bg-dark-400/80 z-50" />
                    <AlertDialog.Content asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg max-h-80 bg-slate-50 dark:bg-dark-300 border border-gray-400 dark:border-dark-100 rounded-2xl p-6 shadow-xl text-primary-50 space-y-4"
                      >
                        <AlertDialog.Title className="text-lg md:text-2xl text-center md:text-start font-semibold text-gray-800 dark:text-gray-100">
                          Sei sicuro?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-sm text-center md:text-base md:text-start text-gray-800 dark:text-gray-100">
                          Questa è una demo. Non ho ancora implementato questa
                          funzionalità.
                        </AlertDialog.Description>

                        <div className="flex justify-end gap-3 text-sm md:text-base">
                          <AlertDialog.Cancel
                            onClick={() => setOpenDialog(null)}
                            className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-dark-100 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-200 transition cursor-pointer"
                          >
                            Annulla
                          </AlertDialog.Cancel>
                          <AlertDialog.Action
                            onClick={() => setOpenDialog(null)}
                            className="px-4 py-2 rounded-xl bg-primary-950 text-primary-50 hover:bg-primary-900 transition cursor-pointer"
                          >
                            Conferma
                          </AlertDialog.Action>
                        </div>
                      </motion.div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipesList;
