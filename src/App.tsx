import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Modal } from 'antd';
import { setUser } from './store/user';
import Loading from './components/loading';
import store from './store';
import { IDaasInfo } from './Constants';
import { setScopes } from './store/scope';

const Home = lazy(() => import('@/pages/home'));

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
window._redux_store = store;

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
