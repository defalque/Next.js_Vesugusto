import SignIn from "../_components/ui/SignIn";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Registrati per accedere alla tua area privata
      </h2>

      <SignIn></SignIn>
    </div>
  );
}
