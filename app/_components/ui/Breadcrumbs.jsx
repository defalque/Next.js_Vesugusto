import { notoSerif } from "@/app/_lib/font";
import Link from "next/link";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Percorso di navigazione" className="inline">
      <ol
        className={`${notoSerif.className} xs:text-2xl flex flex-wrap items-baseline text-xl break-all lg:text-3xl`}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            className={`${breadcrumb.active ? "xs:text-4xl my-3 text-3xl font-semibold tracking-wide sm:font-medium lg:text-5xl" : "text-gray-500 transition-colors duration-200 hover:text-zinc-700 active:text-zinc-700 dark:text-zinc-400"} `}
          >
            <Link
              href={breadcrumb.href}
              aria-current={breadcrumb.active ? "page" : undefined}
              className="focus rounded"
              {...(breadcrumb.ariaLabel && {
                "aria-label": breadcrumb.ariaLabel,
              })}
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span aria-hidden className="mx-3 inline-block">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
