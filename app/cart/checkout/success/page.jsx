import { getOrderSession, getUserOrder } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Page({ searchParams }) {
  const params = await searchParams;
  const sessionId = params.session_id;

  const session = await auth();

  const sessionOrder = await getOrderSession(session.user.userId, sessionId);

  if (!sessionOrder) {
    return redirect("/cart");
  }

  const order = await getUserOrder(session.user.userId, sessionOrder.id);

  return (
    <div className="grid grid-cols-2">
      <div></div>
      <div></div>
    </div>
  );
}

export default Page;
