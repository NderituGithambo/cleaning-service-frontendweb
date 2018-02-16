<template>
  <div
    v-on:dblclick.stop="catchDblClick"
    class="event"
    :class=getClassFromType()>
    <div v-if="eventData.type !== 'eventPlaceholder'">
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

  methods: {
    catchDblClick() {
      this.eventData.el = this.$el
      this.$emit('catch-dbl-click-on-event', this.eventData)
    },

    getClassFromType() {
      switch (this.eventData.type) {
        case 'existingEvent':
          return 'existing-event'
        case 'eventPlaceholder':
          return 'event-placeholder'
        case 'stashedEvent':
          return 'stashed-event'
        default:
          break;
      }
    }
  },

  watch: {
    eventData: function() {
      console.log("***", this.eventData)
    }
  },



  mounted() {
    // If this is a new event...
    if (this.eventData.type === 'eventPlaceholder') {
      this.eventData.el = this.$el
      this.$emit('handle-new-event-placeholder-creation', this.eventData)
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
  justify-content: center;
}

.existing-event {
  background-color: rgb(255, 154, 136);
  border: 1px solid transparent;
}

.event-placeholder, .stashed-event {
  background-color: rgba(240, 248, 255, 0.5);
  border: 1px dashed blue;
}
</style>
