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
$pearl: #EDEEEA;
$beige: #D9DDC5;
$dark-green: #426151;
$green: #82A684;
$light-green: #B8CCAF;
$lighter-green: #DDE5D9;

$font-color: $light-green;


footer {
  background-color: $dark-green;
  padding: 20px;
  color: $font-color;
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
