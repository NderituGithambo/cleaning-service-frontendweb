<template>
  <div
    v-on:click="catchOnClick"
    :style="stylePosition">
    <h1></h1>
    {{ date }}
  </div>
</template>


<script>
export default {
  props: ['stylePosition', 'date'],

  data() {
    return {
    }
  },

  methods: {
    catchOnClick: function(event) {
      event.stopPropagation()
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

div {
  height: 16em;
  width: 20em;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;

  $top: 4px;
  $left: 4px;
  $blur: 16px;
  $sprd: 4px;
  $clr: rgba(0, 0, 0, 0.425);
  box-shadow: $left $top $blur $sprd $clr;
  -moz-box-shadow: $left $top $blur $sprd $clr;
  -webkit-box-shadow: $left $top $blur $sprd $clr;

  position: absolute;
  z-index: 5;
}

</style>
