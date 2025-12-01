import { notoSerif } from "@/app/_lib/font";

function AccountHeading({ children, title, text, accessibleLabel }) {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <h1
        {...(accessibleLabel && {
          "aria-label": accessibleLabel,
        })}
        className={`${notoSerif.className} text-primary-dark-900 inline-flex max-w-fit min-w-fit flex-wrap items-center gap-2 text-3xl font-semibold sm:font-medium md:text-4xl dark:text-gray-200`}
      >
        {children || title}
      </h1>

      <p className="text-sm text-black/65 sm:text-base dark:text-white/85">
        {text}
      </p>
    </div>
  );
}

export default AccountHeading;
