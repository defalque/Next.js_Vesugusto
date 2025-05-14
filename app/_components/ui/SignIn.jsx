import { githubSignInAction, googleSignInAction } from "@/app/_lib/actions";

export default function SignIn() {
  return (
    <div className="flex items-center gap-9">
      <form action={githubSignInAction}>
        <button
          type="submit"
          className="flex items-center gap-3 bg-orange-950 text-orange-50 hover:bg-orange-700 dark:hover:bg-gray-300 dark:text-orange-950 dark:bg-orange-50 px-3 py-3 cursor-pointer transition-colors rounded"
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
          className="flex items-center gap-3 bg-orange-950 text-orange-50 hover:bg-orange-700 dark:hover:bg-gray-300 dark:text-orange-950 dark:bg-orange-50 px-3 py-3 cursor-pointer transition-colors rounded"
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
