import React, { ReactNode } from 'react';

export type RouteMenu = {
  name: string;
  path: string;
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
