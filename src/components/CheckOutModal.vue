<template>
  <div class="loader-area">
    <div class="loader-area-hightlight">
      <form name="Spgateway" :action="tradeInfo.PayGateWay" method="POST">
        <h1>訂單已建立</h1>
        <h3>訂單金額為：{{totalCost}} 元</h3>
        <input type="hidden" name="MerchantID" :value="tradeInfo.MerchantID" />
        <input type="hidden" name="TradeInfo" :value="tradeInfo.TradeInfo" />
        <input type="hidden" name="TradeSha" :value="tradeInfo.TradeSha" />
        <input type="hidden" name="Version" :value="tradeInfo.Version" />
        <button type="submit">前往付款</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
.loader-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;

  &-hightlight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 30%;
    border: 8px $color-yellow solid;
    border-radius: 20px;
    padding: 3%;
    height: 250px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      border-radius: 5px;
      padding: 4%;
      font-size: 20px;
      background-color: $color-yellow;
      margin-top: 5%;
      font-weight: bolder;
    }
  }
}
</style>

<script>
export default {
  props: {
    tradeInfo: {
      require: true,
    },
    totalCost: {
      require: true,
    },
  },

  method: {
    empyItems() {
      this.$store.dispatch('ChangeShoppingCart', [])
    }
  },
  beforeDestroy() {
    console.log('有觸發')
this.empyItems()
  }
};
</script>