// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)

import App from './App';
import router from './router';

Vue.config.productionTip = false;



//
// Global filters
//

import moment from 'moment'
Vue.filter('moment', function(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
})

Vue.filter('phone', function(phone) {
  if (!phone) return;
  return phone
    .replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
