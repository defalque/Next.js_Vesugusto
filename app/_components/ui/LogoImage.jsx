import Image from "next/image";
import Link from "next/link";

function LogoImage({ decorative = false }) {
  return (
    <Link
      href="/"
      className="relative h-[7.5rem] w-[7.5rem] sm:h-[9.375rem] sm:w-[9.375rem] md:h-[11.25rem] md:w-[11.25rem]"
    >
      <Image
        src="/vesugusto.png"
        alt={decorative ? "" : "Logo di Vesugusto"}
        role={decorative ? "presentation" : undefined}
        aria-hidden={decorative ? "true" : undefined}
        className="object-contain dark:opacity-70"
        fill
        /**
         * Tailwind breakpoints:
         * sm = 640px  = 40rem
         * md = 768px  = 48rem
         */
        sizes="(max-width: 40rem) 7.5rem, (max-width: 48rem) 9.375rem, 11.25rem"
        priority
      />
    </Link>
  );
}

export default LogoImage;
