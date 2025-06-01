function Spinner({ label = "" }) {
  return (
    <div className="grid items-center justify-center">
      <div className="spinner"></div>
      <p className="text-xl text-primary-200 dark:text-gray-200">{label}</p>
    </div>
  );
}

export default Spinner;
