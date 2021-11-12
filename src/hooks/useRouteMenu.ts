import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteMenu } from '@/types';

/**
 * 先序遍历查找某一菜单项，直到菜单项path等于输入的path，并将它和它的所有父级们存入parentRoutes中
 */
const findRoutesByPath = (route: RouteMenu, path: string, parentRoutes: RouteMenu[]) => {
  if (route.path === path) {
    parentRoutes.push(route);
    return true;
  }
  if (route.routes?.length) {
    // 递归查找
    for (let i = 0; i < route.routes.length; i += 1) {
      if (findRoutesByPath(route.routes[i], path, parentRoutes)) {
        parentRoutes.push(route);
        return true;
      }
    }
  }
  return false;
};

/**
 * 根据当前location，计算它和它的所有父级路由菜单列表
 * @param routes 树状路由菜单列表
 * @returns RouteMenu[] 当前location的父级
 */
export const useRoutesByLocation = (routes: RouteMenu[]) => {
  const location = useLocation();

  // location变更时，重新获取列表
  return useMemo(() => {
    const ps: RouteMenu[] = [];
    for (let i = 0; i < routes.length; i += 1) {
      if (findRoutesByPath(routes[i], location.pathname, ps)) break;
    }
    return ps.reverse();
  }, [location]);
};

/** 从route集合树中先序遍历，查找包含组件的路由存入visitableRoutes中 */
const findVisitableRoute = (route: RouteMenu, visitableRoutes: RouteMenu[]) => {
  if (route.component) {
    visitableRoutes.push(route);
  }
  if (route.routes?.length) {
    // 递归查找
    for (let i = 0; i < route.routes.length; i += 1) {
      findVisitableRoute(route.routes[i], visitableRoutes);
    }
  }
};

/**
 * 按序获取所有包含组件可以访问到的路由列表
 * @param routes 树状路由菜单列表
 * @returns RouteMenu[] 包含组件可以访问的路由
 */
export const useVisitableRoutes = (routes: RouteMenu[]) => {
  return useMemo(() => {
    const visitableRoutes: RouteMenu[] = [];
    routes.forEach((v) => findVisitableRoute(v, visitableRoutes));
    // console.log('可访问的路由集', visitableRoutes);
    return visitableRoutes;
  }, []);
};

/** 递归添加visibleChild */
const addMenuVisibleRoute = (route: RouteMenu, parent: RouteMenu[]) => {
  if (route.routes?.length) {
    const arr: RouteMenu[] = [];
    for (let i = 0; i < route.routes.length; i += 1) {
      addMenuVisibleRoute(route.routes[i], arr);
    }
    route.visibleChild = arr;
  }
  if (!route.hideInMenu) parent.push(route);
};

/** 获取所有仅包含可见菜单的路由列表 */
export const useMenuVisibleRoutes = (routes: RouteMenu[]) => {
  return useMemo(() => {
    const visibleRoutes: RouteMenu[] = [];
    routes.forEach((v) => addMenuVisibleRoute(v, visibleRoutes));
    // console.log('可见菜单集', visibleRoutes);
    return visibleRoutes;
  }, []);
};
