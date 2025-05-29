import OrderList from "@/app/_components/ui/OrderList";
import { getUserOrders } from "@/app/_lib/data-service";
import { auth } from "@/auth";

export const metadata = {
  title: "I tuoi ordini",
};

export default async function Page() {
  const session = await auth();
  const orders = await getUserOrders(session.user.userId);

  return (
    <div>
      <div className=" flex flex-col gap-5 pb-4 border-b border-b-gray-200">
        <h1 className="text-5xl font-medium tracking-wide">
          Storico degli ordini
        </h1>
        <h2 className="text-gray-500">
          Visualizza lo stato degli ordini recenti, gestisci i resi e scopri
          prodotti simili.
        </h2>
      </div>
      {orders.length > 0 ? (
        <OrderList orders={orders}></OrderList>
      ) : (
        <p className="mt-8">Non hai ancora effettuato nessun ordine.</p>
      )}
    </div>
  );
}
