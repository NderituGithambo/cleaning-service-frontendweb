<template>
  <header class="pa-0">
    <h1 class="my-3">{{ logo }}</h1>

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
  background-color: #efefef;
  display: flex;
  align-items: center;
  .header-menu {
    display: flex;
    width: 100%;
    height: 100%;
    align-self: flex-end;
    .action-buttons {
      margin-left: auto;
    }
  }
}

h1 {
 font-weight: normal;
}

a {
  color: black;
  text-decoration: none;
}
</style>
