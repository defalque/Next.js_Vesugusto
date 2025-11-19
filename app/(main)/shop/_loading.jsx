import {
  DisplaySkeleton,
  ProductFiltersSkeleton,
  ProductListSkeleton,
  SearchSkeleton,
  SortBySkeleton,
  ToggleFilterMobileSkeleton,
} from "@/app/_components/ui/skeleton/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto mt-10 grid min-h-screen max-w-[95rem] cursor-not-allowed grid-cols-1 grid-rows-[auto_auto_1fr] overflow-clip px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:px-10">
      <aside
        className={`sticky top-20 row-start-3 hidden h-fit overflow-y-auto lg:flex`}
      >
        <ProductFiltersSkeleton />
      </aside>
      <section
        aria-label="Opzioni di ordinamento e azioni filtri"
        className={`bgColor relative z-10 col-span-full row-start-2 mt-5 mb-10 flex h-11 w-full flex-wrap justify-end gap-x-5 gap-y-2 sm:flex-row lg:h-12`}
      >
        <DisplaySkeleton />

        <SearchSkeleton />

        <div className="hidden md:flex">
          <SortBySkeleton />
        </div>

        <div className="relative self-stretch lg:hidden">
          <ToggleFilterMobileSkeleton />
        </div>
      </section>
      <section
        className={`relative col-span-full row-start-3 overflow-hidden lg:col-start-2`}
      >
        <ProductListSkeleton />
      </section>
    </div>
  );
}
