import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '@/components/loading';
import { RouteMenu } from '@/types';

/** 根据menu获取单个路由组件 */
const getRouteItem = (menu: RouteMenu) => <Route exact path={menu.path} component={menu.component} key={menu.path} />;

// /** 这个方法递归创建Route或Route[] */
// const getRouteItemList = (menus: RouteMenu[]) =>
//   menus.map((r) => (r.routes?.length ? getRouteItemList(r.routes) : getRouteItem(r)));

/** 根据树状的menus集合解析出各个叶子menu */
const parseLeafMenus = (menus: RouteMenu[], leafMenus: RouteMenu[]) => {
  menus.forEach((r) => (r.routes?.length ? parseLeafMenus(r.routes, leafMenus) : leafMenus.push(r)));
};

/** 路由列表组件，与配置式路由菜单绑定 */
const RouteList: React.FC<{ menus: RouteMenu[] }> = ({ menus }) => {
  const [leafs, setLeafs] = useState([] as RouteMenu[]);
  // 解析出叶子menu，用来创建route
  useEffect(() => {
    const ls = [] as RouteMenu[];
    parseLeafMenus(menus, ls);
    setLeafs(ls);
  }, [menus]);
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* {getRouteItemList(menus)} */}
        {leafs.map((r) => getRouteItem(r))}
        <Route path='*' key='/404' component={React.lazy(() => import('@/pages/404/index'))} />
      </Switch>
    </Suspense>
  );
};

export default RouteList;
