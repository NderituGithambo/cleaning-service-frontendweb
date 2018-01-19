import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Login from '@/components/Login/Login';
import Register from '@/components/Register/Register';

import AdminLogin from '@/components/Admin/AdminLogin';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import AdminActions from '@/components/Admin/AdminActions';
import AdminDataIndex from '@/components/Admin/AdminDataIndex';
import AdminDataShow from '@/components/Admin/AdminDataShow';
import AdminDataCreate from '@/components/Admin/AdminDataCreate';

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
          component: AdminDataIndex,
          name: 'adminJobs',
          props: { dataModel: 'job' }
        },
        {
          path: 'jobs/:id',
          component: AdminDataShow,
          name: 'adminJob',
          props: { dataModel: 'job' }
        },
        {
          path: 'jobs/create',
          component: AdminDataCreate,
          name: 'adminJobCreate',
          props: { dataModel: 'job' }
        },
      ]
    },
  ],
});
