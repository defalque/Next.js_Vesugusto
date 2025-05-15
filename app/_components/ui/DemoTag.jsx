import Image from "next/image";
import nextlogo from "@/public/next.svg";

function DemoTag() {
  return (
    <div className="flex items-center gap-2 bg-primary-100 dark:bg-primary-100 w-max px-2 py-2 rounded-3xl fixed bottom-4 right-4 z-50 shadow-lg">
      <Image src={nextlogo} width="55" height="55" alt="Next.js logo"></Image>
      <span className="text-primary-dark-900">demo app</span>
    </div>
  );
}

export default DemoTag;
