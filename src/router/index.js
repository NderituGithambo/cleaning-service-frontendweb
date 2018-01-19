import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Login from '@/components/Login/Login';
import Register from '@/components/Register/Register';

import AdminLogin from '@/components/Admin/AdminLogin';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import AdminDataIndex from '@/components/Admin/AdminDataIndex';
import AdminDataShow from '@/components/Admin/AdminDataShow';

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
      path: '/admin',
      component: AdminLogin,
      name: 'admin',
    },
    {
      path: '/admin/dashboard',
      component: AdminDashboard,
      name: 'adminDashboard',
      children: [
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
      ]
    },
  ],
});
