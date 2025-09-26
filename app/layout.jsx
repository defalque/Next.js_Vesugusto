import "@/app/_styles/globals.css";
import { noto } from "./_lib/font";

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
        className={`${noto.className} flex min-h-screen flex-col bg-white text-black antialiased dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
