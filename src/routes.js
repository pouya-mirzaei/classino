import PrivateRoutes from './PrivateRoutes';
import NotFound from './pages/404/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Courses from './pages/panel/Courses';
import Dashboard from './pages/panel/Dashboard';
import Finance from './pages/panel/Finance';
import Panel from './pages/panel/Panel';
import Store from './pages/panel/Store';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  {
    path: '/panel',
    element: (
      <PrivateRoutes>
        <Panel />
      </PrivateRoutes>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'mycourselist', element: <Courses /> },
      { path: 'finance', element: <Finance /> },
      { path: 'store', element: <Store /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
