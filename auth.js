import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { getCart, getUser } from "./app/_lib/data-service";
import { createUser } from "./app/_lib/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },

    async signIn({ user, account, profile }) {
      try {
        // console.log(user, "signIn");

        const existingUser = await getUser(user.email);
        if (!existingUser) await createUser(user.email, user.name, user.image);

        return true;
      } catch (err) {
        console.error("Errore durante la creazione dell'utente:", err);
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
        // console.log(user);

        const existingUser = await getUser(user.email);
        const cart = await getCart(existingUser.id);
        // console.log(existingUser.id);

        token.userId = existingUser.id;
        token.cartId = cart?.id || null;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.userId = token.userId;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.cartId = token.cartId;
      return session;
    },
  },
  pages: {
    signIn: "credentials/login",
  },
});
