<template>
  <main>
    <section>
      <article>
        Photos here
      </article>
      <aside>
        <request-form v-if="!isRequestSent" :indicateRequestReceived="indicateRequestReceived"/>
        <transition name="fade">
          <request-received v-if="isRequestSent"/>
        </transition>
      </aside>
    </section>
  </main>
</template>


<script>
import requestForm from './requestForm.vue'
import requestReceived from './requestReceived.vue'

export default {
  name: 'Home',
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
@import "../../colors.scss";

section {
  display: grid;
  grid-template-columns: [col] 33% [col] 33% [col] 33%;
  grid-template-rows: [row] auto [row] auto [row];

}

article {
  grid-column: col / span 2;
  grid-row: row;

  display: flex;
  align-items: flex-start;

  // border: 1px dashed red;
}

aside {
  grid-column: col 3 / span 2;
  grid-row: row;

  display: flex;
  align-items: flex-start;

  background-color: $transparent;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
