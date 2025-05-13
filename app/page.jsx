import Image from "next/image";
import bg from "@/public/home-3.jpg";

export default function Page() {
  return (
    <div>
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        sizes="100vw"
        priority={true}
        className="object-fill object-top -z-10 brightness-60"
        alt="Prodotti tipici vesuviani."
      />
      <p className="text-orange-950 dark:text-orange-100">Home</p>
    </div>
  );
}
