import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Login from '@/components/Login/Login';
import Register from '@/components/Register/Register';

import AdminLogin from '@/components/Admin/Login';
import AdminDashboard from '@/components/Admin/Dashboard';
import AdminActions from '@/components/Admin/Actions';

import AdminDataIndex from '@/components/Admin/DataIndex';
import AdminJobIndex from '@/components/Admin/JobIndex';
import AdminJobRequestIndex from '@/components/Admin/JobRequestIndex';

import AdminDataShow from '@/components/Admin/DataShow';
import AdminJobShow from '@/components/Admin/JobShow';
import AdminJobRequestShow from '@/components/Admin/JobRequestShow';

import AdminDataCreate from '@/components/Admin/DataCreate';
import AdminJobCreate from '@/components/Admin/JobCreate';

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
          component: AdminJobRequestIndex,
          name: 'adminJobRequests',
          props: { dataModel: 'job_request' }
        },
        {
          path: 'job_requests/:id',
          component: AdminJobRequestShow,
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
