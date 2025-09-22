import Image from "next/image";
import vesugusto from "@/public/vesugusto.png";
import Link from "next/link";

function Logo({ complete = false, isFooter = false }) {
  return (
    <Link
      href="/"
      className="focus text-primary-950 _md:px-2 z-150 flex items-center justify-center rounded px-0"
      aria-label="Homepage Vesugusto"
    >
      {/* <Image
        src={vesugusto}
        width={40}
        height={40}
        alt="Logo Vesugusto"
        className={`${isFooter ? "hidden" : "inline"} rounded-full border border-gray-200 md:hidden dark:border-none dark:bg-gray-50 dark:opacity-90`}
        priority
      ></Image> */}

      <span
        className={`${isFooter ? "" : "_hidden"} text-4xl font-bold text-shadow-2xs md:inline dark:opacity-90`}
        aria-hidden="true"
      >
        V
      </span>
      {complete && (
        <span
          className={`${isFooter ? "" : "_hidden"} text-3xl font-bold tracking-wider text-shadow-2xs md:inline dark:opacity-90`}
          aria-hidden="true"
        >
          esugusto
        </span>
      )}
    </Link>
  );
}

export default Logo;
