import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import fetch from 'node-fetch';
import axios from 'axios';
import Cookies from 'js-cookie';

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

    // Credentials provider
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username:',
    //       type: 'text',
    //       placeholder: 'your-cool-username',
    //     },
    //     password: {
    //       label: 'Password:',
    //       type: 'password',
    //       placeholder: 'your-awesome-password',
    //     },
    //   },
    //   async authorize(credentials) {
    //     const { username, password } = credentials;
    //     // Find the user in the array based on the provided credentials
    //     const user = users.find(
    //       (user) => user.name === username && user.password === password,
    //     );
    //     if (user) {
    //       // Return the user object with the role included
    //       return { ...user, role: user.role };
    //     } else {
    //       return null; // Return null if user not found
    //     }
    //   },
    // }),
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
        console.log("line:1", email);
        
        // Find the user in the array based on the provided credentials
      
        try {
          // Make Axios request to login route
          const response = await axios.post('http://localhost:3005/login', { email, password });
          console.log("line:500", response);
          console.log("line:600", response.data.userid);
          
          
          // Check if the response is successful
          if (response.data) {
            const { user_id } = response.data;
            return { ...response.data, jwt: response.data.token, email: email, id: response.data.userid };
          } else {
            return null; // Return null if user not found
          }
        } catch (error) {
          console.error('Error logging in:', error);
          return null; // Return null if an error occurs
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.jwt = user.jwt;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.jwt = token.jwt; // Add username to session object     
      session.user.email = token.email; // Add email to session object  
      session.user.id = token.id;
   
      return session;
    },
  },

  pages: {
    signIn: '/auth/SignIn',
  },
};

const extractUserIdFromImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  const match = imageUrl.match(/\/u\/(\d+)\?/); // Adjusted regex pattern to match the ID after '/u/'
  return match ? match[1] : '';
};

// Function to fetch user data from GitHub API by user ID
const fetchUserData = async (userId: string) => {
  try {
    const response = await fetch(`https://api.github.com/user/${userId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        'Failed to fetch user data from GitHub API:',
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
