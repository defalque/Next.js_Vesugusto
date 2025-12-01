import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";

function AccountHeader({ isOpen, setIsOpen }) {
  return (
    <section className="fixed top-12 right-4 z-10 col-start-2 row-start-1 bg-transparent text-right md:top-17">
      <div className="px-4 py-2 xl:px-20">
        <button
          className="focus dark:bg-primary-dark-950/20 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-2 py-1 text-sm backdrop-blur-sm hover:bg-gray-100 sm:text-base dark:hover:bg-zinc-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-pressed={isOpen}
          aria-label={isOpen ? "Nascondi menu" : "Mostra menu"}
        >
          <span className="hidden text-sm md:inline-block">
            {isOpen ? "Nascondi menu" : "Mostra menu"}
          </span>

          {isOpen ? (
            <ArrowsPointingOutIcon className="size-6 sm:size-5" />
          ) : (
            <ArrowsPointingInIcon className="size-6 sm:size-5" />
          )}
        </button>
      </div>
    </section>
  );
}

export default AccountHeader;
