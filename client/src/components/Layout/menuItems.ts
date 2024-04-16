// components/layout/menuItems.ts

export const menuItems = [
  {
    title: 'Menu',
    path: '/',
    submenus: [
      { title: 'Home', path: '/' },
      { title: 'Contact', path: '/contact/ContactForm' },
      // { title: 'SignIn', path: '/auth/SignIn' },
      // { title: 'Register', path: '/auth/Register' },
    ],
  },
  {
    title: 'Admin',
    path: '/admin',
    submenus: [
      { title: 'Dashboard', path: '/admin/AdminDashboard' },
      // { title: 'SignIn', path: '/auth/SignIn' },
      // { title: 'Register', path: '/auth/Register' },
    ],
  },
  {
    title: 'Account',
    path: '/user',
    submenus: [
      { title: 'User Account', path: '/user/Account' }
    ],
  },
  {
    title: 'Download',
    path: '/download',
    submenus: [{ title: 'Download', path: '/download/DownloadApp' }],
  },
];
