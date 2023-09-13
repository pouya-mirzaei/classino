import PrivateRoutes from './PrivateRoutes';
import NotFound from './pages/404/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Panel from './pages/panel/Panel';

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
  },
  { path: '/*', element: <NotFound /> },
];

export default routes;
