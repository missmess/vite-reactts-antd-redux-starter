import { BehanceSquareOutlined, HeartOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { RouteMenu } from '../types';
import Login from './login';

// 配置式路由菜单
export default [
  {
    name: '欢迎',
    path: '/',
    hideInMenu: true,
    icon: <HeartOutlined />,
    redirect: '/base',
  },
  {
    name: '基础信息',
    path: '/base',
    icon: <BehanceSquareOutlined />,
    component: () => <div className='li-content-block'>这里是基础信息</div>,
  },
  {
    name: '系统',
    path: '/system',
    icon: <SafetyCertificateOutlined />,
    routes: [
      {
        name: '导入的登录页',
        path: '/login1',
        icon: <UserOutlined />,
        component: Login, // 支持导入的组件
        meta: { homeContentStyle: { backgroundColor: 'white' } },
      },
      {
        name: '懒加载登录页',
        path: '/login2',
        icon: <UserOutlined />,
        component: React.lazy(() => import('./login')), // 支持懒加载的组件
      },
      {
        name: '登录页路径',
        path: '/login3',
        icon: <UserOutlined />,
        component: 'login/index.tsx', // 支持pages下的组件路径
        meta: { homeContentTips: '这是通过组件路径导入的登录页，仅支持pages目录下的组件' },
      },
    ],
  },
] as RouteMenu[];
