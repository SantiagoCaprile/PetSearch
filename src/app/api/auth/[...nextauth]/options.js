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
        username: {
          label: "Username",
          type: "text",
          placeholder: "your-cool-username",
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
              name: user.user,
              email: credentials.email,
              role: user.role,
              ...user,
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
  },
};
