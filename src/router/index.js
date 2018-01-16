import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import About from '@/components/About/About';
import Request from '@/components/Request/Request';
import Login from '@/components/Login/Login';
import Register from '@/components/Register/Register';
import Admin from '@/components/Admin/Admin';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/request',
      name: 'Request',
      component: Request,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
  ],
});
