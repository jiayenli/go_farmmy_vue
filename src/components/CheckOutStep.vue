<template>
  <div class="checkout-step">
    <div class="checkout-step-content">
      <div class="content checkout-step-content-1">
          <div
            v-if="checkOutStep === 1"
            class="number number-fas checkout-step-content-1-number"
            :class="{ yellow: checkOutStep >= 1 }"
          >
            1
          </div>
          <div
            v-if="checkOutStep > 1"
            class="number number-fas checkout-step-content-1-number yellow"
          >
            <i class="fas fa-check"></i>
          </div>
        <div class="text checkout-step-content-text"><h3>確認商品</h3></div>
      </div>
      <div class="checkout-step-content-space" ></div>
      <div class="content checkout-step-content-2">
          <div
            class="number checkout-step-content-2-number"
            v-if="checkOutStep <= 2"
            :class="{ yellow: checkOutStep === 2 }"
          >
            2
          </div>
          <div
            v-if="checkOutStep > 2"
            class="number yellow checkout-step-content-2-number"
          >
            <i class="fas fa-check"></i>
          </div>
        <div class="text checkout-step-content-2-text"><h3>填寫資料</h3></div>
      </div>
      <div class="checkout-step-content-space"></div>
      <div class="content checkout-step-content-3">
        <div
          class="number checkout-step-content-3-number"
          v-if="checkOutStep <= 3"
          :class="{ yellow: checkOutStep === 3 }"
        >
          3
        </div>
        <div
          v-if="checkOutStep > 3"
          class="number yellow checkout-step-content-3-number"
        >
          <i class="fas fa-check"></i>
        </div>
        <div class="text checkout-step-content-3-text"><h3>訂單付款</h3></div>
      </div>
      <div class="checkout-step-content-space"></div>
      <div class="content checkout-step-content-4">
        <div
          class="number checkout-step-content-4-number"
          v-if="checkOutStep < 4"
          :class="{ yellow: checkOutStep === 4 }"
        >
          4
        </div>
        <div
          v-if="checkOutStep === 4"
          class="number checkout-step-content-4-number yellow"
        >
          <i class="fas fa-check"></i>
        </div>
        <div class="text checkout-step-content-4-text"><h3>訂購完成</h3></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["checkOutStep"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

.checkout-step {
  margin-top: 2%;
  &-content {
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    width: 40%;
    margin-top: 3%;
    &-space {
      width: 5%;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .number {
      display: flex;
      flex-shrink: 1;
      justify-content: center;
      align-items: center;

      height: 50px;
      width: 50px;
      border-radius: 50%;
      font-weight: bolder;
      color: $color-brown;
      border: 3px $color-brown solid;
    }
    &-space {
      height: 50px;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        width: 100%;
        height: 3px;
        background-color: $color-brown;
      }
    }
  }
  &-title {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    //border-top: 3px $color-brown solid;
  }
}
.number-fas,
.yellow {
  background-color: $color-yellow;
}
</style>