import { getOrderSession, getUserOrder } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import biscotti from "@/public/biscotti.jpg";
import bronte_box from "@/public/bronte-box.jpg";
import salsa from "@/public/salsa.jpg";
import succo from "@/public/succo.jpg";
import succo_rosso from "@/public/succo-rosso.jpg";
import alcol from "@/public/alcol3.jpg";
import Image from "next/image";
import Link from "next/link";

async function Page({ searchParams }) {
  const params = await searchParams;
  // const sessionId = params.payment_inent;
  // console.log(sessionId);
  const paymentIntent = params.payment_intent;
  // console.log(paymentIntent);

  const session = await auth();
  // console.log(session.user.userId);

  // const sessionOrder = await getOrderSession(session.user.userId, sessionId);
  const sessionOrder = await getOrderSession(
    session.user.userId,
    paymentIntent
  );

  if (!sessionOrder) {
    return redirect("/cart");
  }

  const order = await getUserOrder(session.user.userId, sessionOrder.id);

  const products = [
    { id: 1, name: "Scorzette", image: biscotti },
    { id: 2, name: "Bronte Vesuviano", image: bronte_box },
    { id: 3, name: "Oro Giallo", image: salsa },
    { id: 4, name: "Essenza d'Arancia", image: succo },
    { id: 5, name: "Rubino di Frutta", image: succo_rosso },
    { id: 6, name: "Ciliegi di Cenere", image: alcol },
  ];

  return (
    <div className="grid grid-cols-2 h-full">
      <div className="p-10 flex flex-col gap-1.5 mt-30">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase text-green-800 font-bold">
            Pagamento efettuato
          </h2>
          {paymentIntent && (
            <p className="mt-2 text-xs uppercase text-gray-500 font-semibold">
              (Id ordine: {order[0].id})
            </p>
          )}
        </div>
        <h1 className="text-5xl font-bold mb-4">Grazie per il tuo ordine!</h1>
        <p className="text-md">
          Abbiamo ricevuto il tuo pagamento e ora possiamo dare il via
          all'elaborazione del tuo ordine. Puoi seguire l'avanzamento e tutti i
          dettagli nella sezione dei tuoi{" "}
          <Link
            href="/account/orders"
            className="text-primary-950 hover:text-primary-900"
          >
            ordini
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              placeholder="blur"
              fill
              quality={80}
              priority={true}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
