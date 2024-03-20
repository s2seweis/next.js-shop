import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from './index.tsx'; // Assuming Home page is defined in index.js
import Contact from '../pages/contact/page'
import Admin from '../pages/admin.tsx';
import NotFoundPage from '../pages/404.tsx'
import LoginPage from '../pages/auth/signIn/page.tsx';
import Server from '../pages/server.tsx';
import LoginForm from '../pages/login.tsx';
import Profile from '../pages/profile.tsx';
import Download from '../pages/download.tsx';
import Dashboard from '../pages/dashboard.tsx';
import Example from '../pages/example.tsx';
import { useSession } from 'next-auth/react';

const AppRouter = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("line:600", session);

  // Define the route mapping
  const routes = {
    '/': { component: Home },
    '/contact/page': { component: Contact },
    '/admin': { component: Admin, allowedRoles: ['admin'] },
    '/auth/signIn/page': { component: LoginPage },
    '/server': { component: Server, allowedRoles: ['user', 'admin'] },
    '/login': { component: LoginForm },
    // '/login': { component: LoginForm, allowedRoles: ['admin', 'user'] },
    '/profile': { component: Profile, allowedRoles: ['user', 'admin'] },
    '/download': { component: Download },
    '/dashboard': { component: Dashboard },
    '/example': { component: Example },
  };

  useEffect(() => {
    if (!session) return; // Return if session is not loaded yet

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

  // Get the component corresponding to the current route
  const Component = routes[router.pathname]?.component || NotFoundPage;

  return <Component />;
};

// Function to check if user's role allows access
const userHasAccess = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

export default AppRouter;
