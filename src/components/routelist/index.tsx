import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '@/components/loading';
import { RouteMenu } from '@/types';
import { useVisitableRoutes } from '@/hooks/useRouteMenu';

/** 根据menu获取单个路由组件 */
const getRouteItem = (menu: RouteMenu) => <Route exact path={menu.path} component={menu.component} key={menu.path} />;

/** 路由列表组件，与配置式路由菜单绑定 */
const RouteList: React.FC<{ menus: RouteMenu[] }> = ({ menus }) => {
  // 这些都是可访问的
  const visitables = useVisitableRoutes(menus);
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {visitables.map((r) => getRouteItem(r))}
        <Route path='*' key='/404' component={React.lazy(() => import('@/pages/404/index'))} />
      </Switch>
    </Suspense>
  );
};

export default RouteList;
