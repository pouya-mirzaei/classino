import PrivateRoutes from './PrivateRoutes';
import NotFound from './pages/404/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Panel from './pages/panel/Panel';
import Dashboard from './pages/panel/dashboard/Dashboard';
import Courses from './pages/panel/mycourses/Courses';
import Finance from './pages/panel/finance/Finance';
import Store from './pages/panel/store/Store';
import CourseDetails from './pages/panel/courseDetails/CourseDetails';

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
      { index: true, element: <NotFound /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'mycourselist', element: <Courses /> },
      { path: 'finance', element: <Finance /> },
      { path: 'store', element: <Store /> },
      { path: 'courses/:id', element: <CourseDetails /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
