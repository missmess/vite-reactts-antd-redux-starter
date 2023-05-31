import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/loading';
import store from './store';
import { KEY_SETTING } from './Constants';
import { parseJson } from './utils/common';
import { setGlobalSetting, Setting } from './store/setting';

const Home = lazy(() => import('@/pages/home'));

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
window._redux_store = store;

// 从localStorage中获取全局配置
const settingStr = localStorage.getItem(KEY_SETTING);
if (settingStr) {
  const setting = parseJson(settingStr) as Setting;
  store.dispatch(setGlobalSetting(setting));
}

export default () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};
