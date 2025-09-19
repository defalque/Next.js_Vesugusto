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
            console.log("Navigazione bloccata!");
            e.preventDefault();
          }
        }}
        className={`${className} dark:border-primary-dark-300 dark:hover:border-primary-dark-100 bg-primary-950 hover:bg-primary-800 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 focus-visible:outline-primary-950 outline-primary-dark-100 disabled:bg-primary-800 dark:disabled:bg-primary-950/40 inset-shadow-primary-50/60 inline-flex items-center text-white inset-shadow-sm outline-offset-2 transition-colors duration-300 focus:outline focus-visible:outline-2 dark:inset-shadow-none ${disabled ? "dark:disabled:border-primary-dark-500 animate-pulse cursor-not-allowed text-shadow-none" : "cursor-pointer"} dark:border dark:text-shadow-md/10`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${className} dark:border-primary-dark-300 inset-shadow-primary-50/60 dark:hover:border-primary-dark-100 bg-primary-950 hover:bg-primary-800 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 focus-visible:outline-primary-950 outline-primary-dark-100 disabled:bg-primary-800 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 _inline-flex _items-center cursor-pointer text-white inset-shadow-sm outline-offset-2 transition-colors duration-300 focus:outline focus-visible:outline-2 disabled:cursor-not-allowed disabled:text-shadow-none dark:border dark:inset-shadow-none dark:text-shadow-md/10`}
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
