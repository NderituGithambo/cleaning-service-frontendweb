<template>
  <div
    v-on:dblclick.stop="catchDblClick"
    class="event"
    :class="[eventData.content ? 'existing-event' : 'new-event']">
    <div v-if="eventData.content">
      {{ eventData.startTime }}
    </div>
    <div v-else>
      &nbsp;
    </div>
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
    catchDblClick: function() {
      this.eventData.el = this.$el
      this.$emit('open-pop-up-with-event-data', this.eventData)
    }
  },

  mounted() {
    if (this.$el.classList.contains("new-event")) {
      this.eventData.el = this.$el
      this.$emit('open-pop-up-with-event-data', this.eventData)
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../colors.scss";

div.event {
  font-size: 0.8em;
  margin: 1px 2px;
  z-index: 4;
  text-align: left;
  padding-left: 0.25em;
  max-height: 1.3em;
  overflow: hidden;

  border-radius: 2px;

  display: flex;
  align-items: center;
}

.existing-event {
  background-color: rgb(255, 154, 136);
  border: 1px solid transparent;
}

.new-event {
  background-color: rgba(240, 248, 255, 0.5);
  border: 1px dashed blue;
}


</style>
