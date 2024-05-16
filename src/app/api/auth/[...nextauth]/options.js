import CredentialsProvider from "next-auth/providers/credentials";
import { verifyCredentials } from "../../../../lib/auth";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {
        // Call the API to verify the credentials and get the user object
        try {
          const user = await verifyCredentials(credentials);
          if (user.user) {
            console.log(user);
            // Return an object with the user's name, email, and role
            return {
              ...user,
              id: user.id ?? "777",
              name: user.user,
              email: credentials.email,
              role: user.role ?? "user",
            };
          } else {
            return null;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    // 5 minutes
    maxAge: 5 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
