import Image from "next/image";
import vesugusto from "@/public/vesugusto.png";
import Link from "next/link";

function Logo({ complete = false, isFooter = false }) {
  return (
    <Link
      href="/"
      className="focus text-primary-950 ml-2 flex items-center justify-center rounded p-1 md:-ml-0 md:p-0"
      aria-label="Homepage Vesugusto"
    >
      <Image
        src={vesugusto}
        width={40}
        height={40}
        alt="Logo Vesugusto"
        className={`${isFooter ? "hidden" : "inline"} rounded-full border border-gray-200 md:hidden dark:border-none dark:bg-gray-50 dark:opacity-90`}
        priority
      ></Image>
      <span className="sr-only">Vesugusto</span>

      <span
        className={`${isFooter ? "" : "hidden"} text-5xl font-bold md:inline dark:opacity-90`}
        aria-hidden="true"
      >
        V
      </span>
      {complete && (
        <span
          className={`${isFooter ? "" : "hidden"} text-4xl font-bold tracking-wider md:inline dark:opacity-90`}
          aria-hidden="true"
        >
          esugusto
        </span>
      )}
    </Link>
  );
}

export default Logo;
