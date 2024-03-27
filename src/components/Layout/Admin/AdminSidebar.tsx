import React, { useState } from 'react';
import { Icon } from './Icon.jsx';
import '../../../styles/scss/layout/admin/side.css';
import { Sidebar, Menu, MenuItem, useProSidebar, collapseSidebar, SubMenu } from 'react-pro-sidebar';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminSidebar = () => {
  const { collapseSidebar } = useProSidebar();

  const [favorite, setFavorite] = useState(false);
  const router = useRouter();

  const toggleFavorite = () => setFavorite((prev) => !prev);

  return (
    <nav className="content-admin-wrapper-sidebar">
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar width={'140px'} collapsedWidth={'80px'} defaultCollapsed={true}>
          <Menu>
            <MenuItem
              active={router.pathname === '/admin/dashboard'}
              icon={<Icon name="dashboard" />}
            >
              <Link href="/admin/dashboard">Dashboard</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/ingredients'}
              icon={<Icon name="messages" />}
            >
              <Link href="/admin/ingredients">Ingredients</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/settings'}
              icon={<Icon name="settings" />}
            >
              <Link href="/admin/settings">Settings</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/posts'}
              icon={<Icon name="posts" />}
            >
              <Link href="/admin/posts">Posts</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/users'}
              icon={<Icon name="users" />}
            >
              <Link href="/admin/users">Users</Link>
            </MenuItem>
            <SubMenu
              label="Stages"
              icon={<Icon name="products" />}
              active={router.pathname === '/admin/products'}
            >
              <MenuItem active={router.pathname === '/admin/products'}>
                <Link href="/admin/products">Products</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem
              active={router.pathname === '/admin/orders'}
              icon={<Icon name="orders" />}
            >
              <Link href="/admin/orders">Orders</Link>
            </MenuItem>
            <MenuItem
              active={router.pathname === '/admin/docs'}
              icon={<Icon name="book-2" />}
            >
              <Link href="/admin/docs">Docs</Link>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  toggleFavorite();
                  collapseSidebar()
                }}
                className="top-rated-car-react-button"
              >
                {favorite ? (
                  <FiArrowLeftCircle
                    style={{ color: '#F76631', width: '24px', height: '24px' }}
                  />
                ) : (
                  <FiArrowRightCircle
                    style={{ color: '#F76631', width: '24px', height: '24px' }}
                  />
                )}
              </button>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </nav>
  );
};

export default AdminSidebar;
