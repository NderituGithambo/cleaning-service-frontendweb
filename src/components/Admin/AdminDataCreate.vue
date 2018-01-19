<template>
  <div>
    <h1>Create new {{ dataModel | capitalize | underscoresAreSpaces }}</h1>
    <br/>
    <v-card>
ssad
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    dataModel: {
      type: String,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
h2 {
  padding: 2em;
}

.card {
  margin-top: 2em;
}
</style>
