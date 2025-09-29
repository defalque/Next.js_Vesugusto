import { notoSerif } from "@/app/_lib/font";

function ProductHeading() {
  return (
    <div className="my-3 flex flex-col gap-5">
      <h1
        className={`${notoSerif.className} xs:text-4xl text-3xl font-semibold tracking-wide sm:font-medium lg:text-5xl`}
      >
        Il nostro shop
      </h1>
      {/* <p className="text-sm font-normal text-black/65 lg:text-base dark:text-white/85">
        Esplora il nostro ampio catalogo di prodotti. Utilizza i filtri per
        categoria e prezzo per trovare esattamente ciò che stai cercando. Ogni
        prodotto è descritto dettagliatamente per aiutarti nella tua scelta.
      </p> */}
    </div>
  );
}

export default ProductHeading;
