import { HiOutlineExclamationCircle } from "react-icons/hi2";

export default function FormError({ message, id }) {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      className="bg-primary-950/10 text-primary-950 flex max-w-sm items-start gap-2 rounded-lg p-2 text-xs sm:text-sm"
    >
      <HiOutlineExclamationCircle
        aria-hidden="true"
        className="size-5 shrink-0"
      />
      <span className="self-center hyphens-auto">{message}</span>
    </div>
  );
}
