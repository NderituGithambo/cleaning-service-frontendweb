<template>
  <div
    v-on:dblclick="catchDblClick"
    class="event">
    {{ eventData.startTime }}
  </div>
</template>


<script>
export default {
  props: ['eventData'],

  data() {
    return {
    }
  },

  methods: {
    catchDblClick: function(e) {
      e.stopPropagation()
      console.log('You double-clicked an event', this.eventData);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

div.event {
  font-size: 0.8em;
  background-color: rgb(255, 154, 136);
  margin: 1px 2px;
  z-index: 4;
  text-align: left;
  padding-left: 0.25em;
  max-height: 1.6em;
  overflow: hidden;
}

</style>
