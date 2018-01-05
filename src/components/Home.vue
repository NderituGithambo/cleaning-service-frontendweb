<template>
  <main>
    <h1 v-for="index in 10">{{ msg }}</h1>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'This is the home page',
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
