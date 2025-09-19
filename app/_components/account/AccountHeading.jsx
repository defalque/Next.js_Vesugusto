function AccountHeading({ children, title, text, accessibleLabel }) {
  return (
    <section
      aria-labelledby={accessibleLabel}
      role="region"
      className="flex flex-col gap-5 pb-4"
    >
      <h1
        id={accessibleLabel}
        className="text-primary-dark-900 inline-flex flex-wrap items-center gap-2 text-3xl font-medium md:text-5xl dark:text-gray-200"
      >
        {children || title}
      </h1>

      <p className="text-sm tracking-wide text-gray-500 md:text-base dark:text-gray-300">
        {text}
      </p>
    </section>
  );
}

export default AccountHeading;
