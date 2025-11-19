import "@/app/_styles/globals.css";
import { noto } from "./_lib/font";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { itIT } from "@clerk/localizations";

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
        <Suspense
          fallback={
            <div className="grid h-screen place-items-center">
              <div className="spinner"></div>
            </div>
          }
        >
          <ClerkProvider
            localization={{
              ...itIT,
              signIn: {
                ...itIT,
                start: {
                  ...itIT.signIn,
                  titleCombined: "Benvenuto su {{applicationName}}!",
                },
              },
            }}
            appearance={{
              cssLayerName: "clerk",
              layout: { logoLinkUrl: "/" },
              elements: {
                headerTitle:
                  "text-lg! sm:text-xl! text-primary-dark-700! _dark:text-white!",
                headerSubtitle:
                  "text-xs! sm:text-sm! text-primary-dark-700! _dark:text-white!",
                lastAuthenticationStrategyBadge: "text-primary-dark-700! ",
                footerActionText: "text-primary-dark-700!",
                footerActionLink: "text-primary-dark-700!",
                socialButtonsBlockButton: "text-primary-dark-700! _bg-white!",
              },
            }}
          >
            {children}
          </ClerkProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;
