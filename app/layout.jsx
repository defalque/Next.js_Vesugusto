import "@/app/_styles/globals.css";
import { noto } from "./_lib/font";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { itIT } from "@clerk/localizations";
import Header from "./_components/ui/header/Header";
import Footer from "./_components/ui/footer/Footer";
import { Toaster } from "react-hot-toast";
import { toastStyle } from "./_lib/constants";

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
                password: {
                  title: "Inserisci password",
                  subtitle: "Inserisci la password associata al tuo account",
                  actionLink: "Usa un altro metodo",
                },
                alternativeMethods: {
                  title: "Usa un altro metodo",
                  subtitle: "Problemi ad accedere? Prova uno di questi metodi.",
                  actionText: "Non fa al tuo caso?",
                  actionLink: "Chiedi aiuto",
                  blockButton__emailCode: "Codice via email a {{identifier}}",
                },
                emailCode: {
                  title: "Controlla la tua email",
                  subtitle: "per continuare su Vesugusto",
                  resendButton:
                    "Non hai ricevuto nessun codice? Invia di nuovo",
                },
              },
              unstable__errors: {
                ...itIT.unstable__errors,
                form_password_length_too_short:
                  "Password troppo corta. Deve essere lunga almeno 8 carratteri.",
                form_password_incorrect:
                  "Password non corretta. Riprova o usa un altro metodo.",
                form_password_validation_failed: "bla",
                passwordComplexity: {
                  sentencePrefix: "La tua password deve contenere",
                  minimumLength: "{{length}} o più caratteri.",
                },
                zxcvbn: {
                  goodPassword:
                    "La tua password soddisfa tutti i requisiti necessari.",
                  notEnough: "La tua password non è abbastanza sicura.",
                },
              },
              userProfile: {
                ...itIT.userProfile,
                emailAddressPage: {
                  title: "Aggiungi indirizzo email",
                  formHint:
                    "Dovrai verificare questo indirizzo email prima che venga aggiunto al tuo account.",
                },
              },
            }}
            appearance={{
              cssLayerName: "clerk",
              layout: { logoLinkUrl: "/" },
              elements: {
                headerTitle:
                  "text-xl! sm:text-xl! text-primary-dark-700! dark:text-white!",
                cardBox:
                  "dark:border!  dark:border-zinc-800/80! dark:shadow-4xl! dark:shadow-zinc-800!",
                socialButtonsBlockButton:
                  "text-primary-dark-700! focus-visible:ring-primary-dark-200! dark:focus-visible:ring-primary-dark-100! focus-visible:ring-2! dark:bg-white! dark:hover:bg-white/90!",
                formFieldInput:
                  "focus-visible:ring-primary-dark-200! dark:text-white! dark:focus-visible:ring-primary-dark-100! focus-visible:ring-2! focus-visible:outline-none! placeholder:text-gray-400! dark:bg-zinc-900! dark:border! dark:border-zinc-800! dark:hover:border-zinc-700!",
                formButtonPrimary:
                  "bg-primary-dark-200! text-white! shadow-md! focus-visible:ring-primary-dark-200! dark:focus-visible:ring-primary-dark-100! focus-visible:ring-offset-2! focus-visible:ring-2! dark:focus-visible:ring-zinc-950! focus-visible:outline-none!",
                dividerLine: "dark:bg-zinc-800!",
                lastAuthenticationStrategyBadge:
                  "dark:border! dark:border-zinc-800! dark:bg-zinc-900!",
                formFieldAction__password: "dark:text-zinc-500!",
                footerActionLink: "dark:text-zinc-500!",
                identityPreviewEditButton: "dark:text-zinc-500!",
                formResendCodeLink: "dark:text-zinc-500!",
                backLink: "dark:text-zinc-500!",
                formFieldInputShowPasswordIcon:
                  "dark:text-zinc-600! dark:hover:text-zinc-500!",
                otpCodeFieldInput: "dark:border! dark:border-zinc-800!",
                alternativeMethodsBlockButton:
                  "dark:text-white/70! dark:border! dark:border-zinc-800! dark:hover:bg-zinc-900!",
                userButtonPopoverMain: "dark:divide-y! dark:divide-zinc-800!",
                userButtonPopoverCard:
                  "dark:border! dark:border-zinc-800! dark:divide-y! dark:divide-zinc-800!",
                userButtonPopoverActions:
                  "dark:divide-y! dark:divide-zinc-800!",
                userButtonPopoverActionButton:
                  "dark:text-white/90! dark:hover:bg-zinc-900/80!",
                userButtonPopoverCustomItemButton:
                  "dark:text-white/90! dark:hover:bg-zinc-900/80!",
                navbarButtonIcon: "dark:text-white/70!",
                navbarButtonText: "dark:text-white/70!",
                profileSectionPrimaryButton:
                  "dark:text-white/50! dark:hover:text-white/80! dark:hover:bg-zinc-900!",
                menuButtonEllipsis: "dark:text-white! dark:hover:bg-zinc-900!",
                menuList:
                  "dark:border! dark:border-zinc-800! dark:bg-zinc-900!",
                menuButton__connectedAccounts:
                  "dark:text-white/80! dark:hover:bg-zinc-900!",
                menuItem__connectedAccounts:
                  "dark:text-white! dark:hover:bg-zinc-800!",
                providerIcon__github: "bg-white! fill-white! rounded-full!",
                profilePage: "dark:divide-y! dark:divide-zinc-800!",
                modalCloseButton:
                  "dark:hover:bg-zinc-800/50! md:dark:hover:bg-zinc-900/80! dark:hover:text-white/80!",
                badge: "dark:text-white/80! dark:border! dark:border-zinc-800!",
                scrollBox:
                  "dark:border-l-none! sm:dark:border-l! sm:dark:border-zinc-800!",
                navbarMobileMenuButton:
                  "dark:hover:bg-zinc-800/50! dark:hover:text-white/80!",
                navbar:
                  "dark:border-r! dark:border-zinc-800! md:dark:border-none! dark:bg-zinc-900!",
                actionCard:
                  "dark:border! dark:border-zinc-800! dark:bg-zinc-900/30!",
                avatarImageActionsUpload:
                  "dark:border! dark:border-zinc-800! dark:text-white/50! dark:hover:bg-zinc-900! dark:hover:text-white!",
                formButtonReset: "dark:text-white/50! dark:hover:bg-zinc-900!",
                navbarButton: "dark:hover:bg-zinc-950!",
              },
            }}
          >
            <Header />

            <main className="mx-auto w-full flex-1 bg-inherit">{children}</main>

            <Footer />

            <Toaster
              position="top-right"
              gutter={12}
              toastOptions={{
                custom: {
                  duration: 5000,
                },
                success: {
                  duration: 5000,
                },
                error: {
                  duration: 5000,
                },
                style: toastStyle,
              }}
            />
          </ClerkProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;
