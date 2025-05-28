import Spinner from "@/app/_components/ui/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner></Spinner>
      <p className="text-xl text-primary-200">Caricamento ricette...</p>
    </div>
  );
}

export default Loading;
