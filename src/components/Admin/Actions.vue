<template>
  <main>
    <h1>Actions</h1>
    <br/>
    <v-card>

      <router-link to="/admin/jobs/create">
        <v-btn color="primary">Create new job</v-btn>
      </router-link>

    </v-card>
  </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
h2 {
  padding: 2em;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  margin-top: 2em;
  max-width: 600px;
}
</style>
