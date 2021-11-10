import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));

export default () => {
  return (
    <Router>
      <Suspense fallback={<Spin />}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/' component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};
