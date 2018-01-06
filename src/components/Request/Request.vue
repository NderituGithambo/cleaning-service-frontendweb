<template>
  <main>
    <h1>{{ msg }}</h1>
    <br/>
    <h2>Please fill out the form below and we will respond to you as soon as possible.</h2>

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
h1 {
  font-weight: normal;
}
</style>
