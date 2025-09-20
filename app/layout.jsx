import "@/app/_styles/globals.css";

import { Nunito } from "next/font/google";

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
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
