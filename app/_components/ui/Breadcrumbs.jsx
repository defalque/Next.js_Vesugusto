import { notoSerif } from "@/app/_lib/font";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Percorso di navigazione" className="inline">
      <ol
        className={`_${notoSerif.className} xs:text-2xl _break-all _flex-wrap flex items-baseline text-xl font-semibold tracking-tight lg:text-2xl`}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            className={`${breadcrumb.active ? "xs:text-3xl mb-3 text-3xl lg:text-3xl" : "_text-gray-400 transition-colors duration-200 hover:text-zinc-700 active:text-zinc-700 dark:text-zinc-400"} flex items-center`}
          >
            <Link
              href={breadcrumb.href}
              aria-current={breadcrumb.active ? "page" : undefined}
              className="focus-style rounded"
              {...(breadcrumb.ariaLabel && {
                "aria-label": breadcrumb.ariaLabel,
              })}
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <ChevronRight className="mx-1 size-5.5" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
