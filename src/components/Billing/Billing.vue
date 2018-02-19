<template>
  <main>
    <h1>Pay your bill</h1>
    <br/>
    <article>

      <div class="table">
        <div class="row">
          <div class="col label">
            Amount:
          </div>
          <div class="col content">
            {{ product.amount | toDollarsFromCents }}
          </div>
        </div>
        <div class="row">
          <div class="col label">
            Status:
          </div>
          <div class="col content">
            {{ billStatus }}
          </div>
        </div>
      </div>

      <div v-if="!isPaid" class="stripe-button-container">
        <stripe-checkout
          stripe-key="pk_test_HIh09nVUrjsvmETgIB6I0Lex"
          :product="product"
          on-success="broadcast"
        >
        </stripe-checkout>
      </div>

    </article>
  </main>
</template>

<script>
import axios from 'axios'
import to from '../../to'
import { StripeCheckout, Bus } from 'vue-stripe'


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
      },
      isPaid: null,
    };
  },

  computed: {
    billStatus: function() {
      return this.isPaid ? 'Paid' : 'Not paid'
    }
  },

  methods: {
    async fetchBillingInfo() {
      const config = { headers: { Authorization: localStorage.getItem("token") }}
      const request = axios.get(`http://localhost:3000/guest/billing/${this.uuid}`, config)
      const [error, response] = await to(request)
      if (error) return console.log(error)
      console.log(response.data);
      const { amount, is_paid: isPaid } = response.data
      this.product.amount = Number(amount) * 100
      this.isPaid = isPaid
    },

    async setBillAsPaidAndReload() {
      const config = { headers: { Authorization: localStorage.getItem("token") }}
      const request = axios.patch(`http://localhost:3000/guest/billing/${this.uuid}`, config)
      const [error, response] = await to(request)
      if (error) return console.log(error)
      // Reloads the info
      this.fetchBillingInfo()
    },

  },

  mounted() {
    this.fetchBillingInfo()

    Bus.$on('vue-stripe.success', () => {
      this.setBillAsPaidAndReload()
    });
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

  .table {
    // border: 1px solid lime;
    width: 60%;
    min-width: 500px;
    background-color: white;

    .row {
      width: 100%;
      display: flex;

      .col {
        padding: 2em;
      }

      .label {
        text-align: right;
        width: 50%;
        // border: 1px dashed red;
        font-weight: bold;
      }

      .content {
        text-align: left;
        width: 50%;
        // border: 1px dashed orange;
      }
    }
  }

  .stripe-button-container {
    margin-top: 3em;
  }
}
</style>
