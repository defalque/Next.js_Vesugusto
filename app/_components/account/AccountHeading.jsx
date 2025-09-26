import { notoSerif } from "@/app/_lib/font";

function AccountHeading({ children, title, text, accessibleLabel }) {
  return (
    <section
      aria-labelledby={accessibleLabel}
      className="flex flex-col gap-5 pb-4"
    >
      <h1
        id={accessibleLabel}
        className={`${notoSerif.className} text-primary-dark-900 inline-flex max-w-fit min-w-fit flex-wrap items-center gap-2 text-4xl font-semibold sm:font-medium md:text-5xl dark:text-gray-200`}
      >
        {children || title}
      </h1>

      <h2 className="text-sm tracking-wide text-black/65 sm:text-base dark:text-white/85">
        {text}
      </h2>
    </section>
  );
}

export default AccountHeading;
