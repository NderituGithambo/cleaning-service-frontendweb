<template>
  <main>
    <h1>{{ msg }}</h1>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      msg: '',
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
