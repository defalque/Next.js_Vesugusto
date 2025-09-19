import "@/app/_styles/globals.css";

import { Nunito } from "next/font/google";
import Header from "./_components/ui/header/Header";
// import DemoTag from "./_components/ui/DemoTag";
import { Toaster } from "react-hot-toast";
import Footer from "./_components/ui/footer/Footer";
import { toastStyle } from "./_lib/constants";

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
    "Vesugusto è un template e-commerce pensato per la vendita di prodotti tipici vesuviani. Integra una sezione shop moderna, autenticazione e tutte le funzionalità tipiche di una web app professionale.",
  applicationName: "Vesugusto",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  creator: "Marco De Falco",
};

function RootLayout({ children }) {
  return (
    <html lang="it">
      <body
        className={`${nunito.className} bg-primary-50 text-primary-dark-900 dark:bg-primary-dark-950 flex min-h-screen flex-col antialiased dark:text-gray-200`}
      >
        <Header></Header>

        <div className="grid flex-1">
          <main className="mx-auto w-full">{children}</main>
        </div>

        <Footer />

        <div id="headlessui-portal-root">
          {/* <!-- Rendered `Dialog` --> */}
        </div>

        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: {
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
            style: toastStyle,
          }}
        />
      </body>
    </html>
  );
}

export default RootLayout;
