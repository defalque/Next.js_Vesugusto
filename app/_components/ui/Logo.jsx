import { playfair } from "@/app/_lib/font";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className={`${playfair.className} focus z-150 flex items-center justify-center rounded px-0`}
      aria-label="Homepage Vesugusto"
    >
      <span
        className={`text-2xl font-extrabold tracking-wide text-shadow-2xs sm:text-3xl`}
        aria-hidden="true"
      >
        Vesugusto
      </span>
    </Link>
  );
}

export default Logo;
