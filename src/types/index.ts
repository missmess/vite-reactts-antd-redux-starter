import React, { ReactNode } from 'react';

export type RouteMenu = {
  name: string; // 名称，展示到菜单、面包屑位置
  path: string; // 路径，支持外部url
  component?: React.ExoticComponent;
  icon?: ReactNode | string;
  routes?: RouteMenu[];
  hideInMenu?: boolean;
  visibleChild?: RouteMenu[];
};

export type UserInfo = {
  userId: number;
  nickname: string;
  picture?: string;
};

export type Item = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
