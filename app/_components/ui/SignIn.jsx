import { githubSignInAction, googleSignInAction } from "@/app/_lib/actions";
import Image from "next/image";
import github from "../../../public/github.svg";
import google from "../../../public/google.svg";

export default function SignIn() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-6">
      <form action={githubSignInAction}>
        <button
          aria-label="Accedi con GitHub"
          type="submit"
          className={`dark:border-primary-dark-300 focus-visible:dark:ring-primary-950 focus-visible:ring-primary-dark-300 inset-shadow-primary-50/60 dark:hover:border-primary-dark-100 bg-primary-dark-200 hover:bg-primary-dark-100 active:bg-primary-dark-100 dark:hover:bg-primary-950/40 dark:active:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 outline-primary-dark-100 disabled:bg-primary-dark-200/80 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 inline-flex cursor-pointer items-center rounded px-3 py-2 text-white inset-shadow-sm outline-offset-2 transition-colors duration-300 hover:shadow focus-visible:ring-4 focus-visible:outline-none active:shadow disabled:cursor-not-allowed disabled:shadow-none disabled:inset-shadow-none disabled:text-shadow-none dark:border dark:inset-shadow-none dark:text-shadow-md/10`}
        >
          <div className="inline-flex gap-3">
            <Image
              src={github}
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
          className={`dark:border-primary-dark-300 focus-visible:dark:ring-primary-950 focus-visible:ring-primary-dark-300 inset-shadow-primary-50/60 dark:hover:border-primary-dark-100 bg-primary-dark-200 hover:bg-primary-dark-100 active:bg-primary-dark-100 dark:hover:bg-primary-950/40 dark:active:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 outline-primary-dark-100 disabled:bg-primary-dark-200/80 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 inline-flex cursor-pointer items-center rounded px-3 py-2 text-white inset-shadow-sm outline-offset-2 transition-colors duration-300 hover:shadow focus-visible:ring-4 focus-visible:outline-none active:shadow disabled:cursor-not-allowed disabled:shadow-none disabled:inset-shadow-none disabled:text-shadow-none dark:border dark:inset-shadow-none dark:text-shadow-md/10`}
        >
          <div className="inline-flex gap-3">
            <Image
              src={google}
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
