import { SignInSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import { SignIn } from "@clerk/nextjs";

function page() {
  return (
    <div className="flex justify-center pt-5 pb-55">
      <SignIn fallback={<SignInSkeleton />} />
    </div>
  );
}

export default page;
