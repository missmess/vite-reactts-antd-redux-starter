import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMenu } from '@/types';
import { useRoutesByLocation } from '@/hooks/useRouteMenu';

/** 面包屑组件，与配置式路由菜单绑定 */
const Breadcrumbs: React.FC<{ menus: RouteMenu[] }> = ({ menus }) => {
  const parents = useRoutesByLocation(menus);

  return (
    <Breadcrumb style={{ padding: '8px 0' }}>
      {parents.map((v) => (
        <Breadcrumb.Item key={v.path}>
          {v.component ? <Link to={v.path}>{v.name}</Link> : <span>{v.name}</span>}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
