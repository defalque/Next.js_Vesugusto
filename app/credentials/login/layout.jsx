import Image from "next/image";
import background from "@/public/login.jpg";
import { notoSerif } from "@/app/_lib/font";

function Layout({ children }) {
  const sizes = "(min-width: 80rem) 66.6vw, (min-width: 48rem) 54.5vw, 100vw";

  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[20rem_auto] gap-3 lg:h-screen lg:grid-cols-[1.2fr_1fr] lg:grid-rows-1 xl:grid-cols-[1.5fr_1fr]">
      <div
        role="presentation"
        className="_px-4 relative row-start-2 flex justify-center lg:row-start-1"
      >
        <Image
          src={background}
          alt=""
          fill
          placeholder="blur"
          quality={80}
          sizes={sizes}
          priority={true}
          className="object-cover brightness-40"
        />

        <div className="relative z-10 flex items-center justify-center">
          <h2
            className={`${notoSerif.className} text-primary-50 xs:text-4xl mb-0 text-center text-3xl font-bold tracking-tight text-wrap text-shadow-lg/30 md:mb-20 md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-6xl`}
          >
            Gustati i nostri prodotti.
            <br />
            Inizia ora.
          </h2>
        </div>
      </div>

      {children}
    </div>
  );
}

export default Layout;
