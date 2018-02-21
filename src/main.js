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

Vue.filter('moment', (date) => {
  if (!date) return '-';
  return moment(date).format('MMMM Do YYYY, h:mm a');
})

Vue.filter('momentOnlyTime', (date) => {
  if (!date) return '-';
  return moment(date).format('h:mm a');
})

Vue.filter('phone', (phone) => {
  if (!phone) return '';
  return phone
    .replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

Vue.filter('underscoresAreSpaces', (string) => {
  if (!string) return ''
  return string.replace(/_/g, " ")
});

Vue.filter('capitalize', (string) => {
  if (!string) return ''
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
})

Vue.filter('snakeCaseFix', (string) => {
  if (!string) return ''
  return string.replace(/_/g, " ")
    .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
})

Vue.filter('screamingSnakeCaseFix', (string) => {
  if (!string) return ''
  string = string.replace(/_/g, " ").toLowerCase()
  return string[0].toUpperCase() + string.substring(1)
})

Vue.filter('camelCaseFix', (string) => {
  if (!string) return ''
  return string.replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); })
})

Vue.filter('toDollars', (number) => {
  if (!number) return '$0.00'
  return '$' + Number(number).toFixed(2)
})

Vue.filter('toDollarsFromCents', (number) => {
  if (!number) return '$0.00'
  return '$' + (Number(number) / 100).toFixed(2)
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
