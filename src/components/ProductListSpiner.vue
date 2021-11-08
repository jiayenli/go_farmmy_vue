<template>
  <div class="product-spiner">
    <div class="product-spiner-items-card" v-for="item in items" :key="item.id">
      <div class="product-spiner-items-card-img">
        <div class="product-spiner-items-card-img-2"></div>
      </div>
      <div class="title"><div></div></div>
      <div class="product-spiner-items-card-specification">
        <div></div>
      </div>
      <div class="product-spiner-items-card-price">
        <div></div>
      </div>
      <div class="product-spiner-items-card-panel">
        <div class="product-spiner-items-card-panel-number">
          <button class="product-spiner-items-card-panel-number-icon">
            <div></div>
          </button>
          <button class="product-spiner-items-card-panel-number-icon">
            <div></div>
          </button>
          <div class="input"><div></div></div>
        </div>
        <button class="product-spiner-items-card-panel-button">
          <div></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";

.product-spiner {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.product-spiner-items-card {
  //margin-right: 4%;
  position: relative;
  height: 420px;
  width: 33.3%;
  padding: 0 2%;
  margin-bottom: 1%;
  .title {
    margin: 0 auto;
    background-color: $color-lightBrown;
    height: 28px;
    width: 100%;
    margin-top: 3%;
    text-align: start;
    div {
      background-color: $color-spinerBrown;
      animation: spiner 1s linear infinite;
      height: 100%;
    }
  }
  &-specification,
  &-price {
    margin: 0 auto;
    width: 60%;
    height: 14px;
    margin-top: 1%;
    background-color: $color-lightBrown;
    div {
      background-color: $color-spinerBrown;
      animation: spiner 1s linear infinite;
      height: 100%;
    }
  }
  &-img {
    width: 100%;
    height: 60%;
    max-height: 220px;
    background-color: $color-lightBrown;

    overflow: hidden;
    &-2 {
      height: 100%;
      background-color: $color-spinerBrown;
      animation: spiner 1s linear infinite;
    }
  }

  &-panel {
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &-number {
      width: 50%;
      display: flex;
      &-icon {
        background-color: $color-lightBrown;
        display: flex;
        height: 25px;
        width: 25px;
        margin-right: 3%;
        padding: 2% 0 0 0;
        div {
          background-color: $color-spinerBrown;
          animation: spiner 1s linear infinite;
          height: 100%;
        }
      }
      .input {
        background-color: $color-lightBrown;
        display: inline-block;
        width: 80%;
        margin: 0 2%;
        height: 25px;
        padding-left: 2%;
        div {
          background-color: $color-spinerBrown;
          animation: spiner 1s linear infinite;
          height: 100%;
        }
      }
    }
    &-button {
      background-color: $color-lightBrown;
      height: 25px;
      width: 30%;
      padding: 2%;
      div {
        background-color: $color-spinerBrown;
        animation: spiner 1s linear infinite;
        height: 100%;
      }
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
@media screen and (max-width: 1000px) {
  .product-spiner-items-card {
    width: 50%;
  }
}
@media screen and (max-width: 539px) {
  .product-spiner-items-card {
    height: 280px;
    &-panel {
      display: none;
    }
  }

}

</style>

<script>
export default {
  data() {
    return {
      items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
  },
};
</script>