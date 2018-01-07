<template>
  <header class="pa-0 noselect">
    <h1>{{ logo }}</h1>

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
            <v-btn large class="ma-0" flat :ripple="false">Home</v-btn>
          </router-link>
          <router-link to="/about">
            <v-btn large class="ma-0" flat :ripple="false">About Us</v-btn>
          </router-link>
        </div>
        <div class="action-buttons">
          <router-link to="/request">
            <v-btn large class="ma-0" flat :ripple="false">Request Service</v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn large class="ma-0" flat :ripple="false">Log in</v-btn>
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
$pearl: #EDEEEA;
$beige: #D9DDC5;
$dark-green: #426151;
$green: #82A684;
$light-green: #B8CCAF;
$lighter-green: #DDE5D9;

$font-color: $light-green;

header {
  display: flex;
  align-items: center;
  height: 160px;
  background-color: $lighter-green;
  border-bottom: 1px solid $light-green;
  h1 {
    font-family: 'Great Vibes', Helvetica, Arial, sans-serif;
    font-size: 3.5em;
    font-weight: normal;
    color: $dark-green;
  }
  .header-aside {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    .headlines {
      height: 75%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      h2 {
        font-size: 2em;
        font-style: italic;
        font-weight: normal;
        color: $light-green;
      }
      .call-to-action {
        color: $dark-green;
        h3 {
          font-size: 1.5em;
        }
        h4 {
          font-size: 1em;
        }
      }
    }
    nav {
      font-family: 'Francois One', Helvetica, Arial, sans-serif;
      display: flex;
      width: 100%;
      height: 25%;
      a {
        text-decoration: none;
        button {
          color: $green;
          height: 100%;
        }
      }
      .action-buttons {
        margin-left: auto;
      }
    }
  }
}

</style>
