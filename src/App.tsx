import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Modal } from 'antd';
import auth, { getIdaasEnv } from './utils/auth';
import { setUser } from './store/user';
import Loading from './components/loading';
import store from './store';
import { IDaasInfo } from './Constants';
import { setScopes } from './store/scope';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
window._redux_store = store;

// 获取服务授权
const serviceId = IDaasInfo[getIdaasEnv()].SERVICE_ID;
const scopes = 'menus';

// 保证登录态
// auth.login().then(() => {
//   auth.getUser().then((user) => store.dispatch(setUser(user)));
//   // 发起服务授权并获取授权的scope
//   auth
//     .authorize(serviceId, scopes)
//     .then(() => auth.getAuthScopes(serviceId))
//     .then((val) => store.dispatch(setScopes(val)));
// });
// 监听权限变更，需要重新发起授权，使用窗口方式
// 只有新增的权限才需要授权，所以删除权限时，不会回调
// @ts-ignore
auth.raw.on('scope-changed', (ev) => {
  console.log(`服务权限发生变更, service=`, ev);
  if (ev.audience === serviceId) {
    Modal.confirm({
      title: '服务权限发生变更，请重新授权',
      okText: '确定',
      okCancel: false,
      onOk: async () => {
        await auth.raw.authorizeWithPopup({
          audience: serviceId,
          scope: scopes,
          redirectUri: window.location.origin,
          userTrigger: true,
        });
        window.location.reload();
      },
      closable: false,
    });
  }
});
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
window._auth_idaas = auth;

export default () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/' component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};
