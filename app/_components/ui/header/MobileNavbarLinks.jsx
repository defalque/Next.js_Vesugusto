"use client";

import { useMobileNavbarContext } from "@/app/_contexts/MobileNavbarContext";
import Link from "next/link";

function MobileNavbarLinks() {
  const { setIsOpen } = useMobileNavbarContext();

  return (
    <ul className="space-y-2">
      <li>
        <Link
          aria-labelledby="shop"
          href="/shop"
          className={`focus-style block w-full rounded-lg px-3 py-2 transition hover:bg-black/5 active:bg-black/5 dark:hover:bg-white/10 dark:active:bg-white/10`}
          onClick={() => setIsOpen(false)}
        >
          <h2
            id="shop"
            className="text-xl font-medium text-gray-900 dark:text-white"
          >
            Shop
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Visualizza i nostri prodotti
          </p>
        </Link>
      </li>

      <li>
        <Link
          aria-labelledby="privacy"
          href="/"
          className={`focus-style block w-full rounded-lg px-3 py-2 transition hover:bg-black/5 active:bg-black/5 dark:hover:bg-white/10 dark:active:bg-white/10`}
          onClick={() => setIsOpen(false)}
        >
          <h2
            id="privacy"
            className="text-xl font-medium text-gray-900 dark:text-white"
          >
            Privacy policy
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Leggi la nostra politica sulla privacy e sul trattamento dei dati
          </p>
        </Link>
      </li>

      <li>
        <Link
          aria-labelledby="termini"
          href="/"
          className={`focus-style block w-full rounded-lg px-3 py-2 transition hover:bg-black/5 active:bg-black/5 dark:hover:bg-white/10 dark:active:bg-white/10`}
          onClick={() => setIsOpen(false)}
        >
          <h2
            id="termini"
            className="text-xl font-medium text-gray-900 dark:text-white"
          >
            Termini e condizioni
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Leggi i nostri termini e condizionu
          </p>
        </Link>
      </li>
    </ul>
  );
}

export default MobileNavbarLinks;
