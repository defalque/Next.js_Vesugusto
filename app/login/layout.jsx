import Image from "next/image";
import background from "@/public/login.jpg";
import img1 from "@/public/lapillove-2.jpg";
import img2 from "@/public/succo.jpg";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.5fr_1fr] h-full gap-2 xl:gap-12">
      <div className="relative hidden md:flex items-center justify-center">
        <Image
          src={background}
          alt="Food"
          fill
          placeholder="blur"
          quality={80}
          priority={true}
          className="object-cover brightness-40"
        ></Image>

        <div className="relative z-10 flex items-center justify-center">
          <h1 className="text-6xl xl:text-7xl tracking-tight text-center font-bold text-primary-50 max-w-fit mb-20 drop-shadow-[0_0_2px_#000]">
            Gustati i nostri prodotti.<br></br> Inizia ora.
          </h1>
        </div>
      </div>
      <div className="py-1">{children}</div>
    </div>
  );
}

export default Layout;
