import { Suspense } from "react";
// import UserName from "../_components/account/UserName";
// import UpdateProfileFormWrapper from "../_components/account/UpdateProfileFormWrapper";
// import {
//   UpdateProfileFormSkeleton,
//   UserNameSkeleton,
// } from "../_components/ui/skeleton/Skeletons";
import AccountHeading from "@/app/_components/account/AccountHeading";
import UpdateProfileFormWrapper from "@/app/_components/account/UpdateProfileFormWrapper";
import UserName from "@/app/_components/account/UserName";
import {
  UpdateProfileFormSkeleton,
  UserNameSkeleton,
} from "@/app/_components/ui/skeleton/Skeletons";

export const metadata = {
  title: "Account",
  description:
    "Aggiorna le tue informazioni personali per garantirti un servizio sempre migliore. Gestisci i tuoi dati direttamente dal tuo profilo account.",
};

export default function Page() {
  return (
    <>
      <AccountHeading
        accessibleLabel="account-heading"
        text="Per offrirti un servizio sempre migliore ti invitiamo ad aggiornare le
          tue informazioni personali."
      >
        Ciao{" "}
        <Suspense fallback={<UserNameSkeleton />}>
          <UserName />
        </Suspense>
      </AccountHeading>

      <section aria-labelledby="profile-form-title">
        <h2 id="profile-form-title" className="sr-only">
          Aggiorna profilo
        </h2>

        <Suspense fallback={<UpdateProfileFormSkeleton />}>
          <UpdateProfileFormWrapper />
        </Suspense>
      </section>
    </>
  );
}
