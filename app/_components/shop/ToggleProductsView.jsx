"use client";

import { useProductsView } from "@/app/_contexts/ProductsViewProvider";
import { LayoutGrid, Rows3 } from "lucide-react";

function ToggleProductsView() {
  const { view, setView } = useProductsView();

  return (
    <div className="flex h-10 items-center gap-1.5 rounded-md border border-zinc-200 px-1.5 text-zinc-400 dark:border-white/5 dark:bg-white/10">
      <button
        onClick={() => setView("grid")}
        className={`rounded-md p-1 ${view === "grid" ? "bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:text-white" : "text-zinc-400 hover:bg-zinc-100 hover:text-white dark:hover:bg-white/10"}`}
      >
        <LayoutGrid className="size-5" />
      </button>
      <button
        onClick={() => setView("list")}
        className={`rounded-md p-1 ${view === "list" ? "bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:text-white" : "text-zinc-400 hover:bg-zinc-100 hover:text-white dark:hover:bg-white/10"}`}
      >
        <Rows3 className="size-5" />
      </button>
    </div>
  );
}

export default ToggleProductsView;
