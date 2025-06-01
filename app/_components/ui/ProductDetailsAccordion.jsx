"use client";

import { useState } from "react";

function ProductDetailsAccordion({ productAttribute, label, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`flex flex-col gap-5 py-3 border-t border-t-gray-300 dark:border-t-dark-200 cursor-pointer ${
        isLast ? "border-b border-gray-300 dark:border-dark-200" : ""
      }`}
    >
      <div className="flex items-center" onClick={() => setOpen(!open)}>
        <span className="font-medium text-lg">{label}</span>
        <span className="ml-auto mr-2 relative w-5 h-5">
          <span className="absolute top-1/2 left-0 right-0 h-[2px] bg-primary-dark-900 dark:bg-gray-200 transform -translate-y-1/2 transition-all duration-300"></span>
          <span
            className={`absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary-dark-900 dark:bg-gray-200 transform -translate-x-1/2 transition-transform duration-300 origin-center ${
              open ? "-rotate-90" : "rotate-0"
            }`}
          ></span>
        </span>
      </div>
      {open && (
        <p className="mb-5 font-light pr-5 leading-relaxed cursor-default">
          {productAttribute}
        </p>
      )}
    </div>
  );
}

export default ProductDetailsAccordion;
