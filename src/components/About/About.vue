<template>
  <main>
    <h1>{{ msg }}</h1>
    <br/>
    <p>
      Egestas quis ipsum suspendisse ultrices gravida dictum. Malesuada fames ac turpis egestas. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Pellentesque diam volutpat commodo sed egestas egestas. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Felis eget velit aliquet sagittis id consectetur. Tortor pretium viverra suspendisse potenti nullam. Nisl tincidunt eget nullam non nisi est. Enim eu turpis egestas pretium aenean pharetra magna. Porta lorem mollis aliquam ut porttitor. Dictum fusce ut placerat orci nulla pellentesque dignissim enim.
    </p>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'About us',
    };
  },
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
