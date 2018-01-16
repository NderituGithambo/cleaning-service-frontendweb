import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
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
