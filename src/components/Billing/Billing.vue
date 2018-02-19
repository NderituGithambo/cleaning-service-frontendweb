<template>
  <main>
    <h1>Pay your bill</h1>
    <br/>
    <article>
      <div class="billing-form">
        <div class="row">
          <div class="label">
            Amount:
          </div>
          <div class="content">
            {{ amount }}
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<script>
import axios from 'axios'
import to from '../../to'

export default {
  name: 'Billing',
  data() {
    return {
      uuid: this.$route.query.uuid,
      amount: '',
    };
  },

  methods: {
    async fetchBillAmount() {
      const config = { headers: { Authorization: localStorage.getItem("token") }}
      const request = axios.get(`http://localhost:3000/guest/billing/${this.uuid}`, config)
      const [error, response] = await to(request)
      if (error) console.log(error)
      const { amount } = response.data
      this.amount = amount
    },
  },

  mounted() {
    this.fetchBillAmount()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../colors.scss";

h1 {
  font-weight: normal;
}

article {
  background-color: $transparent;
  padding: 3em;
  display: flex;
  justify-content: center;

  .billing-form {
    border: 1px solid lime;
    width: 60%;
    min-width: 500px;

    .row {
      width: 100%;
      display: flex;

      .label {
        text-align: right;
        width: 20%;
        border: 1px dashed red;
      }

      .content {
        text-align: left;
        width: 80%;
        border: 1px dashed orange;
      }
    }
  }
}
</style>
