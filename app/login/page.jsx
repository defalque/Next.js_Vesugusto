import SignIn from "../_components/ui/SignIn";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description:
    "Accedi o crea un account per gustare i migliori prodotti di Vesugusto. Login rapido e sicuro.",
};

export default function Page() {
  return (
    <section
      aria-labelledby="auth-page-form"
      className="mb-0 flex flex-col items-center justify-center gap-12 px-4 md:px-0 lg:mb-40"
    >
      <h2
        id="auth-page-form"
        className="text-center text-3xl font-semibold text-wrap sm:text-4xl md:text-3xl xl:text-4xl"
      >
        Crea un account o accedi!
      </h2>

      <div className="flex flex-col items-center gap-3">
        <SignIn></SignIn>

        <p className="inline-flex flex-wrap justify-center gap-1 self-center text-xs">
          Cliccando su continua, accetti i nostri{" "}
          <Link
            href="#"
            className="text-primary-dark-300 dark:text-primary-dark-100"
            aria-label="Termini di Servizio di Vesugusto"
          >
            Termini di Servizio
          </Link>{" "}
          e l'
          <Link
            href="#"
            className="text-primary-dark-300 dark:text-primary-dark-100"
            aria-label="Informativa sulla privacy di Vesugusto"
          >
            Informativa sulla privacy
          </Link>
        </p>
      </div>
    </section>
  );
}
