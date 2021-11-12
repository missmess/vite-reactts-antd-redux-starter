import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteMenu } from '@/types';

/**
 * 根据当前location，计算它和它的所有父级路由菜单列表
 * @param routes 树状路由菜单列表
 * @returns 当前location的父级
 */
export const useRoutesByLocation = (routes: RouteMenu[]) => {
  /**
   * 先序遍历查找某一菜单项，直到菜单项path等于输入的path，并将它和它的父级们存入parentRoutes中
   */
  const findParentRouteByPath = useCallback((route: RouteMenu, path: string, parentRoutes: RouteMenu[]) => {
    if (route.path === path) {
      parentRoutes.push(route);
      return true;
    }
    if (route.routes?.length) {
      // 递归查找
      for (let i = 0; i < route.routes.length; i += 1) {
        if (findParentRouteByPath(route.routes[i], path, parentRoutes)) {
          parentRoutes.push(route);
          return true;
        }
      }
    }
    return false;
  }, []);
  const location = useLocation();

  // location变更时，重新获取列表
  return useMemo(() => {
    const ps: RouteMenu[] = [];
    for (let i = 0; i < routes.length; i += 1) {
      if (findParentRouteByPath(routes[i], location.pathname, ps)) break;
    }
    return ps.reverse();
  }, [location]);
};

/** 从route集合树中先序遍历，查找第一个包含组件的 */
const findAvailRoute: (route: RouteMenu) => RouteMenu | null = (route) => {
  if (route.component) return route;
  let r: RouteMenu | null = null;
  if (route.routes?.length) {
    // 递归查找
    for (let i = 0; i < route.routes.length; i += 1) {
      r = findAvailRoute(route.routes[i]);
      if (r) break;
    }
  }
  return r;
};

/** 从route集合数列表中，查找到第一个包含组件的 */
export const useFirstAvailRoute = (routes: RouteMenu[]) => {
  return useMemo(() => findAvailRoute(routes[0]), []);
};
