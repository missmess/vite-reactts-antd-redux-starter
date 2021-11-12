import {
  AndroidOutlined,
  AppleOutlined,
  BugOutlined,
  CalendarOutlined,
  CloudUploadOutlined,
  DeliveredProcedureOutlined,
  IeOutlined,
  QqOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { RouteMenu } from '@/types';

export default [
  {
    path: '/welcome',
    name: '欢迎',
    icon: <CalendarOutlined />,
    component: React.lazy(() => import('./welcome')),
  },
  {
    path: '/car',
    name: '单车分析',
    icon: <UserOutlined />,
    routes: [
      {
        path: '/car/sale',
        name: '单车销量',
        icon: <CloudUploadOutlined />,
        routes: [
          {
            path: '/car/sale/rank',
            name: '排行榜',
            icon: <IeOutlined />,
            component: React.lazy(() => import('./car/sale/rank')),
          },
          {
            path: '/car/sale/win',
            name: '销售冠军',
            icon: <QqOutlined />,
            component: React.lazy(() => import('../404')),
          },
        ],
      },
    ],
  },
  {
    path: '/error',
    name: '故障分析',
    icon: <BugOutlined />,
    component: React.lazy(() => import('../404')),
  },
  {
    path: '/bind',
    name: '设备绑定',
    icon: <DeliveredProcedureOutlined />,
    routes: [
      {
        path: '/bind/android',
        name: '安卓',
        icon: <AndroidOutlined />,
        component: React.lazy(() => import('../404')),
      },
      {
        path: '/bind/ios',
        name: '苹果',
        icon: <AppleOutlined />,
        component: React.lazy(() => import('../404')),
      },
    ],
  },
] as RouteMenu[];
