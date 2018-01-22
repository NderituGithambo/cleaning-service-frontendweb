<template>
  <div
    v-on:dblclick="catchDblClick"
    class="event">
    hello from event
  </div>
</template>


<script>
import VueTimepicker from 'vue2-timepicker'

export default {
  props: ['onDblClickEvent'],

  data() {
    return {
    }
  },

  methods: {
    catchDblClick: function(event) {
      event.stopPropagation()
      console.log(this);
      this.onDblClickEvent.onDblClickEvent(event)
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

div.event {
  font-size: 0.8em;
  background-color: rgb(255, 154, 136);
  margin: 1px 0;
  z-index: 4;
  text-align: left;
  padding-left: 0.25em;
}

</style>
