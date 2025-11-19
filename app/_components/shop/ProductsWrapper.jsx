// "use client";

// import * as m from "motion/react-m";

function ProductsWrapper({ children }) {
  return (
    <div
      //layout
      //   transition={{ duration: 0.2, bounce: 0 }}
      //   transition={{
      //     duration: 0.2,
      //     bounce: 0,
      //   }}
      className="relative mx-auto grid w-full grid-cols-2 gap-x-6 gap-y-15 overflow-hidden py-3 pb-15 sm:grid-cols-2 md:grid-cols-3 lg:gap-y-18 xl:grid-cols-4"
    >
      {children}
    </div>
  );
}

export default ProductsWrapper;
