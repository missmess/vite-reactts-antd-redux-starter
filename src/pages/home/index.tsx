import { Layout, Image, MenuTheme, Card, Drawer, Row, Col, Select } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import Logo from '@/assets/img/logo.svg';
import UserLogin from '@/components/userlogin';
import MenuList from '@/components/menulist';
import RouteList from '@/components/routelist';
import menus from './menus';
import './index.less';
import { useVisitableRoutes } from '@/hooks/useRouteMenu';
import Breadcrumbs from '@/components/breadcrumb';
import HistoryTab from '@/components/historytab';

const { Header, Content, Sider } = Layout;
const menuTheme: MenuTheme = 'light';
const initNavType: any = localStorage.getItem('startter-navtype') || 'historytab';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const visitables = useVisitableRoutes(menus);
  useEffect(() => {
    if (location.pathname === '/') {
      history.push(visitables[0]?.path || '/');
    }
  });
  // 菜单收缩状态
  const [menuCollapse, setMenuCollapse] = useState(false);
  // setting drawer开关状态
  const [drawerVisible, setDrawerVisible] = useState(false);
  // 导航类型：面包屑、历史标签
  const [navType, setNavType] = useState<'breadcrumb' | 'historytab' | 'all'>(initNavType);
  return (
    <Layout className='home-main'>
      <Header className='home-header'>
        <Image src={Logo} preview={false} width={54} />
        <span className='home-title'>理想汽车</span>
        <span className='home-control'>
          <SettingOutlined onClick={() => setDrawerVisible(true)} />
        </span>
        <UserLogin />
      </Header>
      <Layout>
        <Sider
          width={200}
          breakpoint='md'
          collapsible
          onCollapse={setMenuCollapse}
          theme={menuTheme}
          collapsedWidth={48}
        >
          <MenuList menus={menus} theme={menuTheme} collapse={menuCollapse} />
        </Sider>
        <Content className='home-content-group'>
          <div className='home-content-top'>
            {navType === 'breadcrumb' || navType === 'all' ? <Breadcrumbs menus={menus} /> : null}
            {navType === 'historytab' || navType === 'all' ? <HistoryTab menus={menus} /> : null}
          </div>
          <div className='home-content'>
            <Card className='home-card'>
              <RouteList menus={menus} />
            </Card>
          </div>
        </Content>
      </Layout>
      <Drawer visible={drawerVisible} title='布局设置' width={340} onClose={() => setDrawerVisible(false)}>
        <>
          <Row justify='space-between' align='middle'>
            <Col style={{ fontWeight: 'bold' }}>顶部导航模式</Col>
            <Col>
              <Select
                value={navType}
                onChange={(val) => {
                  localStorage.setItem('startter-navtype', val);
                  setNavType(val);
                }}
              >
                <Select.Option value='breadcrumb'>使用面包屑</Select.Option>
                <Select.Option value='historytab'>使用历史标签</Select.Option>
                <Select.Option value='all'>都使用</Select.Option>
              </Select>
            </Col>
          </Row>
        </>
      </Drawer>
    </Layout>
  );
};
