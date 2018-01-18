<template>
  <v-app>
    <div id="app">
      <app-header v-if="showHeader()"></app-header>
      <router-view/>
      <app-footer></app-footer>
    </div>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'app',

  data() {
    return {
      showHeader: () => {
        return (
          this.$route.name === "admin" ||
          this.$route.name === "adminDashboard" ||
          this.$route.name === "adminJobRequests"
        ) ? false : true
      }
    }
  },

  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
  },
};
</script>

<style lang="scss">
@import "./colors.scss";

#app {
  font-family: 'Assistant', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(to bottom right, white, $blue);
  margin: 0;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

main {
  // For sticky footer
  padding-bottom: 60px;
  margin: 4vh 4vw;
}
</style>
