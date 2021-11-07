<template>
  <div class="checkout-product-spiner">
    <div class="checkout-product-spiner-top">
      <h4>
        <div></div>
      </h4>
      <h4><div></div></h4>
    </div>
    <div class="checkout-product-spiner-left">
      <div class="checkout-product-spiner-left-title">
        <div></div>
      </div>
      <div class="checkout-product-spiner-left-content">
        <div class="checkout-product-spiner-left-content-products">
          <div class="checkout-product-spiner-left-content-title">
            <div class="product-image"><div></div></div>
            <div class="product-name"><div></div></div>
            <div class="product-number"><div></div></div>
            <div class="product-price"><div></div></div>
            <div class="product-totle"><div></div></div>
          </div>
          <div class="checkout-product-spiner-left-content-product">
            <div class="product-image"><div></div></div>
            <div class="product-name"></div>
            <div class="product-number"></div>
            <div class="product-price"></div>
            <div class="product-totle"></div>
          </div>
          <div class="checkout-product-spiner-left-content-totlePrice">
            <h4><div></div></h4>
          </div>
        </div>
      </div>
      <h2 class="title-2"><div></div></h2>
      <div class="checkout-product-spiner-left-content">
        <div class="checkout-product-spiner-left-content-orderInfo">
          <div></div>
        </div>
        <div class="checkout-product-spiner-left-content-recieverInfo">
          <div></div>
        </div>
      </div>
    </div>
    <div class="checkout-product-spiner-button">
      <button class="checkout-product-spiner-button-previous" disabled></button>
      <button class="checkout-product-spiner-button-next" disabled></button>
      <button class="checkout-product-spiner-button-delete" disabled></button>
    </div>
  </div>
</template>



<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

.checkout-product {
  &-spiner {
    width: 100%;
    &-top {
      width: 80%;
      margin: 0 auto 1% auto;
      display: flex;
      justify-content: space-between;
      h4 {
        height: 20px;
        width: 20%;
        background-color: $color-lightBrown;
        div {
          height: 100%;
          background-color: $color-spinerBrown;
          animation: spiner 1s linear infinite;
        }
      }
    }
    &-left {
      border: 4px $color-brown solid;
      width: 80%;
      margin: 0 auto;
      &-title {
        height: 70px;
        width: 100%;
        border-bottom: 4px $color-brown solid;
        background-color: $color-yellow;
        text-align: center;
        div {
          height: 100%;
          background-color: rgb(250, 241, 165);
          animation: spiner 1s linear infinite;
        }
      }
      .title-2 {
        height: 60px;
        background-color: $color-yellow;
        border-bottom: 4px $color-brown solid;
        div {
          height: 100%;
          background-color: rgb(250, 241, 165);
          animation: spiner 1s linear infinite;
        }
      }
      &-content {
        width: 100%;
        .product-name,
        .product-number,
        .product-price,
        .product-totle {
          width: 20%;
          margin: 1%;
          height: 24px;
          background-color: $color-lightBrown;
          div {
            height: 100%;
            background-color: $color-spinerBrown;
            animation: spiner 1s linear infinite;
          }
        }
        &-prodcts {
          width: 100%;
        }
        &-product {
          margin-top: 0.5%;
          width: 100%;
          display: flex;
          align-items: center;
          .product-image {
            width: 20%;
            margin: 1%;
            height: 100px;
            background-color: $color-lightBrown;
            div {
              height: 100%;
              background-color: $color-spinerBrown;
              animation: spiner 1s linear infinite;
            }
          }
        }
        &-title {
          width: 100%;
          display: flex;
          border-bottom: 4px $color-brown dashed;
          padding: 1% 0;

          .product-image {
            width: 20%;
            margin: 1%;
            height: 20px;
          }
        }
        &-totlePrice {
          margin-top: 2%;
          border-top: 4px $color-brown dashed;
          border-bottom: 8px $color-brown solid;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 3%;
          h4 {
            height: 80px;
            background-color: $color-lightBrown;
            width: 30%;
          }
          div {
            height: 100%;
            background-color: $color-spinerBrown;
            animation: spiner 1s linear infinite;
          }
        }

        .product-name {
          color: $color-brown;
        }
        &-orderInfo,
        &-recieverInfo {
          margin: 2%;
          height: 60px;
          width: 40%;
          background-color: $color-lightBrown;
          div {
            height: 100%;
            background-color: $color-spinerBrown;
            animation: spiner 1s linear infinite;
          }
        }
      }
    }
    &-button {
      @extend %checkout-button-area;
      width: 50%;
      &-next,
      &-previous,
      &-delete {
        @extend %checkout-button;
        margin: 2%;
        color: $color-brown;
      }
      &-next {
        background-color: $color-green;
      }
      &-delete {
        background-color: $color-red;
      }
    }
    @keyframes spiner {
      0% {
        width: 0%;
      }
      80% {
        width: 100%;
      }
      100% {
        width: 100%;
      }
    }
  }
}
.fas {
  cursor: pointer;
}
</style>
