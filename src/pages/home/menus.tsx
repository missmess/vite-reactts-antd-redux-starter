import {
  AndroidOutlined,
  AppleOutlined,
  BugOutlined,
  CalendarOutlined,
  CloudUploadOutlined,
  DeliveredProcedureOutlined,
  GoogleOutlined,
  HeatMapOutlined,
  IeOutlined,
  QqOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import React from 'react';
import { RouteMenu } from '@/types';

// 配置式路由菜单
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
            routes: [
              {
                path: '/car/sale/win/detail',
                hideInMenu: true,
                name: '详情',
                icon: <WechatOutlined />,
                component: React.lazy(() => import('./car/sale/detail')),
              },
            ],
          },
        ],
      },
      {
        path: 'https://www.google.com/search?q=理想汽车',
        name: '查看google',
        icon: <GoogleOutlined />,
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
  {
    path: '/help',
    name: '帮助',
    hideInMenu: true,
    icon: <HeatMapOutlined />,
    component: React.lazy(() => import('../404')),
  },
  {
    path: 'https://www.lixiang.com',
    name: '理想官网',
    icon: <IeOutlined />,
  },
] as RouteMenu[];
