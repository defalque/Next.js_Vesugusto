import SignIn from "../_components/ui/SignIn";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-5 mt-40 items-center">
      <h2 className="text-4xl font-semibold mb-8">Crea un account o accedi!</h2>

      <SignIn></SignIn>

      <p className="text-[0.7rem] max-w-3xl">
        Cliccando su continua, accetti i nostri{" "}
        <Link href="#" className="text-primary-dark-300 dark:text-primary-400">
          Termini di Servizio
        </Link>{" "}
        e l'
        <Link href="#" className="text-primary-dark-300 dark:text-primary-400">
          Informativa sulla privacy
        </Link>
        .
      </p>
    </div>
  );
}
