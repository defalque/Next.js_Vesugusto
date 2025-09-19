import { githubSignInAction, googleSignInAction } from "@/app/_lib/actions";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-9">
      <form action={githubSignInAction}>
        <button
          aria-label="Accedi con GitHub"
          type="submit"
          className={`dark:border-primary-dark-300 dark:hover:border-primary-dark-100 bg-primary-950 hover:bg-primary-800 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 focus-visible:outline-primary-950 outline-primary-dark-100 disabled:bg-primary-800 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 _inline-flex _items-center inline-flex cursor-pointer items-center rounded px-3 py-2 text-white outline-offset-2 transition-colors duration-300 focus:outline focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-shadow-none dark:border dark:text-shadow-md/10`}
        >
          <div className="inline-flex gap-3">
            <Image
              src="https://authjs.dev/img/providers/github.svg"
              alt=""
              aria-hidden={true}
              height="24"
              width="24"
              className="rounded-2xl bg-gray-50 p-1"
            />
            <span className="font-semibold">Continua con GitHub</span>
          </div>
        </button>
      </form>

      <form action={googleSignInAction}>
        <button
          aria-label="Accedi con Google"
          type="submit"
          className={`dark:border-primary-dark-300 dark:hover:border-primary-dark-100 bg-primary-950 hover:bg-primary-800 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 focus-visible:outline-primary-950 outline-primary-dark-100 disabled:bg-primary-800 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 _inline-flex _items-center inline-flex cursor-pointer items-center rounded px-3 py-2 text-white outline-offset-2 transition-colors duration-300 focus:outline focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-shadow-none dark:border dark:text-shadow-md/10`}
        >
          <div className="inline-flex gap-3">
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt=""
              aria-hidden={true}
              height="24"
              width="24"
              className="rounded-2xl bg-amber-50 p-1"
            />
            <span className="font-semibold">Continua con Google</span>
          </div>
        </button>
      </form>
    </div>
  );
}
