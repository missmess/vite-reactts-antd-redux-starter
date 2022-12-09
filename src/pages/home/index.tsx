import { Layout } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import MenuList from '@/components/menulist';
import { useCurrentRoute } from '@/hooks/useRouteMenu';
import Breadcrumbs from '@/components/breadcrumb';
import HistoryTab from '@/components/historytab';
import ContentZone from '@/components/contentzone';
import TipsBar from '@/components/tipsbar';
import { useAppSelector } from '@/hooks/useStoreApi';
import { selectGlobalSetting } from '@/store/setting';
import TopBar from '@/components/topbar';
import menus from '../menus';
import './index.less';

const { Content, Sider } = Layout;

export default () => {
  const setting = useAppSelector(selectGlobalSetting);
  // 取该大分类的左侧菜单树
  const route = useCurrentRoute(menus); // 当前路由对象
  // 菜单收缩状态
  const [menuCollapse, setMenuCollapse] = useState(setting.defaultMenuCollapse);
  // 页面顶部提示栏
  const [contentTips, setContentTips] = useState<ReactNode>();
  useEffect(() => {
    if (route?.meta?.homeContentTips) {
      setContentTips(route.meta.homeContentTips);
    } else {
      setContentTips(undefined);
    }
  }, [route]);

  return (
    <Layout className='home-main'>
      {route?.meta?.pure === true || (typeof route?.meta?.pure === 'object' && route.meta.pure.topBar) ? null : (
        <TopBar />
      )}
      <Layout>
        {!menus || // 没有菜单列表
        !route || // 未找到路由
        route.meta?.pure === true || // 路由申请全隐藏
        (typeof route.meta?.pure === 'object' && route.meta.pure.menuList) ? null : ( // 路由申请隐藏菜单栏
          <Sider
            width={220}
            className='home-left-sider'
            breakpoint={setting.defaultMenuCollapse ? undefined : 'md'}
            defaultCollapsed={menuCollapse}
            collapsible
            onCollapse={setMenuCollapse}
            theme={setting.collapseTheme}
            trigger={menuCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            collapsedWidth={64}
          >
            <MenuList menus={menus} theme={setting.menuTheme} collapse={menuCollapse} />
          </Sider>
        )}
        <Content className='home-content-group'>
          {!menus || // 没有菜单列表
          !route || // 未找到路由
          route.meta?.pure === true || // 路由申请全隐藏
          (typeof route.meta?.pure === 'object' && route.meta.pure.contentTop) ? null : ( // 路由申请隐藏顶部栏
            <div
              className='home-content-top'
              style={route?.meta?.homeContentTopStyle ?? undefined}
              // style={setting.navType !== 'breadcrumb' ? { backgroundColor: 'white' } : undefined}
            >
              {setting.navType === 'breadcrumb' || setting.navType === 'all' ? <Breadcrumbs menus={menus} /> : null}
              {setting.navType === 'historytab' || setting.navType === 'all' ? <HistoryTab menus={menus} /> : null}
            </div>
          )}
          <TipsBar
            hidden={!contentTips}
            style={route?.meta?.homeContentTipsStyle}
            title={contentTips}
            rightBtns={[
              { label: <CloseOutlined style={{ color: '#888' }} />, key: 1, onClick: () => setContentTips(undefined) },
            ]}
          />
          <div className='home-content' style={route?.meta?.homeContentStyle ?? undefined}>
            <ContentZone menus={menus} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
