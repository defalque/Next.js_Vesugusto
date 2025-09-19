function ProductHeading() {
  return (
    <div className="flex flex-col gap-5">
      <h1
        id="heading-ecommerce"
        className="xs:text-4xl text-3xl font-medium tracking-wide lg:text-5xl"
      >
        Il nostro shop
      </h1>
      <p className="text-sm font-normal text-gray-500 lg:text-base dark:text-gray-300">
        Esplora il nostro ampio catalogo di prodotti. Utilizza i filtri per
        categoria e prezzo per trovare esattamente ciò che stai cercando. Ogni
        prodotto è descritto dettagliatamente per aiutarti nella tua scelta.
      </p>
    </div>
  );
}

export default ProductHeading;
