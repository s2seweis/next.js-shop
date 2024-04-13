import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'your-cool-email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Make Axios request to login route
          const response = await axios.post('http://localhost:3005/login', {
            email,
            password,
          });

          // Check if the response is successful
          if (response.data) {
            // const { user_id } = response.data;
            return {
              ...response.data,
              jwt: response.data.token,
              email: email,
              id: response.data.userid,
              role: response.data.role,
              // name:response.data.name
            };
          } else {
            return null; // Return null if user not found
          }
        } catch (error) {
          console.error('Error logging in:', error);
          return null; // Return null if an error occurs
        }
      },
    }),
  ],

  callbacks: {
    // ###

    async jwt({ token, user, account }) {
      if (account) {
        token.jwt = user.jwt;
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    // ###

    async session({ session, token }) {
      if (token) {
        session.user.jwt = token.jwt; // Add username to session object
        session.user.email = token.email; // Add email to session object
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },

    // ### - right approach

    async signIn({ profile }) {
      console.log('line:100', profile);

      try {
        // Make a POST request to your API route
        const response = await axios.post('/api/signIn', {
          email: profile.email,
          name: profile.name,
        });

        if (response.status === 200) {
          return response.data.user; // Return user data
        } else {
          console.error('Error processing sign-in:', response.data.error);
          return true; // Fallback to default OAuth flow
        }
      } catch (error) {
        console.error('Error processing sign-in:', error);
        return true; // Fallback to default OAuth flow
      }
    },
  },

  pages: {
    signIn: '/auth/SignIn',
  },
};
