import Image from "next/image";
import Link from "next/link";
import biscotti from "@/public/biscotti.jpg";
import bronte_box from "@/public/bronte-box.jpg";
import salsa from "@/public/salsa.jpg";
import succo from "@/public/succo.jpg";
import succo_rosso from "@/public/succo-rosso.jpg";
import alcol from "@/public/alcol3.jpg";

async function NotFound() {
  const products = [
    { id: 1, name: "Scorzette", image: biscotti },
    { id: 2, name: "Bronte Vesuviano", image: bronte_box },
    { id: 3, name: "Oro Giallo", image: salsa },
    { id: 4, name: "Essenza d'Arancia", image: succo },
    { id: 5, name: "Rubino di Frutta", image: succo_rosso },
    { id: 6, name: "Ciliegi di Cenere", image: alcol },
  ];

  return (
    <main className="grid grid-cols-2 h-full gap-12">
      <div className="flex flex-col items-baseline gap-10 px-10">
        <h1 className="text-5xl font-semibold mt-40">
          Ops! Pagina non trovata
        </h1>
        <p className="text-lg">
          Non sembra che siamo arrivati al punto desiderato. Non preoccuparti
          però! Puoi sempre visitare i nostri{" "}
          <Link href="/products" className="text-primary-950 font-semibold">
            prodotti
          </Link>{" "}
          e trovare qualcosa di più interessante.
        </p>
      </div>
      <div className="grid grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="relative aspect-auto w-full">
            <Image
              src={product.image}
              alt={product.name}
              placeholder="blur"
              fill
              quality={80}
              priority={true}
              className="object-cover ark:brightness-80"
            ></Image>
          </div>
        ))}
      </div>
    </main>
  );
}

export default NotFound;
