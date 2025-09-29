export const SelectedSnapDisplay = (props) => {
  const { selectedSnap, snapCount } = props;

  return (
    <div
      // aria-label={`Slide attualmente visualizzata sullo schermo: ${selectedSnap + 1} di ${snapCount}`}
      className="text-sm font-medium text-white sm:text-base"
    >
      <span
        aria-label={`Slide attualmente visualizzata sullo schermo: ${selectedSnap + 1} di ${snapCount}`}
      >
        {selectedSnap + 1} / {snapCount}
      </span>
    </div>
  );
};
