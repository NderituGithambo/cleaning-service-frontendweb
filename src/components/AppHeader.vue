<template>
  <header class="pa-0 green darken-1">
    <h1 class="my-1">{{ logo }}</h1>

    <div class="header-aside">
      <div class="headlines">
        <h2>Clean house, happy life</h2>
        <div class="call-to-action">
          <h3>Call 604.899.8955</h3>
          <h4>Or click below to request online!</h4>
        </div>
      </div>

      <nav>
        <div class="info-buttons">
          <router-link to="/">
            <v-btn class="ma-0" flat :ripple="false">Home</v-btn>
          </router-link>
          <router-link to="/about">
            <v-btn class="ma-0" flat :ripple="false">About Us</v-btn>
          </router-link>
        </div>
        <div class="action-buttons">
          <router-link to="/request">
            <v-btn class="ma-0" flat :ripple="false">Request Service</v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn class="ma-0" flat :ripple="false">Log in</v-btn>
          </router-link>
        </div>
      </nav>
    </div>

  </header>
</template>

<script>
export default {
  data() {
    return {
      logo: `Maria's Cleaning`,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  color: white;
  height: 12vh;
  h1 {
    font-family: 'Noticia Text', Helvetica, Arial, sans-serif;
    font-size: 3em;
  }
  .header-aside {
    width: 100%;
    height: inherit;
    display: flex;
    position: relative;
    flex-direction: column;
    // border: 1px dashed pink;
    .headlines {
      // border: 1px dashed pink;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      h2 {
        font-family: 'Noticia Text', Helvetica, Arial, sans-serif;
        font-size: 2.25em;
        font-style: italic;
        font-weight: normal;
      }
      .call-to-action {
        h3 {
          font-size: 1.5em;
        }
        h4 {
          font-size: 1em;
        }
      }
    }
    nav {
      display: flex;
      width: 100%;
      padding-bottom: 1vh;
      a {
        text-decoration: none;
      }
      button {
        color: white;
      }
      .action-buttons {
        margin-left: auto;
      }
    }
  }
}



</style>
