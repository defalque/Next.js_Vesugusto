"use client";
import Link from "next/link";

function Button({
  className = "",
  ariaLabel,
  ariaPressed,
  onClick,
  disabled,
  type,
  href,
  children,
  ...props
}) {
  if (href) {
    return (
      <Link
        href={href}
        onNavigate={(e) => {
          if (disabled) {
            // console.log("Navigazione bloccata!");
            e.preventDefault();
          }
        }}
        aria-label={ariaLabel}
        className={`${className} focus-visible:dark:ring-primary-950 focus-visible:ring-primary-dark-500/95 dark:border-primary-dark-300 active:bg-primary-800 dark:active:border-primary-dark-100 dark:active:bg-primary-950/40 dark:hover:border-primary-dark-100 bg-primary-dark-200 hover:bg-primary-dark-100 disabled:bg-primary-dark-200/75 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 outline-primary-dark-300 dark:disabled:bg-primary-950/40 inset-shadow-primary-50/60 inline-flex items-center text-white inset-shadow-sm ring-offset-transparent outline-offset-2 transition-colors duration-300 hover:shadow focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:outline-none active:shadow disabled:shadow-none disabled:inset-shadow-none dark:inset-shadow-none ${disabled ? "dark:disabled:border-primary-dark-500 animate-pulse cursor-not-allowed text-shadow-none" : "cursor-pointer"} dark:border dark:text-shadow-md/10`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${className} focus-visible:dark:ring-primary-950 focus-visible:ring-primary-dark-500/95 dark:border-primary-dark-300 inset-shadow-primary-50/60 active:bg-primary-800 dark:active:border-primary-dark-100 dark:active:bg-primary-950/40 dark:hover:border-primary-dark-100 bg-primary-dark-200 hover:bg-primary-dark-100 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 outline-primary-dark-300 disabled:bg-primary-dark-200/75 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 focus cursor-pointer text-white inset-shadow-sm ring-offset-transparent outline-offset-2 transition-colors duration-300 hover:shadow focus:ring-offset-2 focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:outline-none active:shadow disabled:cursor-not-allowed disabled:shadow-none disabled:inset-shadow-none disabled:text-shadow-none dark:border dark:inset-shadow-none dark:text-shadow-md/10`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
