import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { HiOutlineHandThumbUp } from "react-icons/hi2";

const status = {
  ready: {
    label: "In consegna",
    icon: (
      <HiOutlineHandThumbUp
        aria-hidden="true"
        className="size-4 text-blue-500 dark:text-blue-400"
      />
    ),
    color: "dark:text-blue-400 text-blue-500",
    bgColor: "dark:bg-blue-700/30 bg-blue-100",
  },
  delivered: {
    label: "Consegnato",
    icon: (
      <CheckCircleIcon
        aria-hidden="true"
        className="size-4.5 text-green-500 dark:text-green-400"
      />
    ),
    color: "text-green-500 dark:text-green-400",
    bgColor: "dark:bg-green-700/30 bg-green-100",
  },
  unconfirmed: {
    label: "In preparazione",
    icon: (
      <ExclamationCircleIcon
        aria-hidden="true"
        className="size-4.5 text-yellow-600 dark:text-yellow-400"
      />
    ),
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "dark:bg-yellow-700/30 bg-yellow-100",
  },
};

function OrderCardStatus({ orderStatus }) {
  if (!status[orderStatus]) return null; // fallback in caso di stato non previsto

  const { label, icon, bgColor, color } = status[orderStatus];

  return (
    <dl
      className={`flex items-center gap-1 self-start rounded-lg p-1 ${bgColor}`}
    >
      {icon}
      <dt className="sr-only">Stato ordine</dt>
      <dd className={`text-xs font-bold uppercase ${color}`}>{label}</dd>
    </dl>
  );
}

export default OrderCardStatus;
