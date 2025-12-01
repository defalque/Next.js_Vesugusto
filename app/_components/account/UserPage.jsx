import { getUserInfo } from "@/app/_lib/data-service";
import UpdateProfileForm from "./UpdateProfileForm";
import { FormButtonsContextProvider } from "@/app/_contexts/FormButtonsContext";

async function UserPage({ font }) {
  const user = await getUserInfo();

  return (
    <>
      <div className="flex flex-col gap-5 pb-4">
        <h1
          aria-label="Messaggio di benvenuto"
          className={`${font.className} text-primary-dark-900 inline-flex max-w-fit min-w-fit flex-wrap items-center gap-2 text-3xl font-semibold sm:font-medium md:text-4xl dark:text-gray-200`}
        >
          Ciao {user.firstName}!
        </h1>

        <p className="_tracking-wide text-sm text-black/65 sm:text-base dark:text-white/85">
          Per offrirti un servizio sempre migliore ti invitiamo ad aggiornare le
          tue informazioni personali.
        </p>
      </div>

      <section aria-labelledby="profile-form-title">
        <h2 id="profile-form-title" className="sr-only">
          Aggiorna le tue informazioni
        </h2>
        <FormButtonsContextProvider>
          <UpdateProfileForm user={user} />
        </FormButtonsContextProvider>
      </section>
    </>
  );
}

export default UserPage;
