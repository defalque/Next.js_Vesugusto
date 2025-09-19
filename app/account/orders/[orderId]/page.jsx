import { getOrder } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { orderId } = await params;
  return {
    title: `Dettagli ordine ${orderId}`,
    description: "Visualizza il tuo ordine.",
  };
}

export default async function Page({ params }) {
  const { orderId } = await params;
  const session = await auth();
  const order = await getOrder(session.user.userId, orderId);

  if (!order) {
    notFound();
  }

  return <div>Pagina in costruzione...</div>;
}
