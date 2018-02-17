<template>
  <div
    v-on:dblclick.stop="catchDblClick"
    class="event"
    :class="getClassFromType()">
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
          return `existing-event ${this.getEventColorClassFromStatus(this.eventData.content)}`
        case 'eventPlaceholder':
          return 'event-placeholder'
        case 'stashedEvent':
          return 'stashed-event'
        default:
          break;
      }
    },


    // For color-coding existing events
    getJobStatusFromContent(content) {
      const {
        time_work_started: workStarted,
        time_work_completed: workCompleted,
        is_paid: isPaid,
      } = content

      if (!workStarted && !workCompleted && !isPaid) return 'NEW'
      if (workStarted && !workCompleted && !isPaid) return 'IN_PROGRESS'
      if (workStarted && workCompleted && !isPaid) return 'NEEDS_BILLING'
      if (workStarted && workCompleted && isPaid) return 'ALL_COMPLETE'
    },

    getEventColorClassFromStatus(content) {
      const status = this.getJobStatusFromContent(content)
      switch (status) {
        case 'NEW': return 'color-new'
        case 'IN_PROGRESS': return 'color-in-progress'
        case 'NEEDS_BILLING': return 'color-needs-billing'
        case 'ALL_COMPLETE': return 'color-all-complete'
        default: break
      }
    },
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
  // background-color: rgb(255, 154, 136);
  border: 1px solid transparent;
}

.event-placeholder, .stashed-event {
  background-color: rgba(240, 248, 255, 0.5);
  border: 1px dashed blue;
}


.color-new {
  background-color: cyan;
}

.color-in-progress {
  background-color: orange;
}

.color-needs-billing {
  background-color: red;
}

.color-all-complete {
  background-color: green;
}
</style>
