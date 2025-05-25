import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import {
  createUserAndCart,
  getCart,
  getCartProductsCount,
  getUser,
} from "./app/_lib/data-service";

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
          newUser = await createUserAndCart({
            email: user.email,
            name: user.name,
            image: user.image,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const user = await getUser(session.user.email);
      session.user.userId = user.id;
      const cartId = await getCart(session.user.userId);
      session.user.cartId = cartId.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
