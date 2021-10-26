<template>
  <div class="checkout-step">
         <div  class="checkout-step-title">
      <h1>確認商品</h1>
    </div>
    <div class="checkout-step-content">
      <div class="content checkout-step-content-1">
        <div class="number checkout-step-content-1-number">1</div>
        <div class="text checkout-step-content-text">確認商品</div>
      </div>
      <div class="checkout-step-content-space"></div>
      <div class="content checkout-step-content-2">
        <div class="number checkout-step-content-2-number">2</div>
        <div class="text checkout-step-content-2-text">填寫資料</div>
      </div>
      <div class="checkout-step-content-space"></div>
      <div class="content checkout-step-content-3">
        <div class="number checkout-step-content-3-number">3</div>
        <div class="text checkout-step-content-3-text">訂單付款</div>
      </div>
      <div class="checkout-step-content-space"></div>
      <div class="content checkout-step-content-4">
        <div class="number checkout-step-content-4-number">4</div>
        <div class="text checkout-step-content-4-text">訂購完成</div>
      </div>
    </div>
   

  </div>
</template>

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
  }
  &-title {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    //border-top: 3px $color-brown solid;

  }
}
</style>