<template>
  <main>
    <h1>{{ msg }}</h1>
    <br/>
    <h2>Please fill out the form below and we will respond to you as soon as possible.</h2>
    <br/>
    <h3>Or if you would like to become a regular customer, <router-link to="/register">please register here.</router-link></h3>
    <br/>
    <request-form/>

  </main>
</template>


<script>
import requestForm from './requestForm.vue'

export default {
  name: 'Request',
  components: {
    'request-form': requestForm,
  },
  data() {
    return {
      msg: 'Request service',
    };
  },
};
</script>


<style scoped>
a {
  color: #000;
}
h1 {
  font-weight: normal;
}
h2 {
  font-size: 1.2em;
}
h3 {
  font-size: 1em;
}
form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
