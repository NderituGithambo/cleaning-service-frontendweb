<template>
  <footer>
    <span>{{ msg }}</span>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Copyright 2018 JG Development',
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
    background-color: #212121;
    text-align: center;
    padding: 20px;
    color: #9e9e9e;

    position: absolute;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
}
span {
  font-size: 0.8em;
}
h1 {
  font-weight: normal;
}

</style>
