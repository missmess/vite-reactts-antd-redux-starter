import { Menu, MenuTheme } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteMenu } from '@/types';

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

/** 解析menus获取菜单列表组件 */
const MenuList: React.FC<{ menus: RouteMenu[]; theme: MenuTheme }> = ({ menus, theme }) => {
  const [openKeys, setOpenKeys] = useState([] as string[]);
  /**
   * 先序遍历匹配某一菜单项path等于输入的path，并将该菜单项的parent的path存入数组中
   */
  const findMenuPathPreOrder = useCallback((menu: RouteMenu, path: string, parentPaths: string[]) => {
    if (menu.path === path) return true;
    if (menu.routes?.length) {
      for (let i = 0; i < menu.routes.length; i += 1) {
        if (findMenuPathPreOrder(menu.routes[i], path, parentPaths)) {
          parentPaths.push(menu.path);
          return true;
        }
      }
    }
    return false;
  }, []);
  const location = useLocation();
  // location变更时，计算需要打开的菜单项
  useEffect(() => {
    const opend: string[] = [];
    for (let i = 0; i < menus.length; i += 1) {
      if (findMenuPathPreOrder(menus[i], location.pathname, opend)) break;
    }
    setOpenKeys(opend);
  }, [location]);

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
