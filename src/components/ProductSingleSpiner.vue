<template>
  <div class="product-spiner">
    <div class="title">
      <div></div>
    </div>

    <div class="product-spiner-items-card">
      <div class="product-spiner-items-card-img">
        <div></div>
      </div>

      <div class="product-spiner-items-card-text">
        <h1><div></div></h1>
        <div class="product-spiner-items-card-panel">
          <div></div>
        </div>
        <div class="product-spiner-items-card-price">
          <div></div>
        </div>
        <div class="product-spiner-items-card-specification">
          <div></div>
        </div>
        <div class="product-spiner-items-card-specification">
          <div></div>
        </div>
        <div class="product-spiner-items-card-description">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";

.product-spiner {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 5% 2%;
}
.title {
  width: 100%;
  border: 4px $color-brown solid;
  background-color: $color-yellow;
  height: 50px;
  div {
    height: 100%;
    animation: spiner 1s linear infinite;
    background-color: rgb(250, 241, 165);
  }
}
.product-spiner-items-card {
  position: relative;
  background-color: white;
  border: 4px $color-brown solid;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2% 2%;
  margin: 1% 0;
  h1 {
    background-color: $color-lightBrown;
    margin-bottom: 3%;
    height: 42px;
    div {
      height: 100%;
      animation: spiner 1s linear infinite;
      background-color: $color-spinerBrown;
    }
  }
  &-text {
    width: 40%;
  }
  &-specification,
  &-price {
    background-color: $color-lightBrown;
    height: 26px;
    width: 80%;
    margin-top: 3%;
    div {
      height: 100%;
      animation: spiner 1s linear infinite;
      background-color: $color-spinerBrown;
    }
  }
  &-description {
    background-color: $color-lightBrown;
    height: 40%;
    width: 100%;
    margin-top: 3%;
    div {
      height: 100%;
      animation: spiner 1s linear infinite;
      background-color: $color-spinerBrown;
    }
  }

  &-img {
    background-color: $color-lightBrown;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    width: 55%;
    height: 350px;
    div {
      background-color: $color-spinerBrown;
      animation: spiner 1s linear infinite;
      height: 100%;
    }
  }

  &-panel {
    height: 28px;
    width: 60%;
    position: relative;
    background-color: $color-lightBrown;
    margin: 2% 0 5% 0;
    div {
      height: 100%;
      animation: spiner 1s linear infinite;
      background-color: $color-spinerBrown;
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

@media screen and (max-width: 1000px) {
  .product-spiner-items-card {
    height: 100%;
    &-specification,
    &-price {
      flex-direction: column;
    }
    &-img {
      height: 30vw;
    }
    &-description {
      height: 20%;
    }
    &-panel {
      width: 80%;
    }
  }
}
@media screen and (max-width: 767px) {
  .product-spiner-items-card {
    &-img {
      height: 40vw;
    }
    &-panel {
      width: 80%;
    }
  }
}
@media screen and (max-width: 539px) {
  .product-spiner-items-card {
    flex-direction: column;
    h1 {
      margin-top: 5% ;
      text-align: center;
    }
    &-panel {
      margin: 0 auto;
    }
    &-specification,
    &-price {
      flex-direction: row;
    }
    &-text {
      width: 100%;
    }
    &-img {
      width: 100%;
    }
  }
}
</style>
