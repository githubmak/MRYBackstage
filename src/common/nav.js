import BasicLayout from '../layouts/BasicLayout';
import Analysis from '../routes/Dashboard/Analysis';
import TableList from '../routes/List/TableList';
import BasicProfile from '../routes/Profile/BasicProfile';
import BasicForm from '../routes/Forms/BasicForm';
import UserLayout from '../layouts/UserLayout';
import Login from '../routes/User/Login';
const data = [{
  component: BasicLayout,
  layout: 'BasicLayout',
  name: '首页', // for breadcrumb
  path: '',
  children: [{
    name: '公司管理',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{
      name: '员工信息',
      path: 'analysis',
      component: Analysis,
    }],
  }, {
    name: '信息列表',
    path: 'form',
    icon: 'form',
    children: [{
      name: '信息展示',
      path: 'step-form',
      component: BasicForm,
    },],
  }, {
    name: '用户列表',
    path: 'list',
    icon: 'table',
    children: [{
      name: '用户管理',
      path: 'table-list',
      component: TableList,
    }],
  }, {
    name: '产品分类',
    path: 'profile',
    icon: 'profile',
    children: [{
      name: '分类管理',
      path: 'basic',
      component: BasicProfile,
    }, ],
  },],
},{
  component: UserLayout,
  layout: 'UserLayout',
  children: [{
    name: '帐户',
    icon: 'user',
    path: 'user',
    children: [{
      name: '登录',
      path: 'login',
      component: Login,
    }],
  }],
}];

export function getNavData() {
  return data;
}

export default data;
