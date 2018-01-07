<template>
  <v-app>
    <div id="app">
      <app-header></app-header>
      <router-view/>
      <app-footer></app-footer>
    </div>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
  },
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Noticia Text', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #EDEEEA;
  margin: 0;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

main {
  /* For sticky footer */
  padding-bottom: 60px;

  margin: 4vh 4vw;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
