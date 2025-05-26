import Spinner from "../_components/ui/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner></Spinner>
      <p className="text-xl text-primary-200">Caricamento carrello...</p>
    </div>
  );
}

export default Loading;
