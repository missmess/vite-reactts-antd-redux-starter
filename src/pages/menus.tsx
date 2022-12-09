import { HeartOutlined } from '@ant-design/icons';
import React from 'react';
import { RouteMenu } from '../types';
import Welcome from './login';

// 配置式路由菜单
export default [
  {
    name: '欢迎',
    path: '/',
    icon: <HeartOutlined />,
    // component: Welcome,
    // component: React.lazy(() => import('./login'));,
    // component: 'login/index.tsx',
    component: () => <div className='li-content-block'>呵呵</div>,
  },
] as RouteMenu[];
