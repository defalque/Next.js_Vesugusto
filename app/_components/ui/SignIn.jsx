import { githubSignInAction, googleSignInAction } from "@/app/_lib/actions";

export default function SignIn() {
  return (
    <div className="flex flex-col xl:flex-row items-center gap-4 xl:gap-9">
      <form action={githubSignInAction}>
        <button
          type="submit"
          className="flex items-center font-medium gap-3 bg-primary-950 text-primary-100 hover:bg-primary-800 px-2 xl:px-3 py-2 xl:py-3 cursor-pointer transition-colors duration-300 rounded-md shadow-md"
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
          className="flex items-center font-medium gap-3 bg-primary-950 text-primary-100 hover:bg-primary-800 px-2 xl:px-3 py-2 xl:py-3 cursor-pointer transition-colors duration-300 rounded-md shadow-md"
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
