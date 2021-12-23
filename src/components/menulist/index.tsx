import { Menu, MenuTheme } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteMenu } from '@/types';
import { useMenuVisibleRoutes, useRoutesByLocation } from '@/hooks/useRouteMenu';

const { SubMenu } = Menu;

/** 根据menu生成单个菜单项jsx */
const getMenuItem = (menu: RouteMenu) => (
  <Menu.Item key={menu.path} icon={menu.icon}>
    {menu.path.startsWith('http://') || menu.path.startsWith('https://') ? (
      <a href={menu.path}>{menu.name}</a>
    ) : (
      <Link to={menu.path}>{menu.name}</Link>
    )}
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
const MenuList: React.FC<{ menus: RouteMenu[]; theme: MenuTheme; collapse: boolean }> = ({
  menus,
  theme,
  collapse,
}) => {
  const parentRoutes = useRoutesByLocation(menus);
  const [openKeys, setOpenKeys] = useState([] as string[]);
  // //调试openKeys
  // const [openKeys, setOpenKeys2] = useState([] as string[]);
  // const setOpenKeys = (k: string[]) => {
  //   console.log('设置openKeys', k);
  //   setOpenKeys2(k);
  // };
  useEffect(() => {
    // 只有在sider打开时，手动控制openKeys（sider关闭时，Menu自己接管了状态）
    if (!collapse) {
      // 默认打开所有父级
      let parents = parentRoutes.slice(0, parentRoutes.length - 1);
      // 查找第一个隐藏菜单项
      const firstHideMenu = parentRoutes.findIndex((v) => v.hideInMenu);
      // 如果有隐藏菜单，隐藏菜单的所有父级应被打开
      if (firstHideMenu !== -1 && firstHideMenu > 0) {
        parents = parentRoutes.slice(0, firstHideMenu - 1);
      }
      setOpenKeys(parents.map((v) => v.path));
    }
  }, [parentRoutes, collapse]);

  const location = useLocation();
  // 默认选中当前路径
  let selectPath = location.pathname;
  // 查找第一个隐藏菜单项
  const firstHideMenu = parentRoutes.findIndex((v) => v.hideInMenu);
  // 如果有隐藏菜单，隐藏菜单的前一个父级应该被选中
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
