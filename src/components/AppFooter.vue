<template>
  <footer>
    <span>{{ msg }}</span>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      msg: '© 2018 Jon Gaspar',
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../colors.scss";

footer {
  background-color: $zero-opacity;
  padding: 20px;
  color: black;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
  span {
    font-size: 0.8em;
    font-weight: bold;
    float: right;
  }
}

</style>
