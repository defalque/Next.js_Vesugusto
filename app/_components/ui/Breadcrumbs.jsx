import Link from "next/link";

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="block">
      <ol
        className={
          "flex flex-wrap items-baseline text-xl break-all md:text-2xl"
        }
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`${breadcrumb.active ? "text-5xl" : "text-gray-500 dark:text-zinc-400"} `}
          >
            <Link href={breadcrumb.href} className="focus rounded">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
