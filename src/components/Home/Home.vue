<template>
  <div>
    <div class="image">
      <div class="gradient-cover"/>
    </div>
    <div>
      <main>
        <section>
          <article>
            <pre>{{ dummyText }}</pre>
          </article>
          <aside>
            <request-form v-if="!isRequestSent" :indicateRequestReceived="indicateRequestReceived"/>
            <transition name="fade">
              <request-received v-if="isRequestSent"/>
            </transition>
          </aside>
        </section>
      </main>
    </div>
  </div>
</template>


<script>
import requestForm from './requestForm.vue'
import requestReceived from './requestReceived.vue'

import { dummyText } from './dummyText.js'

export default {
  name: 'Home',
  components: {
    'request-form': requestForm,
    'request-received': requestReceived
  },
  data() {
    return {
      isRequestSent: false,
      dummyText: dummyText,
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
  grid-template-columns: [col] 60% [col] 40%;
  grid-template-rows: [row] auto;

}

article {
  grid-column: col / span 1;
  grid-row: row;

  display: flex;
  align-items: flex-start;

  text-align: left;
  padding: 1em;
  margin-right: 2em;
  font-size: 1.2em;

  background: $transparent;

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
}

div.image {
  width: 100%;
  height: 600px;
  background-image: url("../../assets/clouds.jpeg");
  background-size: 100%;

  .gradient-cover {
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, transparent 80%, white);
  }
}

aside {
  grid-column: col 2 / span 1;
  height: min-content;

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
