<template>
  <main>

    <h1>Register</h1>

    <br/>
    <h2>Please fill out the form below to register as a new user.</h2>
    <br/>

    <register-form/>

  </main>
</template>


<script>
import registerForm from './registerForm.vue'

export default {
  name: 'Register',
  components: {
    'register-form': registerForm,
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
form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
