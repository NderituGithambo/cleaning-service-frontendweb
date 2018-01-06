<template>
  <header class="pa-0 green darken-2">
    <h1 class="my-1">{{ logo }}</h1>

    <div class="header-aside">
      <h2>Clean house, happy life</h2>

      <div class="header-menu">
        <div class="info-buttons">
          <router-link to="/">
            <v-btn class="ma-0" flat>Home</v-btn>
          </router-link>
          <router-link to="/about">
            <v-btn class="ma-0" flat>About Us</v-btn>
          </router-link>
        </div>

        <div class="action-buttons">
          <router-link to="/request">
            <v-btn class="ma-0" flat>Request Service</v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn class="ma-0" flat>Log in</v-btn>
          </router-link>
        </div>
      </div>
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
  h1 {
    font-family: 'Great Vibes', Helvetica, Arial, sans-serif;
    font-size: 3em;
  }
  .header-aside {
    width: 100%;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    h2 {
      font-family: 'Great Vibes', Helvetica, Arial, sans-serif;
      font-size: 2.4em;
      font-weight: normal;
      align-self: flex-start;
      margin-bottom: 2vh;
      margin-left: 2vw;
    }
    .header-menu {
      display: flex;
      width: 100%;
      align-self: flex-end;
      a {
        text-decoration: none;
      }
      .btn {
        color: white;
      }
      .action-buttons {
        margin-left: auto;
      }
    }
  }
}



</style>
