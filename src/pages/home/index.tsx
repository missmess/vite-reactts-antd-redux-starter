import { Layout, Image, MenuTheme } from 'antd';
import Logo from '@/assets/img/logo.svg';
import UserLogin from '@/components/userlogin';
import MenuList from '@/components/menulist';
import RouteList from '@/components/routelist';
import menus from './menus';
import './index.scss';
import Breadcrumbs from '@/components/breadcrumb';

const { Header, Content, Sider } = Layout;
const menuTheme: MenuTheme = 'light';

export default () => {
  return (
    <Layout className='home-main'>
      <Header className='home-header'>
        <Image src={Logo} preview={false} width={60} />
        <span className='home-title'>理想汽车</span>
        <UserLogin />
      </Header>
      <Layout>
        <Sider width={200} breakpoint='md' collapsible theme={menuTheme} collapsedWidth={48}>
          <MenuList menus={menus} theme={menuTheme} />
        </Sider>
        <Content>
          <Breadcrumbs menus={menus} />
          <RouteList menus={menus} />
        </Content>
      </Layout>
    </Layout>
  );
};
