import Image from "next/image";
import background from "@/public/login.jpg";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[1.5fr_1fr] h-full gap-12">
      <div className="relative flex items-center justify-center">
        <Image
          src={background}
          alt="Food"
          fill
          placeholder="blur"
          quality={80}
          priority={true}
          className="object-cover brightness-40"
        ></Image>

        <div className="relative z-10">
          <h1 className=" text-7xl tracking-tight font-bold text-primary-50 max-w-fit mb-20">
            Gustati i nostri prodotti.<br></br> Inizia ora.
          </h1>
        </div>
      </div>
      <div className="py-1">{children}</div>
    </div>
  );
}

export default Layout;
