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
h1 {
  font-weight: normal;
}
</style>
