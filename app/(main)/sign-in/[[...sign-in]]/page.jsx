import { SignInSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import { SignIn } from "@clerk/nextjs";

function page() {
  return (
    <div className="grid place-items-center">
      <SignIn fallback={<SignInSkeleton />} />
    </div>
  );
}

export default page;
