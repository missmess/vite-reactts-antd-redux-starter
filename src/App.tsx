import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));

export default () => {
  return (
    <Router>
      <Suspense fallback='loading'>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};
