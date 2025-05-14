import "@/app/_styles/globals.css";
import { Outfit } from "next/font/google";
import { DarkModeProvider } from "./_components/contexts/DarkModeContext";
import Header from "./_components/ui/Header";
import DemoTag from "./_components/ui/DemoTag";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Vesugusto",
    default: "Vesugusto",
  },
  description: "Da aggiungere",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased bg-amber-50 text-orange-950 min-h-screen flex flex-col dark:bg-orange-950 dark:text-orange-100`}
      >
        <DarkModeProvider>
          <Header></Header>
          <div className="flex-1 grid">
            <main className="mx-auto w-full">{children}</main>
            <DemoTag></DemoTag>
          </div>
          <footer></footer>
        </DarkModeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
