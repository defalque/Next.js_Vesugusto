import { notoSerif } from "@/app/_lib/font";
import SignIn from "../../_components/ui/SignIn";
import Link from "next/link";
import Logo from "@/app/_components/ui/Logo";
// import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section
      aria-labelledby="auth-page-form"
      className="flex flex-col items-center justify-baseline gap-8 px-4 py-5 md:px-4 lg:gap-12 lg:py-10"
    >
      <Logo />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="mb-0 space-y-10 self-center lg:mb-20">
          <h2
            id="auth-page-form"
            className={`${notoSerif.className} xs:text-3xl justify-items-center text-center text-2xl font-semibold text-wrap sm:text-4xl md:text-3xl xl:text-4xl`}
          >
            Crea un account o accedi!
          </h2>

          <div className="flex flex-col items-center gap-5 sm:gap-4">
            <SignIn></SignIn>

            {/* <SignIn /> */}

            <p className="inline-flex max-w-xs flex-wrap justify-center gap-1 self-center text-xs text-black/65 sm:max-w-full dark:text-white/85">
              Cliccando su continua, accetti i nostri{" "}
              <Link
                href="#"
                className="text-primary-dark-200 focus hover:text-primary-dark-300 dark:hover:text-primary-900 font-semibold"
                aria-label="Termini di Servizio di Vesugusto"
              >
                Termini di Servizio
              </Link>{" "}
              e la nostra
              <Link
                href="#"
                className="text-primary-dark-200 focus hover:text-primary-dark-300 dark:hover:text-primary-800 font-semibold"
                aria-label="Informativa sulla privacy di Vesugusto"
              >
                Informativa sulla privacy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
