<template>
  <header>
    <router-link to="/">
      <img src="../assets/heading_logo.png" class="heading-logo"/>
    </router-link>

    <div class="headlines">
      <div class="call-to-action">
        <h3>Call 604.899.8955</h3>
        <h4>Or request online now!</h4>
      </div>
    </div>

  </header>
</template>

<script>
export default {
  data() {
    return {
      showHeader: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../colors.scss";

header {
  display: flex;
  align-items: center;
  height: 96px;
  background-color: white;
  opacity: 0.9;
  padding: 0 50px;
  border-bottom: 1px solid gainsboro;

  a {
    // Fix height issue with link around logo
    height: 90px !important;
  }

  .heading-logo {
    max-width: 225px;
    min-width: 225px;
  }

  h1 {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 3.5em;
    font-weight: normal;
    color: $dark-blue;
    text-align: left;
    margin-left: 1em;
  }

  .headlines {
    height: 75%;
    display: flex;
    align-items: center;
    margin-left: auto;

    .call-to-action {
      color: $dark-blue;

      h3 {
        font-size: 1.5em;
        text-align: center;
      }

      h4 {
        font-size: 1em;
      }
    }
  }
}
</style>
