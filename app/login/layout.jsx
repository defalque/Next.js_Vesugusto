import Image from "next/image";
import background from "@/public/login.jpg";

function Layout({ children }) {
  const sizes = "(min-width: 80rem) 66.6vw, (min-width: 48rem) 54.5vw, 100vw";

  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[20rem_auto] gap-3 lg:h-screen lg:grid-cols-[1.2fr_1fr] lg:grid-rows-1 xl:grid-cols-[1.5fr_1fr]">
      <section
        aria-labelledby="auth-page-heading"
        className="relative row-start-2 flex justify-center px-4 lg:row-start-1"
      >
        <Image
          src={background}
          alt="Bottiglia di vino rosso con sfondo elegante"
          fill
          placeholder="blur"
          quality={80}
          sizes={sizes}
          priority={true}
          className="object-cover brightness-40"
        />

        <div className="relative z-10 flex items-center justify-center">
          <h1
            id="auth-page-heading"
            className="text-primary-50 mb-0 text-center text-4xl font-bold tracking-tight text-wrap text-shadow-lg/30 md:mb-20 md:text-6xl xl:text-7xl"
          >
            Gustati i nostri prodotti. Inizia ora.
          </h1>
        </div>
      </section>

      {children}
    </div>
  );
}

export default Layout;
