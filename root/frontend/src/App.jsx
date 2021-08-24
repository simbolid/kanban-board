import React, { Suspense, lazy } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoadingScreen from './pages/Loading';

// code splitting prevents initial load time from being too long
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Board = lazy(() => import('./pages/Board'));
const Settings = lazy(() => import('./pages/Settings'));

const App = () => (
  <Router>
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/board/:id" component={Board} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
