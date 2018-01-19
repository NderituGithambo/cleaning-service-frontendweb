<template>
  <div>
    <h1>Actions</h1>
    <br/>
    <v-card>

      <router-link to="/admin/jobs/create">
        <v-btn color="primary">Create new job</v-btn>
      </router-link>

    </v-card>
  </div>
</template>

<script>
export default {

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
