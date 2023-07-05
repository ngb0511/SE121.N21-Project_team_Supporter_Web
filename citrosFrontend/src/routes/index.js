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
import ProjectView from '../pages/ProjectView';
import ProfileWall from '../pages/ProfileWall';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ChangePassword from '../pages/ChangePassword';
import Admin from '../pages/Admin';
import ProjectAdmin from '../pages/Admin/pages/ProjectAdmin';

//Public Routes (do not need login for use)
const publicRoutes = [
  { path: '/Register', component: Register, layout: HeaderOnlyLayout },
  { path: '/', component: Login, layout: HeaderOnlyLayout },
  { path: '/Login', component: Login, layout: HeaderOnlyLayout },
  { path: '/Home', component: Home, layout: HeaderOnlyLayout },
  { path: '/Profile', component: Profile, layout: HeaderOnlyLayout },
  { path: '/Project', component: Project, layout: HeaderOnlyLayout },
  { path: '/Tag', component: Tag },
  { path: '/Account', component: Account },
  { path: '/Statistic', component: Statistic, layout: HeaderOnlyLayout },
  { path: '/Detail', component: Detail, layout: HeaderOnlyLayout },
  { path: '/CreateProject', component: CreateProject, layout: HeaderOnlyLayout },
  { path: '/project/:id', component: ProjectDetails, layout: HeaderOnlyLayout },
  { path: '/Home/:id', component: ProjectView, layout: HeaderOnlyLayout },
  { path: '/ProfileWall/:id', component: ProfileWall, layout: HeaderOnlyLayout },
  { path: '/About', component: About, layout: HeaderOnlyLayout },
  { path: '/Contact', component: Contact, layout: HeaderOnlyLayout },
  { path: '/ChangePassword', component: ChangePassword, layout: HeaderOnlyLayout },
  { path: '/Admin', component: Admin },
  { path: '/Admin/ProjectAdmin', component: ProjectAdmin },
  { path: '/Admin/Project/:id', component: ProjectView },
  { path: '/Admin/ProfileWall/:id', component: ProfileWall },
];

//Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
