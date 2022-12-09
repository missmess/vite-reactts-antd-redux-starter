import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import Logo from '@/assets/img/logo.svg';
import UserLogin from '@/components/userlogin';
import './index.less';
import SettingComp from '@/pages/setting';

/** 网站顶部导航菜单栏 */
const TopBar = () => {
  // setting drawer开关状态
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <Header className='topbar-header'>
        <Link to='/' className='topbar-logo-clickable'>
          <img src={Logo} alt='logo' style={{ height: 18 }} />
          <span className='topbar-title'>{import.meta.env.VITE_APP_NAME}</span>
        </Link>
        <span style={{ flex: 1 }} />
        <span className='home-control'>
          <SettingOutlined onClick={() => setDrawerVisible(true)} />
        </span>
        <UserLogin />
      </Header>
      <Drawer
        visible={drawerVisible}
        title='布局设置'
        placement='right'
        width={380}
        onClose={() => setDrawerVisible(false)}
      >
        <SettingComp />
      </Drawer>
    </>
  );
};

export default TopBar;
