//Pages
import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Tag from '../pages/Tag';

//Layout
import { NoneLayout, HeaderOnlyLayout } from '../components/Layout';
import Project from '../pages/Project';
import Account from '../pages/Account';
import Statistic from '../pages/Statistic';
import Detail from '../pages/Detail';
import ProjectDetails from '../pages/ProjectDetails';
import CreateProject from '../pages/CreateProject';

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
  { path: '/Statistic', component: Statistic },
  { path: '/Detail', component: Detail, layout: HeaderOnlyLayout },
  { path: '/CreateProject', component: CreateProject },
  { path: '/project/:id', component: ProjectDetails },
];

//Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
