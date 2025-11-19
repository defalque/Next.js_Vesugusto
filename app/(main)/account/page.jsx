import { Suspense } from "react";
import UserPage from "@/app/_components/account/UserPage";
import { UserPageSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import { notoSerif } from "@/app/_lib/font";

export const metadata = {
  title: "Account",
  description:
    "Aggiorna le tue informazioni personali per garantirti un servizio sempre migliore. Gestisci i tuoi dati direttamente dal tuo profilo account.",
};

export default async function Page() {
  return (
    <Suspense fallback={<UserPageSkeleton font={notoSerif} />}>
      <UserPage font={notoSerif} />
    </Suspense>
  );
}
