import { Suspense } from "react";
import CheckoutWrapper from "./CheckoutWrapper";
import { CheckoutWrapperSkeleton } from "../../ui/skeleton/Skeletons";

async function CheckoutResolver({ checkoutParams }) {
  const params = await checkoutParams;

  return (
    <Suspense fallback={<CheckoutWrapperSkeleton />}>
      <CheckoutWrapper canceled={params?.canceled} />
    </Suspense>
  );
}

export default CheckoutResolver;
