import { Menu, MenuTheme } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteMenu } from '@/types';
import { useMenuVisibleRoutes, useRoutesByLocation } from '@/hooks/useRouteMenu';

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
    menu.visibleChild?.length ? (
      <SubMenu key={menu.path} title={menu.name} icon={menu.icon}>
        {getMenuItemList(menu.visibleChild)}
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
  let selectPath = location.pathname;
  // 查找第一个隐藏菜单项
  const firstHideMenu = parentRoutes.findIndex((v) => v.hideInMenu);
  // 如果有隐藏菜单，它的前一个父级应该被选中
  if (firstHideMenu !== -1 && firstHideMenu > 0) {
    selectPath = parentRoutes[firstHideMenu - 1].path;
  }
  // console.log(`当前路径为${location.pathname}, 需选中的路径为${selectPath}`);

  // 仅渲染可见的菜单项
  const visibles = useMenuVisibleRoutes(menus);
  return (
    <Menu
      mode='inline'
      theme={theme}
      selectedKeys={[selectPath]}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      style={{ height: '100%', borderRight: 0 }}
    >
      {getMenuItemList(visibles)}
    </Menu>
  );
};
export default MenuList;
