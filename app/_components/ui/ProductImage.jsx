"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

function ProductImage({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex items-start gap-x-5">
      {product.image.at(1) && (
        <div className="flex flex-col items-center gap-4">
          {product.image.map((img, index) => (
            <button
              key={index + 1}
              className="relative w-11 h-17"
              disabled={selectedImage === index}
              onMouseOver={() => setSelectedImage(index)}
            >
              <Image
                src={img}
                alt={`${product.name}-${index + 1}`}
                fill
                quality={80}
                priority={true}
                className={`object-cover dark:brightness-80`}
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-2/3 w-full">
        {product.image.map((img, index) => (
          <div
            key={index + 1}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              selectedImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`${product.name}-${index + 1}`}
              fill
              quality={80}
              priority={true}
              className="object-cover dark:brightness-80"
            />
          </div>
        ))}

        {product.image.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
            <ChevronLeftIcon
              className="text-primary-50 cursor-pointer size-10"
              onClick={() =>
                setSelectedImage(
                  (selectedImage - 1 + product.image.length) %
                    product.image.length
                )
              }
            />
            <ChevronRightIcon
              className="text-primary-50 cursor-pointer size-10"
              onClick={() =>
                setSelectedImage((selectedImage + 1) % product.image.length)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImage;
