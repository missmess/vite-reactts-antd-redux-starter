import React, { createContext, Suspense, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '@/components/loading';
import { RouteMenu } from '@/types';
import { useVisitableRoutes } from '@/hooks/useRouteMenu';
/** 这是全部的pages下的页面组件。用于动态的组件加载（vite专用） */
const AllPageModules = import.meta.glob('../../pages/*/*.tsx');

const IframeView = React.lazy(() => import('@/pages/iframeView'));
const NotFound = React.lazy(() => import('@/pages/404/index'));

export const RouteContext = createContext({
  menus: [] as RouteMenu[],
});

/** 根据menu获取单个路由组件 */
const getRouteItem = (menu: RouteMenu) => {
  // 有组件
  if (menu.component) {
    // string代表是特殊组件，不需要生成route
    if (menu.component === 'externalUrl' || menu.component === 'iframeView' || menu.component === 'mircroAppView') {
      return null;
    }
    let comp = menu.component;
    if (typeof menu.component === 'string') {
      // 如果是字符串的组件路径，将其转换为lazy组件
      // @ts-ignore
      comp = React.lazy(AllPageModules[`../../pages/${menu.component}`]);
    }
    // 处理组件路由
    // @ts-ignore
    return <Route exact path={menu.path} component={comp} key={menu.path} />;
  }
  return null;
};

/** 路由列表组件，与配置式路由菜单绑定 */
const RouteList: React.FC<{ menus: RouteMenu[] }> = ({ menus }) => {
  // 这些都是可访问的
  const visitables = useVisitableRoutes(menus);
  // 生成route组件集合
  const routeEles = useMemo(() => {
    return visitables.map((r) => getRouteItem(r)).filter((r) => r !== null);
  }, [visitables]);
  return (
    <RouteContext.Provider value={{ menus }}>
      <Suspense fallback={<Loading />}>
        <Switch>
          {routeEles}
          <Route path='/iframeView/:hash' component={IframeView} key='/iframeRouteView' />
          <Route path='*' key='/404' component={NotFound} />
        </Switch>
      </Suspense>
    </RouteContext.Provider>
  );
};

export default RouteList;
