import { auth } from "@/auth";
import UpdateProfileForm from "../_components/ui/UpdateProfileForm";
import UpdateProfileFormV2 from "../_components/ui/UpdateProfileFormV2";
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
      <h1 className="text-primary-dark-900 dark:text-primary-100 text-5xl font-semibold mb-6">
        Benvenuto {session?.user?.name}!
      </h1>

      <p className="text-base font-normal text-gray-500 mb-8">
        Per offrirti un servizio sempre migliore ti invitiamo ad aggiornare le
        tue informazioni personali.
      </p>

      <Suspense fallback={<Spinner></Spinner>}>
        {/* <UpdateProfileForm user={user}></UpdateProfileForm> */}
        {/* <UpdateProfileFormV2 user={user}></UpdateProfileFormV2> */}
        <UpdateProfileFormV3 user={user}></UpdateProfileFormV3>
      </Suspense>
    </div>
  );
}
