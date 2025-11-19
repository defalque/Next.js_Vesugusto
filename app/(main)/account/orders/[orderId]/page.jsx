import { getOrder } from "@/app/_lib/data-service";
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
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return <div>Pagina in costruzione...</div>;
}
