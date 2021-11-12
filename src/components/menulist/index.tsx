import { Menu, MenuTheme } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteMenu } from '@/types';
import useRoutesByLocation from '@/hooks/useRouteMenu';

const { SubMenu } = Menu;

/** 根据menu生成单个菜单项jsx */
const getMenuItem = (menu: RouteMenu) => (
  <Menu.Item key={menu.path} icon={menu.icon}>
    <Link to={menu.path}>{menu.name}</Link>
  </Menu.Item>
);

/** 递归生成菜单列表jsx */
const getMenuItemList = (menus: RouteMenu[]) =>
  menus.map((menu) =>
    menu.routes?.length ? (
      <SubMenu key={menu.path} title={menu.name} icon={menu.icon}>
        {getMenuItemList(menu.routes)}
      </SubMenu>
    ) : (
      getMenuItem(menu)
    ),
  );

/** 菜单列表组件，与配置式路由菜单绑定 */
const MenuList: React.FC<{ menus: RouteMenu[]; theme: MenuTheme }> = ({ menus, theme }) => {
  const parentRoutes = useRoutesByLocation(menus);
  const [openKeys, setOpenKeys] = useState([] as string[]);
  useEffect(() => {
    setOpenKeys(parentRoutes.map((v) => v.path));
  }, [parentRoutes]);
  const location = useLocation();

  return (
    <Menu
      mode='inline'
      theme={theme}
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      style={{ height: '100%', borderRight: 0 }}
    >
      {getMenuItemList(menus)}
    </Menu>
  );
};
export default MenuList;
