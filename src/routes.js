import PrivateRoutes from './PrivateRoutes';
import NotFound from './pages/404/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Panel from './pages/panel/Panel';
import Dashboard from './pages/panel/dashboard/Dashboard';
import Courses from './pages/panel/mycourses/Courses';
import Finance from './pages/panel/finance/Finance';
import Store from './pages/panel/store/Store';
import CourseDetails from './pages/panel/mycourses/courseDetails/CourseDetails';
import Cart from './pages/cart/Cart';
import Class from './pages/panel/Classes/ClassPreview';
import Profile from './pages/panel/Profile/Profile';
import LoginForm from './pages/auth/LoginForm';
import SignUpForm from './pages/auth/SignUpForm';
import Callback from './pages/auth/Callback';
import EmailConfirmation from './pages/auth/EmailConfirmation';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  {
    path: '/auth',
    element: <Login />,
    children: [
      { index: true, element: <NotFound /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <SignUpForm /> },
    ],
  },
  { path: '/auth/callback', element: <Callback /> },
  { path: '/auth/confirm-email', element: <EmailConfirmation /> },
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
      { path: 'cart', element: <Cart /> },
      { path: 'class/show/:id', element: <Class /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
