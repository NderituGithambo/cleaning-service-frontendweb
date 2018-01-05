<template>
  <footer>
    <h1>{{ msg }}</h1>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      msg: 'This is the footer',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
    background-color: #F8F8F8;
    text-align: center;
    padding: 20px;

    position: absolute;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
}
h1 {
  font-weight: normal;
}

</style>
