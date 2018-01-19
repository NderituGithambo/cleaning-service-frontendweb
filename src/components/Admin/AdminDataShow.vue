<template>
  <div class="container">
    <v-list two-line>
      <template v-for="(item, key) in items">
        <v-subheader v-if="key" v-text="key"></v-subheader>
        <v-list-tile v-else v-bind:key="item">
        <v-list-tile-content>
          <v-list-tile-title v-html="item"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item"></v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    dataModel: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      items: [],
    }
  },

  mounted() {
    this.fetchItems()
  },

  methods: {
    async fetchItems() { // Not using this
      this.loading = true
      try {
        const config = {
          headers: { Authorization: localStorage.getItem("token") }
        }
        const request = axios.get(`http://localhost:3000/admin/${this.dataModel}s/${this.$route.params.id}`, config)
        const response = await request
        this.items = response.data

        console.log(response)

      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
  }
}
</script>

<style lang="scss" scoped>


</style>
