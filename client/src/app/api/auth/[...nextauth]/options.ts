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
      session.user.jwt = token.jwt; // Add username to session object
      session.user.email = token.email; // Add email to session object
      session.user.id = token.id;
      session.user.role = token.role;

      return session;
    },

    // ### - right approach


    // async signIn(user, account, profile) {
    //   try {
    //     if (account.provider === 'github') {
    //       // Retrieve user id from your database using GitHub's user login name
    //       const response = await axios.get(`http://localhost:3005/user/${profile.login}`);
    //       const { id } = response.data;

    //       // Attach the retrieved user id to the user object
    //       return {
    //         ...user,
    //         id,
    //       };
    //     }
    //   } catch (error) {
    //     console.error('Error retrieving user id:', error);
    //     return null;
    //   }
    // },

    // async signIn(credentials, req) {
    //   const { email, password } = credentials;

    //   try {
    //     // Make Axios request to login route
    //     const response = await axios.post('http://localhost:3005/login', {
    //       email,
    //       password,
    //     });

    //     // Check if the response is successful
    //     if (response.data) {
    //       // const { user_id } = response.data;
    //       return {
    //         ...response.data,
    //         jwt: response.data.token,
    //         email: email,
    //         id: response.data.userid,
    //         role: response.data.role,
    //         // name:response.data.name
    //       };
    //     } else {
    //       return null; // Return null if user not found
    //     }
    //   } catch (error) {
    //     console.error('Error logging in:', error);
    //     return null; // Return null if an error occurs
    //   }
    // },



  },

  pages: {
    signIn: '/auth/SignIn',
  },
};

