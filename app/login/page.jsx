import Image from "next/image";
import SignIn from "../_components/ui/SignIn";
import background from "@/public/login.jpg";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-5 mt-40 items-center">
      <h2 className="text-3xl font-semibold mb-8">Crea un account o accedi!</h2>

      <SignIn></SignIn>

      <p className="text-sm max-w-3xl">
        Cliccando su continua, accetti i nostri{" "}
        <Link href="#" className="text-orange-800 dark:text-orange-200">
          Termini di Servizio
        </Link>{" "}
        e l'
        <Link href="#" className="text-orange-800 dark:text-orange-200">
          Informativa sulla privacy
        </Link>
        .
      </p>
    </div>
  );
}
