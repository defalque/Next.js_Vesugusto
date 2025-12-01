import { ORDERS_LIMIT } from "@/app/_lib/constants";

// ${shimmer} relative overflow-hidden

// Loading animation
export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full rounded before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-zinc-500/20 dark:before:via-black/30 before:to-transparent";

export function CartLinkSkeleton() {
  return (
    <li>
      <div
        className={`${shimmer} relative size-8 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
      />
    </li>
  );
}

export function UserAvatarSkeleton() {
  return (
    <li>
      <div
        className={`${shimmer} relative size-8 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
      />
    </li>
  );
}

export function SignedInSkeleton() {
  return (
    <>
      <CartLinkSkeleton />
      <UserAvatarSkeleton />
    </>
  );
}

export function SignInSkeleton() {
  return (
    <div
      className={`${shimmer} relative w-100 cursor-not-allowed divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white px-5 shadow-xl dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950`}
    >
      <div className="flex flex-col pb-5">
        <div className="mx-auto mt-8 size-10 rounded-full bg-gray-100 dark:bg-zinc-800" />
        <div className="mx-auto mt-6 h-6 w-65 rounded-lg bg-gray-100 dark:bg-zinc-800" />

        <div className="mt-8 space-y-2">
          <div className="h-7 w-85 rounded-lg bg-gray-100 dark:bg-zinc-800" />
          <div className="h-7 w-85 rounded-lg bg-gray-100 dark:bg-zinc-800" />
        </div>
      </div>

      <div className="flex flex-col py-5">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="h-4 w-22 rounded-lg bg-gray-100 dark:bg-zinc-800" />
            <div className="h-7 w-85 rounded-lg bg-gray-100 dark:bg-zinc-800" />
          </div>
          <div className="h-7 w-85 rounded-lg bg-gray-100 dark:bg-zinc-800" />
        </div>
      </div>

      <div className="mx-auto my-5 h-5 w-22 rounded-lg bg-gray-100 dark:bg-zinc-800" />
    </div>
  );
}

export function DynamicLinksSkeleton() {
  return (
    <>
      <CartLinkSkeleton />
      <li>
        <div
          className={`${shimmer} relative h-8 w-8 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
      </li>
    </>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`${shimmer} focus-style relative overflow-hidden rounded-3xl`}
      >
        <div className="aspect-2/3 w-full rounded-none bg-gray-100 sm:rounded-3xl dark:bg-zinc-800" />
      </div>

      <div className="mb-1 flex items-center px-2 py-0.5 sm:px-1">
        <div
          className={`${shimmer} relative h-4 w-2/3 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative ml-auto h-5 w-5 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
      </div>

      <div className="flex items-center gap-2 px-2 sm:px-1">
        <div
          className={`${shimmer} relative h-4 w-20 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
        />
      </div>
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento dei prodotti in corso...
      </p>
      <div
        aria-hidden
        className="mt-3 grid grid-cols-2 gap-x-6 gap-y-15 pb-15 transition-all duration-3000 ease-in-out md:grid-cols-3 lg:gap-y-18 xl:grid-cols-4"
      >
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </>
  );
}

export function ProductPageSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento della pagina del prodotto in corso...
      </p>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-5 sm:px-6 lg:px-10 xl:px-38 xl:py-12">
        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-y-0">
          {/* Breadcrumb */}
          <div className="col-start-1 mb-0 md:col-start-2 md:mb-8">
            <div
              className={`${shimmer} relative h-12 w-1/2 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
            />
          </div>

          {/* Image Skeleton */}
          <div className="md:row-span-full">
            <div className="flex w-full items-start gap-x-5">
              {/* Miniature */}
              <div className="hidden flex-col gap-4 lg:flex">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${shimmer} relative h-16 w-11 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
                  ></div>
                ))}
              </div>

              {/* Main Image */}
              <div
                className={`${shimmer} relative aspect-2/3 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800`}
              ></div>
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="flex flex-col gap-8">
            {/* Price */}
            <div
              className={`${shimmer} relative h-6 w-32 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
            />

            {/* Description */}
            <div className="space-y-2">
              <div
                className={`${shimmer} relative h-4 w-full overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
              />
              <div
                className={`${shimmer} relative h-4 w-4/5 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
              />
              <div
                className={`${shimmer} relative h-4 w-3/5 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
              />
            </div>

            {/* Quantity Selector */}
            <div
              className={`${shimmer} relative h-10 w-35 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
            />

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <div
                className={`${shimmer} relative h-12 w-42 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
              />
              <div
                className={`${shimmer} relative h-12 w-12 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
              />
            </div>

            {/* Accordions */}
            <div className="space-y-2">
              {["Dettagli", "Ingredienti", "Informazioni nutrizionali"].map(
                (label, index) => (
                  <div
                    key={index}
                    className={`${shimmer} relative h-14 w-full overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function CartProductCardSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento prodotti del carrello in corso...
      </p>
      <article
        aria-hidden
        className="xs:gap-x-5 grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-start gap-x-4"
      >
        <div
          className={`${shimmer} relative aspect-2/3 h-40 overflow-hidden rounded-lg bg-gray-100 sm:h-50 dark:bg-zinc-800`}
        />

        <div className="flex h-full w-full flex-col gap-2">
          <div
            className={`${shimmer} relative h-5 w-3/4 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
          />
          <div
            className={`${shimmer} relative h-4 w-1/4 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
          />
          <div
            className={`${shimmer} xs:block relative hidden h-4 w-full overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
          />
          <div
            className={`${shimmer} relative h-4 w-1/3 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
          />
        </div>

        <div
          className={`${shimmer} relative ml-auto h-5 w-5 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
      </article>
    </>
  );
}

export function CartProductsListSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento dei prodotti del carrello in corso...
      </p>
      <div
        aria-hidden
        className="grid min-h-screen cursor-not-allowed grid-cols-1 grid-rows-[auto_1fr] gap-x-10 gap-y-8 lg:grid-cols-[1.5fr_1fr] lg:grid-rows-[auto]"
      >
        {/* Product list skeleton */}
        <section aria-label="Caricamento prodotti nel carrello">
          <ul className={`divide-y divide-gray-200 dark:divide-zinc-800`}>
            {[...Array(2)].map((_, index) => (
              <li key={index} className="py-5">
                <CartProductCardSkeleton />
              </li>
            ))}
          </ul>
        </section>

        {/* Cart summary skeleton */}
        <section
          aria-label="Caricamento riepilogo carrello"
          className={`${shimmer} relative flex h-max flex-col gap-5 overflow-hidden rounded-md bg-gray-50 px-5 py-5 text-sm sm:text-base dark:bg-zinc-900/80`}
        >
          <div className="mb-4 h-6 w-1/2 rounded bg-gray-100 dark:bg-zinc-800" />

          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
            <ul className="flex flex-col gap-4 pb-4">
              {[...Array(2)].map((_, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="h-4 w-32 rounded bg-gray-100 dark:bg-zinc-800" />
                  <div className="h-4 w-20 rounded bg-gray-100 dark:bg-zinc-800" />
                </li>
              ))}
            </ul>

            <div className="space-y-4 pt-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="h-4 w-32 rounded bg-gray-100 dark:bg-zinc-800" />
                  <div className="h-4 w-20 rounded bg-gray-100 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 h-10 w-full rounded bg-gray-100 dark:bg-zinc-800" />
        </section>
      </div>
    </>
  );
}

export function AddressInfoSkeleton() {
  return (
    <div className={`flex flex-col gap-7 py-5`}>
      <div
        className={`${shimmer} relative h-5 w-40 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
      />

      <div className="xs:grid-cols-4 xs:gap-y-6 grid grid-cols-1 gap-x-5 gap-y-4 text-sm md:text-base">
        {/* Via */}
        <div className="col-span-3">
          <div
            className={`${shimmer} relative mb-2 h-10 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
          />
        </div>

        {/* Civico */}
        <div className="xs:col-span-1 col-span-3">
          <div
            className={`${shimmer} relative mb-2 h-10 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
          />
        </div>

        {/* Comune */}
        <div className="col-span-3">
          <div
            className={`${shimmer} relative mb-2 h-10 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
          />
        </div>

        {/* CAP */}
        <div className="xs:col-span-1 col-span-3">
          <div
            className={`${shimmer} relative mb-2 h-10 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
          />
        </div>

        <div className="col-span-full">
          <div
            className={`${shimmer} relative mb-2 h-10 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
          />
        </div>
      </div>
    </div>
  );
}

export function PaymentFormLoader() {
  return (
    <div className="flex flex-col gap-7 pt-8">
      <div
        className={`${shimmer} relative h-5 w-40 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
      />
      <div className="spinner" />
    </div>
  );
}

export function CheckoutWrapperSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento pagina di finalizzazione dell'acquisto in corso...
      </p>
      <div
        aria-hidden
        className="grid cursor-not-allowed grid-cols-1 gap-8 lg:grid-cols-2"
      >
        {/* Left Side – Indirizzo + children */}
        <div className="order-2 flex flex-col divide-y divide-gray-200 lg:order-1 dark:divide-zinc-800">
          <AddressInfoSkeleton />

          {/* <PaymentFormLoader /> */}
          <div className="flex flex-col gap-7 pt-8">
            <div
              className={`${shimmer} relative h-5 w-40 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
            />
            <div
              className={`${shimmer} relative h-12 w-full overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
            />
          </div>
        </div>

        {/* Right Side – Riepilogo prodotti */}
        <section
          className={`${shimmer} text-primary-dark-950 xxs:px-8 relative order-1 flex h-max flex-col gap-6 overflow-hidden bg-gray-50 px-3 py-5 lg:order-2 dark:bg-zinc-900/80`}
        >
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 rounded bg-gray-100 dark:bg-zinc-800" />
            <div className="mt-2 h-10 w-40 rounded-lg bg-gray-100 dark:bg-zinc-800" />
          </div>

          <div className="flex flex-col divide-y divide-gray-200 dark:divide-zinc-800">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6 py-8"
              >
                <div className="aspect-2/3 h-30 w-full rounded-lg bg-gray-100 dark:bg-zinc-800" />

                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 rounded bg-gray-100 dark:bg-zinc-800" />
                  <div className="h-3 w-48 rounded bg-gray-100 dark:bg-zinc-800" />
                  <div className="mt-auto h-4 w-20 rounded bg-gray-100 dark:bg-zinc-800" />
                </div>

                <div className="h-5 w-16 rounded bg-gray-100 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export function UserNameSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento nome in corso...
      </p>
      <span
        aria-hidden
        className={`${shimmer} relative h-[1em] w-60 overflow-hidden rounded-md bg-gray-100 dark:bg-zinc-800`}
      />
    </>
  );
}

function SkeletonBox({ className, rounded = "md" }) {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-${rounded} bg-gray-100 dark:bg-zinc-800 ${className}`}
    />
  );
}

export function UpdateProfileFormSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento informazioni del profilo in corso...
      </p>
      <form
        aria-hidden
        className="my-8 flex flex-col gap-4 text-xs sm:text-sm md:text-base"
      >
        <div className="grid w-full grid-cols-4 grid-rows-2 gap-5">
          <div className="col-span-full flex w-full flex-col space-y-2 lg:col-span-2">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-10 w-full sm:h-10" />
          </div>

          <div className="col-span-2 flex w-full flex-col space-y-2 lg:col-span-1">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-8 w-full sm:h-10" />
          </div>

          <div className="col-span-2 flex w-full flex-col space-y-2 lg:col-span-1">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-8 w-full sm:h-10" />
          </div>

          <div className="col-span-full flex w-full flex-col space-y-2 lg:col-span-2">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-8 w-full sm:h-10" />
          </div>

          <div className="col-span-full flex w-full flex-col space-y-2 lg:col-span-2">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-8 w-full sm:h-10" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row">
          <SkeletonBox
            rounded="full"
            className="h-8 w-32 self-baseline rounded sm:h-10 sm:w-48"
          />
        </div>
      </form>
    </>
  );
}

function OrderCardHeaderSkeleton() {
  return (
    <div className="flex cursor-not-allowed flex-col flex-wrap gap-x-10 gap-y-2 border-b border-b-gray-200 bg-gray-50 px-3 py-4 text-sm sm:flex-row sm:items-center md:px-5 md:text-base xl:px-10 dark:border-b-zinc-700/70 dark:bg-zinc-800/70">
      <div
        className={`${shimmer} relative h-4 w-24 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
      />
      <div
        className={`${shimmer} relative h-4 w-34 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
      />
      <div
        className={`${shimmer} relative h-4 w-24 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
      />

      <div
        className={`${shimmer} relative h-4 w-18 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
      />
    </div>
  );
}

function OrderCardItemSkeleton() {
  return (
    <div
      className={`grid grid-cols-[auto_1fr] grid-rows-[auto_auto_auto_auto] gap-x-3 px-3 py-4 font-light sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-5 md:px-5 lg:grid-rows-[auto_auto_auto] lg:py-8 xl:px-10`}
    >
      {/* Image Skeleton */}
      <div className="relative row-span-full aspect-2/3 h-50 sm:h-55">
        <div
          className={`${shimmer} absolute inset-0 overflow-hidden rounded-md bg-gray-100 dark:bg-zinc-800`}
        />
      </div>

      {/* Product Name */}
      <div
        className={`${shimmer} relative row-start-1 h-5 w-20 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
      />

      {/* Price */}
      <div
        className={`${shimmer} relative row-start-2 h-5 w-16 overflow-hidden rounded-xl bg-gray-100 sm:row-start-1 sm:justify-self-end dark:bg-zinc-800`}
      />

      {/* Description */}
      <div
        className={`${shimmer} relative col-span-2 mt-2 hidden h-16 overflow-hidden rounded-xl bg-gray-100 sm:row-start-2 sm:mt-0 sm:block dark:bg-zinc-800`}
      />

      {/* Quantity */}
      <div
        className={`${shimmer} relative col-span-2 col-start-2 row-start-3 h-5 w-24 overflow-hidden rounded-xl bg-gray-100 sm:self-end dark:bg-zinc-800`}
      />

      {/* Buttons */}
      <div className="text-primary-950 col-start-2 row-start-4 flex flex-wrap items-center gap-3 self-end text-sm font-semibold lg:col-start-3 lg:row-start-3">
        <div
          className={`${shimmer} relative h-4 w-24 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative h-4 w-24 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
        />
      </div>
    </div>
  );
}

export function OrdersListSkeleton() {
  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento ordini in corso...
      </div>
      <div aria-hidden className="relative flex flex-col gap-20">
        {Array.from({ length: ORDERS_LIMIT }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-x-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-zinc-700/70"
          >
            <OrderCardHeaderSkeleton />
            <OrderCardItemSkeleton />
          </div>
        ))}
      </div>
    </>
  );
}

function FavoriteCardSkeleton() {
  return (
    <div className="flex cursor-not-allowed flex-col gap-2">
      {/* Image placeholder */}
      <div
        className={`${shimmer} relative aspect-2/3 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800`}
      />

      {/* Text placeholders */}
      <div className="flex flex-col gap-1">
        <div
          className={`${shimmer} relative h-4 w-1/2 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative h-4 w-1/3 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
        />
      </div>

      {/* Button placeholder */}
      <div className="flex items-center justify-center gap-2">
        <div
          className={`${shimmer} relative h-6 w-7 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative h-6 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
      </div>
    </div>
  );
}

export function FavoritesListSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento dei prodotti preferiti in corso...
      </p>
      <div
        aria-hidden
        className="grid grid-cols-2 gap-x-10 gap-y-20 sm:gap-x-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <FavoriteCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

export function AccountNavLink() {
  return (
    <div className="inline-flex w-full justify-center">
      <div
        className={`${shimmer} relative h-6 w-6 overflow-hidden bg-gray-100 lg:w-40 dark:bg-zinc-800`}
      />
    </div>
  );
}

export function ThankYouPageSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento pagina di conferma dell'ordine in corso...
      </p>
      <div
        aria-hidden
        className="flex min-h-screen items-start justify-center px-5 py-10 md:px-30"
      >
        <section
          className={`_${shimmer} text-primary-dark-950 xs:px-5 _relative _overflow-hidden flex w-full max-w-4xl min-w-fit flex-col gap-10 rounded-lg bg-gray-50 px-3 py-5 dark:bg-zinc-900/80`}
        >
          {/* Title & Description */}
          <div className="animate-pulse space-y-5">
            <div className="mx-auto h-10 w-40 rounded bg-gray-100 sm:h-16 sm:w-64 dark:bg-zinc-800" />
            <div className="mx-auto h-4 w-full rounded bg-gray-100 sm:h-5 dark:bg-zinc-800" />
            <div className="mx-auto h-4 w-4/5 rounded bg-gray-100 sm:h-5 dark:bg-zinc-800" />
            <div className="flex flex-wrap justify-center gap-4">
              <div className="mt-2 h-10 w-48 rounded-full bg-gray-100 dark:bg-zinc-800" />
              <div className="mt-2 h-10 w-48 rounded-full bg-gray-100 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Order Info Card */}
          <div className="text-primary-dark-950 dark:bg-primary-dark-950 bg-primary-50 rounded-lg px-5 py-5 dark:text-gray-200">
            {/* Order ID and Total */}
            <div className="flex animate-pulse flex-wrap justify-between gap-4 text-xl font-semibold">
              <div className="h-6 w-40 rounded bg-gray-100 dark:bg-zinc-800" />
              <div className="h-6 w-32 rounded bg-gray-100 dark:bg-zinc-800" />
            </div>

            {/* Product List */}
            <div className="flex h-max animate-pulse flex-col divide-y divide-gray-200 dark:divide-zinc-800">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6 py-8"
                >
                  {/* Product Image */}
                  <div className="relative aspect-2/3 h-30 rounded bg-gray-100 dark:bg-zinc-800">
                    <div className="h-full w-full rounded-lg" />
                  </div>

                  {/* Product Info */}
                  <div className="flex h-full flex-col gap-2">
                    <div className="h-5 w-3/4 rounded bg-gray-100 dark:bg-zinc-800" />
                    <div className="xs:block hidden h-4 w-full rounded bg-gray-100 sm:h-5 dark:bg-zinc-800" />
                    <div className="mt-auto h-4 w-1/3 rounded bg-gray-100 dark:bg-zinc-800" />
                    <div className="mt-auto h-4 w-1/4 rounded bg-gray-100 dark:bg-zinc-800" />
                  </div>

                  {/* Product Total */}
                  <div className="h-5 w-16 rounded bg-gray-100 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export function BestSellerProductsSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento dei prodotti più amati in corso...
      </p>
      <div
        aria-hidden
        className="grid w-full grid-cols-2 gap-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
      >
        {[0, 1, 2].map((bestSeller, index) => (
          <div key={index} className="">
            <div className="flex flex-col gap-2">
              <div
                className={`${shimmer} relative aspect-2/3 w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-800`}
              >
                <div className="overflow-hidden" />
              </div>

              <div className="space-y-1">
                <div
                  className={`${shimmer} relative h-5 w-20 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
                />
                <div
                  className={`${shimmer} relative h-5 w-13 overflow-hidden rounded bg-gray-100 dark:bg-zinc-800`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function NewArrivalsProductsSkeleton() {
  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        Caricamento dei nuovi arrivi in corso...
      </p>
      <div aria-hidden className="spinner" />
    </>
  );
}

export function DisplaySkeleton() {
  return (
    <div className="z-50 mr-auto flex items-center">
      <div
        className={`${shimmer} relative mr-4 h-10 w-22 self-stretch overflow-hidden rounded-md bg-gray-100 md:h-10 dark:bg-zinc-800`}
      />
      <div className="h-10 w-[1px] bg-black dark:bg-white" />
      <div
        className={`${shimmer} relative mx-4 h-10 w-10 self-stretch overflow-hidden rounded-md bg-gray-100 md:h-10 dark:bg-zinc-800`}
      />
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div
      className={`${shimmer} relative h-10 w-16 self-stretch overflow-hidden rounded-xl bg-gray-100 md:h-full dark:bg-zinc-800`}
    />
  );
}

export function SearchInputSkeleton({ height }) {
  return (
    <div
      className={`${shimmer} ${height ? "md:h-10" : "md:h-full"} relative h-11 grow self-stretch overflow-hidden rounded-md bg-gray-100 sm:h-10 dark:bg-zinc-800`}
    />
  );
}

export function SortBySkeleton({ roundedLg }) {
  return (
    <div
      className={`${shimmer} relative h-11 self-stretch overflow-hidden sm:h-10 ${roundedLg ? "w-50 rounded-lg" : "w-25 rounded-md"} _md:h-full bg-gray-100 dark:bg-zinc-800`}
    />
  );
}

export function ToggleFilterMobileSkeleton() {
  return (
    <div
      className={`${shimmer} relative h-10 w-23 overflow-hidden rounded-full bg-gray-100 md:h-full dark:bg-zinc-800`}
    />
  );
}

export function ProductFiltersSkeleton() {
  return (
    <div className="flex max-h-fit w-full flex-col gap-y-5 overflow-y-auto pr-2 pb-3 pl-1 lg:mr-10 lg:w-60 lg:overflow-hidden lg:pr-1">
      <div
        className={`${shimmer} relative h-12 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-zinc-800`}
      />
      <div className="flex flex-wrap justify-center gap-5">
        <div
          className={`${shimmer} relative h-10 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative h-10 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
      </div>

      <div
        className={`${shimmer} relative h-12 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-zinc-800`}
      />
      <div className="flex flex-wrap justify-center gap-5">
        <div
          className={`${shimmer} relative h-10 w-30 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative h-10 w-30 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative h-10 w-30 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
        <div
          className={`${shimmer} relative h-10 w-30 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800`}
        />
      </div>
    </div>
  );
}

export function ProductsResolverSkeleton() {
  return (
    <>
      <section className="bgColor relative z-10 col-span-full col-start-1 row-start-1 mt-5 mb-2 sm:col-span-3 sm:mb-10 lg:col-span-2">
        <DisplaySkeleton />
      </section>
      <section
        className={`relative col-span-full row-start-3 mt-5 overflow-hidden lg:col-start-2 xl:row-start-2`}
      >
        <ProductListSkeleton />
      </section>
    </>
  );
}

export function ProductsControlsSkeleton() {
  return (
    <>
      <aside
        className={`sticky top-20 col-span-1 col-start-1 row-start-3 hidden h-fit overflow-y-auto lg:flex xl:row-start-2`}
      >
        <ProductFiltersSkeleton />
      </aside>
      <section
        className={`bgColor relative z-10 col-span-full row-start-2 mt-5 mb-5 flex h-11 w-full flex-wrap justify-end gap-x-5 gap-y-2 sm:col-start-1 sm:mb-10 sm:flex-row lg:h-12 xl:col-span-3 xl:col-start-3 xl:row-start-1`}
      >
        <div
          className={`${shimmer} relative hidden h-full w-35 overflow-hidden rounded-md bg-gray-100 lg:flex dark:bg-zinc-800`}
        />
        <SearchInputSkeleton />
        <div className="hidden lg:flex">
          <SortBySkeleton roundedLg />
        </div>
        <div className="flex lg:hidden">
          <SortBySkeleton />
        </div>
      </section>
    </>
  );
}

export function NavLinkSkeleton() {
  return (
    <div
      className={`${shimmer} relative h-8 w-13.5 cursor-not-allowed overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
    />
  );
}

export function CopyrightSkeleton() {
  return (
    <div
      className={`${shimmer} relative h-5 w-65 cursor-not-allowed overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800`}
    />
  );
}

export function AccountNavLinksSkeleton() {
  return (
    <div className="w-10 cursor-not-allowed space-y-4 md:w-50">
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <div
          key={i}
          className="flex w-full items-center justify-center gap-5 md:justify-start"
        >
          <div
            className={`${shimmer} relative h-7 w-7 overflow-hidden rounded-full bg-gray-100 md:h-6 md:w-6 dark:bg-zinc-800`}
          />
          <div
            className={`${shimmer} relative hidden h-6 w-30 overflow-hidden rounded-md bg-gray-100 md:inline dark:bg-zinc-800`}
          />
        </div>
      ))}
    </div>
  );
}

export function FooterNavLinksSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((_, i) => (
        <NavLinkSkeleton key={i} />
      ))}
    </>
  );
}

export function UserPageSkeleton({ font }) {
  return (
    <>
      <div className="flex cursor-not-allowed flex-col gap-5 pb-4">
        <h1
          aria-label="Messaggio di benvenuto"
          className={`${font.className} text-primary-dark-900 inline-flex max-w-fit min-w-fit flex-wrap items-center gap-2 text-4xl font-semibold sm:font-medium md:text-5xl dark:text-gray-200`}
        >
          Ciao <UserNameSkeleton />!
        </h1>

        <p className="text-sm tracking-wide text-black/65 sm:text-base dark:text-white/85">
          Per offrirti un servizio sempre migliore ti invitiamo ad aggiornare le
          tue informazioni personali.
        </p>
      </div>

      <section className="cursor-not-allowed">
        <UpdateProfileFormSkeleton />
      </section>
    </>
  );
}
