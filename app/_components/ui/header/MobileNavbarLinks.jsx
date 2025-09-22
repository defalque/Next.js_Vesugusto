"use client";

import { useMobileNavbarContext } from "@/app/_contexts/MobileNavbarContext";
import Link from "next/link";

function MobileNavbarLinks() {
  const { setIsOpen } = useMobileNavbarContext();

  return (
    <ul className="space-y-2">
      <li>
        <Link
          href="/shop"
          className={`focus block w-full rounded-lg px-3 py-2 transition hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50`}
          onClick={() => setIsOpen(false)}
        >
          <div className="text-xl font-medium text-gray-900 dark:text-white">
            Shop
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Visualizza i nostri prodotti
          </div>
        </Link>
      </li>

      <li>
        <Link
          href="/"
          className={`focus block w-full rounded-lg px-3 py-2 transition hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50`}
          onClick={() => setIsOpen(false)}
        >
          <div className="text-xl font-medium text-gray-900 dark:text-white">
            Privacy policy
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Leggi la nostra politica sulla privacy e sul trattamento dei dati
          </div>
        </Link>
      </li>

      <li>
        <Link
          href="/"
          className={`focus block w-full rounded-lg px-3 py-2 transition hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50`}
          onClick={() => setIsOpen(false)}
        >
          <div className="text-xl font-medium text-gray-900 dark:text-white">
            Termini e condizioni
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Leggi i nostri termini e condizionu
          </div>
        </Link>
      </li>
    </ul>
  );
}

export default MobileNavbarLinks;
