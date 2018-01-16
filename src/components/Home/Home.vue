<template>
  <main>
    <section>
      <article>
        this is stuff
      </article>
      <aside>
        <request-form v-if="!isRequestSent" :indicateRequestReceived="indicateRequestReceived"/>
        <request-received v-if="isRequestSent"/>
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
  grid-template-columns: [col] 25% [col] 25% [col] 25% [col] 25%;
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

  // border: 1px dashed green;
}

</style>
