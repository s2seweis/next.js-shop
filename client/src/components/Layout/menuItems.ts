// components/layout/menuItems.ts

export const menuItems = [
  {
    title: 'Home',
    path: '/',
    submenus: [
      { title: 'Contact', path: '/contact/ContactForm' },
      { title: 'SignIn', path: '/auth/SignIn' },
      { title: 'Register', path: '/auth/Register' },
    ],
  },
  {
    title: 'Admin',
    path: '/posts',
    submenus: [
      { title: 'Dashboard', path: '/admin/AdminDashboard' },
      // { title: 'SignIn', path: '/auth/SignIn' },
      // { title: 'Register', path: '/auth/Register' },
    ],
  },
  {
    title: 'Profile',
    path: '/dashboard',
    submenus: [
      { title: 'User Profile', path: '/profile/UserProfile' },
      { title: 'Orders', path: '/profile/server' },
    ],
  },
  {
    title: 'Download',
    path: '/download',
    submenus: [{ title: 'Download APP', path: '/download/DownloadApp' }],
  },
];
