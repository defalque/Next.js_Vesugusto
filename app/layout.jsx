import "@/app/_styles/globals.css";

import { Outfit, Nunito } from "next/font/google";
import { DarkModeProvider } from "./_components/contexts/DarkModeContext";
import Header from "./_components/ui/Header";
import DemoTag from "./_components/ui/DemoTag";
// import Image from "next/image";
// import vesugusto from "@/public/vesugusto.png";
// import Link from "next/link";

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
  openGraph: {
    title: "Vesusgusto",
    images: [
      {
        url: "/api/og?title=Vesugusto",
        width: 1200,
        height: 630,
        alt: "Vesugusto",
      },
    ],
  },
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
            {/* <DemoTag></DemoTag> */}
          </div>

          {/* <footer>
            <div className="flex flex-col items-center gap-8 w-full justify-center py-10 border-t border-t-gray-200 font-light mb-5">
              <Image
                src={vesugusto}
                alt="Vesugusto logo"
                width={100}
                height={100}
              ></Image>
              <div className="flex items-center text-md gap-10">
                <Link
                  href="about"
                  className="hover:text-primary-950 transition-colors duration-300 cursor-pointer"
                >
                  Chi Siamo
                </Link>
                <Link
                  href="products"
                  className="hover:text-primary-950 transition-colors duration-300 cursor-pointer"
                >
                  Prodotti
                </Link>
                <Link
                  href="create"
                  className="hover:text-primary-950 transition-colors duration-300 cursor-pointer"
                >
                  creIAmo
                </Link>
              </div>

              <div className="flex items-center gap-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-primary-800 hover:text-primary-600 cursor-pointer transition-colors duration-200"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.01 3.66 9.16 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03C18.34 21.23 22 17.08 22 12.07z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-primary-800 hover:text-primary-600 cursor-pointer transition-colors duration-200"
                >
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-primary-800 hover:text-primary-600 cursor-pointer transition-colors duration-200"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.49 8.49 0 01-2.7 1.03 4.26 4.26 0 00-7.25 3.88A12.1 12.1 0 013 5.15a4.26 4.26 0 001.32 5.68 4.24 4.24 0 01-1.93-.53v.05a4.26 4.26 0 003.42 4.17 4.28 4.28 0 01-1.93.07 4.27 4.27 0 003.98 2.96A8.54 8.54 0 012 19.54 12.05 12.05 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-primary-800 hover:text-primary-600 cursor-pointer transition-colors duration-200"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.48v-1.68c-2.78.62-3.37-1.36-3.37-1.36-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.9.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.37 9.37 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.7 1.03 1.61 1.03 2.74 0 3.93-2.34 4.79-4.57 5.04.36.32.68.95.68 1.92v2.85c0 .27.18.59.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              </div>

              <p className="font-light">
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-primary-950 font-normal">Vesugusto</span>{" "}
                by Marco De Falco, Inc. All rights reserved.
              </p>
            </div>
          </footer> */}
        </DarkModeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
