import { auth } from "@/auth";
import UpdateProfileFormV3 from "../_components/ui/UpdateProfileFormV3";
import { getUser } from "../_lib/data-service";
import { Suspense } from "react";
import Spinner from "../_components/ui/Spinner";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();
  const user = await getUser(session?.user?.email);

  return (
    <div>
      <div className="flex flex-col gap-5 pb-4 border-b border-b-gray-200 dark:border-b-dark-200">
        <h1 className="text-primary-dark-900 dark:text-gray-200 text-2xl md:text-5xl font-medium ">
          Benvenuto {session?.user?.name}!
        </h1>

        <p className="text-sm md:text-base font-normal text-gray-500 dark:text-gray-300">
          Per offrirti un servizio sempre migliore ti invitiamo ad aggiornare le
          tue informazioni personali.
        </p>
      </div>

      <Suspense fallback={<Spinner></Spinner>}>
        <UpdateProfileFormV3 user={user}></UpdateProfileFormV3>
      </Suspense>
    </div>
  );
}
