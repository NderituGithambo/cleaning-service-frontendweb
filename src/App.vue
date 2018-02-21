<template>
  <v-app>
    <div id="app" :class="appClass">
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
        return !/^admin.*/.test(this.$route.name)
      },
    }
  },

  computed: {
    appClass: function() {
      return this.showHeader() ? '' : 'bg-gradient'
    },
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
  // background: linear-gradient(to bottom right, white, $blue);
  // background-image: url("assets/jazflower4_med.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: white;

  margin: 0;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.bg-gradient {
  background: linear-gradient(to bottom, white, gainsboro);
}

main {
  // For sticky footer
  padding-bottom: 60px;
  margin: 4vh 4vw;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.custom-btn {
  width: min-content;
  margin-left: 1em;
  padding: 0 1em;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    filter: brightness(102.5%);
  }
}
</style>
