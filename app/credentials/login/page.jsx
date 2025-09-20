import Logo from "@/app/_components/ui/Logo";
import SignIn from "../../_components/ui/SignIn";
import Link from "next/link";
import LogoImage from "@/app/_components/ui/LogoImage";

export const metadata = {
  title: "Login",
  description:
    "Accedi o crea un account per gustare i migliori prodotti di Vesugusto. Login rapido e sicuro.",
};

export default function Page() {
  return (
    <section
      aria-labelledby="auth-page-form"
      className="flex flex-col items-center gap-8 px-4 py-5 md:px-1 lg:gap-12 lg:py-0"
    >
      <LogoImage width={150} height={150} />
      <h2
        id="auth-page-form"
        className="text-center text-3xl font-semibold text-wrap sm:text-4xl md:text-3xl xl:text-4xl"
      >
        Crea un account o accedi!
      </h2>

      <div className="flex flex-col items-center gap-5 sm:gap-3">
        <SignIn></SignIn>

        <p className="inline-flex max-w-xs flex-wrap justify-center gap-1 self-center text-xs sm:max-w-full">
          Cliccando su continua, accetti i nostri{" "}
          <Link
            href="#"
            className="text-primary-dark-100 hover:text-primary-dark-300 dark:hover:text-primary-800"
            aria-label="Termini di Servizio di Vesugusto"
          >
            Termini di Servizio
          </Link>{" "}
          e la nostra
          <Link
            href="#"
            className="text-primary-dark-100 hover:text-primary-dark-300 dark:hover:text-primary-800"
            aria-label="Informativa sulla privacy di Vesugusto"
          >
            Informativa sulla privacy
          </Link>
        </p>
      </div>
    </section>
  );
}
