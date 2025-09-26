import { useRef } from "react";

function RangeSlider({
  selectedIndex,
  scrollSnaps,
  onChange,
  onDotButtonClick,
  ...props
}) {
  const { length } = props;
  const rangeRef = useRef(null);

  const handleRangeScroll = (e) => {
    e.preventDefault();

    const delta = e.deltaY || e.deltaX;
    const direction = delta > 0 ? 1 : -1;

    const currentValue = Number(rangeRef.current.value);
    const newValue = Math.min(
      Math.max(currentValue + direction, 0),
      scrollSnaps.length - 1,
    );

    if (newValue !== currentValue) {
      onDotButtonClick(newValue);
    }
  };

  return (
    <input
      ref={rangeRef}
      type="range"
      min={0}
      max={scrollSnaps.length - 1}
      value={selectedIndex}
      onChange={onChange}
      onWheel={handleRangeScroll}
      className="custom-control-focus rounded-full"
      aria-label="Scrolla tra le slide"
    />
  );
}

export default RangeSlider;
