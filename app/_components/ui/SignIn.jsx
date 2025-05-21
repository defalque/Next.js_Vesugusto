import { githubSignInAction, googleSignInAction } from "@/app/_lib/actions";

export default function SignIn() {
  return (
    <div className="flex items-center gap-9">
      <form action={githubSignInAction}>
        <button
          type="submit"
          className="flex items-center font-medium gap-3 bg-primary-950 text-primary-100 hover:bg-primary-800 dark:text-primary-dark-900 dark:bg-primary-100 px-3 py-3 cursor-pointer transition-colors duration-300 rounded shadow-md shadow-primary-200 dark:shadow-primary-dark-800 dark:hover:bg-primary-200"
        >
          <img
            src="https://authjs.dev/img/providers/github.svg"
            alt="Google logo"
            height="24"
            width="24"
            className="rounded-2xl bg-amber-50 p-1"
          />
          Continua con GitHub
        </button>
      </form>

      <form action={googleSignInAction}>
        <button
          type="submit"
          className="flex items-center font-medium gap-3 bg-primary-950 text-primary-100 hover:bg-primary-800 dark:text-primary-dark-900 dark:bg-primary-100 px-3 py-3 cursor-pointer transition-colors duration-300 rounded shadow-md shadow-primary-200 dark:shadow-primary-dark-800 dark:hover:bg-primary-200"
        >
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
            className="rounded-2xl bg-amber-50 p-1"
          />
          <span>Continua con Google</span>
        </button>
      </form>
    </div>
  );
}
