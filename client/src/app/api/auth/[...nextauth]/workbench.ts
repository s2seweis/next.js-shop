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

    async jwt({ token, user, account, profile }) {
      
      if (account) {
        token.jwt = user.jwt;
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;

        // Modify the user object to include additional data from dummyData
        if (profile && profile.dummyData) {
          token.userId = profile.dummyData.userId;
          // Add other data from dummyData if needed
        }
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

        // Add additional data from dummyData to the session object if available
        if (token.userId) {
          session.user.userId = token.userId;
        }
      }

      return session;
    },

    async signIn({ profile }) {
      // console.log('line:100', profile);

      try {
        // Make a POST request to your API route
        const response = await axios.post('http://localhost:3005/register-oauth', {
          email: profile.email,
          full_name: profile.name
        });

        console.log("line:101 - ###", response.data.user.userId);

        profile.dummyData = response.data.user.userId;
        console.log("line:102", profile.dummyData);
        

        // Return the modified profile object
        // return profile;
        return true;
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
