import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Home from './index.tsx'; // Assuming Home page is defined in index.js
import Contact from '../pages/contact/page';
import Admin from '../pages/admin.tsx';
import NotFoundPage from '../pages/404.tsx';
import LoginPage from '../pages/auth/signIn/page.tsx';
import Server from '../pages/server.tsx';
import Register from '../pages/register.tsx';
import Profile from '../pages/profile.tsx';
import Download from '../pages/download.tsx';
import Dashboard from '../pages/dashboard.tsx';
import Example from '../pages/example.tsx';
import { useSession } from 'next-auth/react';

const AppRouter = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log('line:1', session);

  const [userData, setUserData] = useState(null);
  console.log('line:2', userData);
  const [userId, setUserId] = useState(null);

  // Define the route mapping
  const routes = {
    '/': { component: Home },
    '/contact/page': { component: Contact },
    '/admin': { component: Admin, allowedRoles: ['admin'] },
    '/auth/signIn/page': { component: LoginPage },
    '/server': { component: Server, allowedRoles: ['user', 'admin'] },
    '/register': { component: Register },
    // '/login': { component: Register, allowedRoles: ['admin', 'user'] },
    '/profile': { component: Profile, allowedRoles: ['user', 'admin'] },
    '/download': { component: Download },
    '/dashboard': { component: Dashboard },
    '/example': { component: Example },
  };

  useEffect(() => {
    if (!session) return; // Return if session is not loaded yet

    // Extract user ID from the image URL
    const userId = extractUserIdFromImageUrl(session.user.image);
    console.log('line:3', userId);
    setUserId(userId); // Set userId state

    // Get the current route
    const currentRoute = routes[router.pathname];

    // Check if the route exists
    if (!currentRoute) {
      router.push('/404');
      return;
    }

    // Check if the route requires authentication
    if (currentRoute.allowedRoles) {
      // Check if user's role allows access to the route
      if (!userHasAccess(session.user.role, currentRoute.allowedRoles)) {
        // Redirect to 404 page or another appropriate page
        router.push('/404');
      }
    }
  }, [router.pathname, session]); // Execute this effect when route changes or session changes

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error(
            'Failed to fetch user data from GitHub API:',
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, session]); // Include userId and session as dependencies

  // Get the component corresponding to the current route
  const Component = routes[router.pathname]?.component || NotFoundPage;

  return <Component />;
};

// Function to check if user's role allows access
const userHasAccess = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

// Function to extract user ID from the image URL
const extractUserIdFromImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  const regex = /\/u\/(\d+)\?v=/; // Modified regex to match the user ID from GitHub avatar URL
  const match = imageUrl.match(regex);
  return match ? match[1] : null;
};

export default AppRouter;
