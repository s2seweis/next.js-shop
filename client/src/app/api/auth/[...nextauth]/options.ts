import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import fetch from 'node-fetch';

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
        const { username, password } = credentials;
        // Find the user in the array based on the provided credentials
        const user = users.find(
          (user) => user.name === username && user.password === password,
        );
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
        token.userId = extractUserIdFromImageUrl(user.image); // Extract user ID from image URL and add to token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role; // Add role to session object
      if (token.userId) {
        const userData = await fetchUserData(token.userId); // Fetch user data
        session.user.userData = userData; // Append fetched user data to session object
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signIn/page',
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
