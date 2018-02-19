<template>
  <main>
    <h1>{{ msg }}</h1>
    <br/>
    <p>
      Hello from billing {{ $route.query.uuid }}
    </p>
  </main>
</template>

<script>
export default {
  name: 'Billing',
  data() {
    return {
      msg: 'Billing',
    };
  },

  mounted() {
    console.log(this)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
p {
  text-align: left;
}
</style>
