import { SignInSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import { SignIn } from "@clerk/nextjs";

function page() {
  return (
    <div className="mt-5 flex justify-center pt-20 pb-30">
      <SignIn fallback={<SignInSkeleton />} />
    </div>
  );
}

export default page;
