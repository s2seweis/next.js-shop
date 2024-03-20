import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define array of users
const users = [
  { id: '1', name: 'Dave', password: 'nextauth', role: 'admin' },
  { id: '2', name: 'Alice', password: 'password123', role: 'user' },
  { id: '3', name: 'Bob', password: 'securepassword', role: 'user' },
  // Add more users as needed
];

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    // after the auth i need to look with the email for the user profile in the db and if not available i need to build one
    // 2 tables (auth & profile)

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        // Find the user in the array based on the provided credentials
        const user = users.find(user => user.name === credentials?.username && user.password === credentials?.password);

        if (user) {
          // Return the user object with the role included
          return { ...user, role: user.role };
        } else {
          return null; // Return null if user not found
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to JWT token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Add role to session object
      return session;
    },
  },

  pages: {
    signIn: "/auth/signIn/page",
  },
};