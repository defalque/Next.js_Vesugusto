import Image from "next/image";
import nextlogo from "@/public/next.svg";

function DemoTag() {
  return (
    <div className="bg-primary-800 dark:bg-primary-100 fixed bottom-4 left-4 z-50 flex w-max items-center gap-2 rounded-3xl px-3 py-2 shadow-lg">
      <Image src={nextlogo} width="55" height="55" alt="Next.js logo"></Image>
      <span className="text-primary-dark-900">demo app</span>
    </div>
  );
}

export default DemoTag;
