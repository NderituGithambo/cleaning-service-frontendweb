<template>
  <main>
    <h1>Pay your bill</h1>
    <br/>
    <article>
      <div class="billing-form">
        <div class="row">
          <div class="col label">
            Amount:
          </div>
          <div class="col content">
            {{ product.amount | toDollarsFromCents }}
          </div>
        </div>
      </div>

      <form>
        <stripe-checkout
          stripe-key="pk_test_HIh09nVUrjsvmETgIB6I0Lex"
          :product="product">
        </stripe-checkout>
      </form>

    </article>
  </main>
</template>

<script>
import axios from 'axios'
import to from '../../to'

import { StripeCheckout } from 'vue-stripe'

export default {
  name: 'Billing',

  components: {
    'stripe-checkout': StripeCheckout
  },

  data() {
    return {
      uuid: this.$route.query.uuid,
      product: {
        name: 'VanCleaning',
        description: 'Bill payment',
        amount: 0, // 100$ in cents
      }
    };
  },

  methods: {
    async fetchBillAmount() {
      const config = { headers: { Authorization: localStorage.getItem("token") }}
      const request = axios.get(`http://localhost:3000/guest/billing/${this.uuid}`, config)
      const [error, response] = await to(request)
      if (error) console.log(error)
      const { amount } = response.data
      this.product.amount = Number(amount) * 100
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
  align-items: center;
  flex-direction: column;

  .billing-form {
    // border: 1px solid lime;
    width: 60%;
    min-width: 500px;
    background-color: white;

    .row {
      width: 100%;
      display: flex;

      .col {
        padding: 1em;
      }

      .label {
        text-align: right;
        width: 20%;
        // border: 1px dashed red;
        font-weight: bold;
      }

      .content {
        text-align: left;
        width: 80%;
        // border: 1px dashed orange;
      }
    }
  }
}
</style>
