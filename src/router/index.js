import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import About from '@/components/About';
import Request from '@/components/Request';
import Login from '@/components/Login';

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
  ],
});
