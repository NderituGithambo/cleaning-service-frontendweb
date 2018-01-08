<template>
  <main>
    <request-form v-if="!isRequestSent" :indicateRequestReceived="indicateRequestReceived"/>
    <request-received v-if="isRequestSent"/>
  </main>
</template>


<script>
import requestForm from './requestForm.vue'
import requestReceived from './requestReceived.vue'

export default {
  name: 'Request',
  components: {
    'request-form': requestForm,
    'request-received': requestReceived
  },
  data() {
    return {
      isRequestSent: false,
    }
  },
  methods: {
    indicateRequestReceived: function() {
      this.isRequestSent = true
    }
  }
};
</script>


<style lang="scss" scoped>
h1 {
  font-weight: normal;
}
h2 {
  font-size: 1.2em;
}
h3 {
  font-size: 1em;
}
</style>
