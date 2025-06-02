import Spinner from "@/app/_components/ui/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner></Spinner>
      <p className="text-xl text-primary-200 dark:text-gray-200">
        Caricamento...
      </p>
    </div>
  );
}

export default Loading;
