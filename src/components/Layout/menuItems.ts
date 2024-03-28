// components/layout/menuItems.ts

export const menuItems = [
  {
    title: 'Home',
    path: '/',
    submenus: [
      { title: 'Contact', path: '/contact/page' },
      { title: 'Home', path: '/' },
    ],
  },
  {
    title: 'Posts',
    path: '/posts',
    submenus: [{ title: 'Home', path: '/' }],
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    submenus: [
      { title: 'Home', path: '/' },
      { title: '404 Page', path: '/404' },
    ],
  },
  // {
  //   title: 'Login',
  //   path: '/login',
  // },
];
