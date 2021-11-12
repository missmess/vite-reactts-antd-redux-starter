import { Layout, Image, MenuTheme, Card } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from '@/assets/img/logo.svg';
import UserLogin from '@/components/userlogin';
import MenuList from '@/components/menulist';
import RouteList from '@/components/routelist';
import menus from './menus';
import './index.scss';
import Breadcrumbs from '@/components/breadcrumb';
import { useFirstAvailRoute } from '@/hooks/useRouteMenu';

const { Header, Content, Sider } = Layout;
const menuTheme: MenuTheme = 'light';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const route0 = useFirstAvailRoute(menus);
  useEffect(() => {
    if (location.pathname === '/') {
      history.push(route0?.path || '/');
    }
  });
  return (
    <Layout className='home-main'>
      <Header className='home-header'>
        <Image src={Logo} preview={false} width={54} />
        <span className='home-title'>理想汽车</span>
        <UserLogin />
      </Header>
      <Layout>
        <Sider width={200} breakpoint='md' collapsible theme={menuTheme} collapsedWidth={48}>
          <MenuList menus={menus} theme={menuTheme} />
        </Sider>
        <Content>
          <Breadcrumbs menus={menus} />
          <div className='home-content'>
            <Card className='home-card'>
              <RouteList menus={menus} />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
