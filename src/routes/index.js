//Pages
import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Tag from '../pages/Tag';

//Layout
import { NoneLayout } from '../components/Layout';
import Project from '../pages/Project';
import Account from '../pages/Account';

//Public Routes (do not need login for use)
const publicRoutes = [
  { path: '/Home', component: Home },
  { path: '/Register', component: Register, layout: NoneLayout },
  { path: '/Profile', component: Profile },
  { path: '/', component: Login, layout: NoneLayout },
  { path: '/Login', component: Login, layout: NoneLayout },
  { path: '/Project', component: Project },
  { path: '/Tag', component: Tag },
  { path: '/Account', component: Account },
];

//Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
