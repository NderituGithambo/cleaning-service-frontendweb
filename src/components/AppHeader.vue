<template>
  <header class="pa-0">
    <router-link to="/">
      <h1>VanCleaning</h1>
    </router-link>

    <div class="header-aside">
      <div class="headlines">
        <h2>Clean house, happy life</h2>
        <div class="call-to-action">
          <h3>Call 604.899.8955</h3>
          <h4>Or click below to request online!</h4>
        </div>
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
  height: 160px;
  background-color: $zero-opacity;

  h1 {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 3.5em;
    font-weight: normal;
    color: $dark-blue;
    text-align: left;
    margin-left: 1em;
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
        color: rgba(0, 119, 255, 0.145);
        transform: rotate(-4deg);
      }
      .call-to-action {
        color: $dark-blue;
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
      .action-buttons {
        margin-left: auto;
      }
    }
  }
}

a {
  text-decoration: none;
  button {
    color: $blue;
    height: 100%;
  }
}

</style>
