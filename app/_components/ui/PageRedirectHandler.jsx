"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PageRedirectHandler({ filters, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentPage = filters.page;

    // Se la pagina è fuori range, aggiorna la URL
    if (currentPage + 1 > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "0");

      router.replace(`?${params.toString()}`);
    }
  }, [filters.page, totalPages]);

  return null; // Nessun rendering
}
