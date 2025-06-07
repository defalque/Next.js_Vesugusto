import "@/app/_styles/globals.css";

import { Outfit, Nunito } from "next/font/google";
import { DarkModeProvider } from "./_components/contexts/DarkModeContext";
import Header from "./_components/ui/Header";
import DemoTag from "./_components/ui/DemoTag";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Vesugusto",
    default: "Vesugusto",
  },
  description:
    "Vesugusto è un template e-commerce pensato per la vendita di prodotti tipici vesuviani. Integra una sezione shop moderna, autenticazione, AI per la generazione di ricette personalizzate e tutte le funzionalità tipiche di una web app professionale.",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased bg-primary-50 text-primary-dark-900 min-h-screen flex flex-col dark:bg-primary-dark-950 dark:text-gray-200`}
      >
        <DarkModeProvider>
          <Header></Header>

          <div className="flex-1 grid">
            <main className="mx-auto w-full">{children}</main>
          </div>
        </DarkModeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
