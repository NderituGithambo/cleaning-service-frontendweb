import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Login from '@/components/Login/Login';
import Register from '@/components/Register/Register';

import AdminLogin from '@/components/Admin/AdminLogin';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import AdminActions from '@/components/Admin/AdminActions';
import AdminDataIndex from '@/components/Admin/AdminDataIndex';
import AdminJobIndex from '@/components/Admin/AdminJobIndex';
import AdminDataShow from '@/components/Admin/AdminDataShow';
import AdminJobShow from '@/components/Admin/AdminJobShow';
import AdminDataCreate from '@/components/Admin/AdminDataCreate';
import AdminJobCreate from '@/components/Admin/AdminJobCreate';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/admin/login',
      component: AdminLogin,
      name: 'adminLogin',
    },
    {
      path: '/admin',
      component: AdminDashboard,
      children: [
        {
          path: '',
          component: AdminActions,
          name: 'adminActions',
        },
        {
          path: 'job_requests',
          component: AdminDataIndex,
          name: 'adminJobRequests',
          props: { dataModel: 'job_request' }
        },
        {
          path: 'job_requests/:id',
          component: AdminDataShow,
          name: 'adminJobRequest',
          props: { dataModel: 'job_request' }
        },
        {
          path: 'jobs',
          component: AdminJobIndex,
          name: 'adminJobs',
          props: { dataModel: 'job' }
        },
        {
          path: 'jobs/create',
          component: AdminJobCreate,
          name: 'adminJobCreate',
        },
        {
          // This path needs to be below create
          // to prevent misfiring
          path: 'jobs/:id',
          component: AdminJobShow,
          name: 'adminJob',
          props: { dataModel: 'job' }
        },
        {
          path: 'employees',
          component: AdminDataIndex,
          name: 'adminEmployees',
          props: { dataModel: 'employee' }
        },
        // {
        //   path: 'employees/create',
        //   component: AdminEmployeeCreate,
        //   name: 'adminEmployeeCreate',
        // },
        {
          // This path needs to be below create
          // to prevent misfiring
          path: 'employees/:id',
          component: AdminDataShow,
          name: 'adminEmployee',
          props: { dataModel: 'employee' }
        },
      ]
    },
  ],
});
