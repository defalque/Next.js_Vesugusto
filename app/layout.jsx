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
                  titleCombined: "Unisiciti a noi",
                  subtitleCombined: "Accedi o Registrati per continuare",
                },
                password: {
                  title: "Inserisci password",
                  subtitle: "Inserisci la password associata al tuo account",
                  actionLink: "Usa un altro metodo",
                },
                forgotPassword: {
                  title: "Reimposta password",
                  subtitle_email:
                    "Inserisci il codice inviato al tuo indirizzo email",
                  resendButton: "Nessun codice ricevuto? Invia di nuovo",
                },
                alternativeMethods: {
                  title: "Usa un altro metodo",
                  subtitle: "Problemi ad accedere? Prova uno di questi metodi.",
                  actionText: "Non fa al tuo caso?",
                  actionLink: "Chiedi aiuto",
                  blockButton__emailCode: "Codice via email a {{identifier}}",
                  blockButton__password: "Accedi con la tua password",
                  getHelp: {
                    title: "Chiedi aiuto",
                    content:
                      "Se riscontri problemi nell'accesso al tuo account, inviaci un'e-mail e lavoreremo con te per ripristinare l'accesso il prima possibile.",
                    blockButton__emailSupport: "Supporto email",
                  },
                },
                emailCode: {
                  title: "Controlla la tua email",
                  subtitle: "per continuare su Vesugusto",
                  resendButton:
                    "Non hai ricevuto nessun codice? Invia di nuovo",
                },
                forgotPasswordAlternativeMethods: {
                  blockButton__resetPassword: "Reimposta la tua password",
                  label__alternativeMethods:
                    "Oppure, accedi con un altro metodo",
                  title: "Password dimenticata?",
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
              elements: {
                main: "[&_.cl-formFieldInput]:focus-visible:ring-primary-dark-200! [&_.cl-formFieldInput]:dark:text-white! [&_.cl-formFieldInput]:dark:focus-visible:ring-primary-dark-100! [&_.cl-formFieldInput]:max-h-none! [&_.cl-formFieldInput]:h-11! [&_.cl-formFieldInput]:text-base! [&_.cl-formFieldInput]:focus-visible:ring-2! [&_.cl-formFieldInput]:focus-visible:outline-none! [&_.cl-formFieldInput]:placeholder:text-gray-400! [&_.cl-formFieldInput]:dark:bg-white/10! [&_.cl-formFieldInput]:placeholder:text-black/30! [&_.cl-formFieldInput]:dark:placeholder:text-white/30! [&_.cl-formFieldLabel]:text-sm! sm:[&_.cl-formFieldLabel]:text-base! [&_.cl-formFieldInput]:placeholder:text-sm! sm:[&_.cl-formFieldInput]:placeholder:text-[15px]! sm:[&_svg]:mt-0.5! sm:[&_.cl-formFieldSuccessText]:text-sm! sm:[&_.cl-formFieldErrorText]:text-sm! sm:[&_.cl-formFieldInfoText]:text-sm!",
                cardBox: "shadow-none!  min-w-xs! xs:min-w-md! sm:min-w-lg!",
                card: "sm:[&_.cl-headerTitle]:text-3xl! [&_.cl-headerTitle]:text-2xl! sm:[&_.cl-headerSubtitle]:text-lg! [&_.cl-headerSubtitle]:text-base! [&_.cl-headerSubtitle]:mt-0.5! sm:[&_.cl-headerSubtitle]:mt-0.5! [&_.cl-headerSubtitle]:mb-1! bg-inherit! border-none! shadow-none! ",
                profilePage__account: "[&_.cl-headerTitle]:text-lg!",
                profilePage__security: "[&_.cl-headerTitle]:text-lg!",
                socialButtonsBlockButton:
                  "text-primary-dark-700! focus-visible:ring-primary-dark-200! dark:focus-visible:ring-primary-dark-100! focus-visible:ring-2!  dark:bg-white/10! dark:hover:bg-white/15!",
                socialButtonsBlockButtonText:
                  "text-sm! sm:text-base! text-black! dark:text-white!",
                formFieldInputShowPasswordButton: "h-9!",
                formButtonPrimary:
                  "bg-primary-dark-200! text-white! shadow-md! text-base! py-2! focus-visible:ring-primary-dark-200/90! dark:focus-visible:ring-primary-950/80! focus-visible:ring-4! focus-visible:ring-offset-[3px]! focus-visible:outline-none!",
                dividerLine: "dark:bg-zinc-800!",
                lastAuthenticationStrategyBadge:
                  "dark:border! dark:border-zinc-800! dark:bg-zinc-900!",
                formFieldAction__password: "dark:text-zinc-500! text-sm!",
                footerActionLink: "dark:text-zinc-500! text-sm!",
                footerActionText: "text-sm!",
                identityPreviewEditButton: "dark:text-zinc-500!",
                formResendCodeLink: "dark:text-zinc-500!",
                backLink: "dark:text-zinc-500!",
                formFieldInputShowPasswordIcon:
                  "dark:text-zinc-600! dark:hover:text-zinc-500! size-5!",
                otpCodeFieldInput:
                  "dark:border! dark:border-zinc-700! dark:text-white!",
                alternativeMethodsBlockButton:
                  "dark:text-white/70! h-9! text-sm! dark:border! dark:border-zinc-800! dark:hover:bg-zinc-900! mt-1!",
                alternativeMethodsBlockButtonText: "text-sm!",
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
                providerIcon__github: "dark:invert-[1]!",
                profilePage: "dark:divide-y! dark:divide-zinc-800!",
                modalCloseButton:
                  "dark:hover:bg-zinc-800/50! md:dark:hover:bg-zinc-900/80! dark:hover:text-white/80!",
                badge: "dark:text-white/80! dark:border! dark:border-zinc-800!",
                scrollBox:
                  "dark:border-l-none! sm:dark:border-l! sm:dark:border-zinc-800! ",
                navbarMobileMenuButton:
                  "dark:hover:bg-zinc-800/50! dark:hover:text-white/80!",
                navbar:
                  "dark:border-r! dark:border-zinc-800! md:dark:border-none! dark:bg-zinc-900!",
                actionCard:
                  "dark:border! dark:border-zinc-800! dark:bg-zinc-900/30! [&_.cl-headerTitle]:text-base! [&_.cl-formButtonPrimary]:text-sm!",
                avatarImageActionsUpload:
                  "dark:border! dark:border-zinc-800! dark:text-white/50! dark:hover:bg-zinc-900! dark:hover:text-white!",
                formButtonReset: "dark:text-white/50! dark:hover:bg-zinc-900!",
                navbarButton: "dark:hover:bg-zinc-950!",
                footer: "-mt-3! pt-0! bg-inherit! bg-none!",
                footerAction: "bg-white! dark:bg-black! border-none!",
                identityPreviewText: "text-sm!",
                backLink: "text-sm! text-black/80! dark:text-white/40!",
                modalContent:
                  "dark:[&_.cl-cardBox]:border! dark:[&_.cl-cardBox]:border-zinc-800!",
                userButtonPopoverCard:
                  "dark:border! dark:border-zinc-800! divide-y! divide-y-white!",
                userButtonPopoverMain:
                  "dark:border-b! dark:border-zinc-800! dark:divide-y! dark:divide-zinc-800! ",
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
