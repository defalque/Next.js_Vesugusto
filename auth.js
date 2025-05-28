import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { createUserAndCart, getCart, getUser } from "./app/_lib/data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser)
          await createUserAndCart({
            email: user.email,
            name: user.name,
            image: user.image,
          });

        return true;
      } catch {
        return false;
      }
    },
    // async session({ session }) {
    //   try {
    //     const user = await getUser(session.user.email);

    //     if (user) {
    //       session.user.userId = user.id;
    //       const cart = await getCart(user.id);
    //       session.user.cartId = cart?.id || null;
    //     }

    //     return session;
    //   } catch (error) {
    //     console.error("Errore nel session callback", error);
    //     return session;
    //   }
    // },
    async jwt({ token, user }) {
      if (user) {
        // Solo al login aggiungiamo userId e cartId nel token
        const existingUser = await getUser(user.email);
        const cart = await getCart(existingUser.id);

        token.userId = existingUser.id;
        token.cartId = cart?.id || null;
      }
      return token;
    },

    async session({ session, token }) {
      // Prendiamo direttamente dal token i dati custom
      session.user.userId = token.userId;
      session.user.cartId = token.cartId;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
