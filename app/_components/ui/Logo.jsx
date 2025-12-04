import { notoSerif } from "@/app/_lib/font";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className={`${notoSerif.className} focus-style`}
      aria-label="Vai alla homepage di Vesugusto"
    >
      <span
        className={`text-3xl font-extrabold tracking-wide text-shadow-2xs`}
        aria-hidden
      >
        Vesugusto
      </span>
    </Link>
  );
}

export default Logo;
