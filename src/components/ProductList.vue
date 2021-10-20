<template>
<div class="product-items">
  <div class="product-content-items-card" v-for="item in initialItems" :key="item.id">
    <div class="product-content-items-card-img">
      <img :src="item.image" />
      <h4>
        {{ item.description | descriptionLength }}
      </h4>
    </div>
    <h2>{{ item.name }} | {{ item.origin }}</h2>
    <div class="product-content-items-card-specification">
      <i class="fas fa-tag"></i> {{ item.specification }}
    </div>

    <div class="product-content-items-card-price">
      價格：{{ item.price }}元/箱
    </div>
    <div class="product-content-items-card-panel">
      <div class="product-content-items-card-panel-number">
        <span class="product-content-items-card-panel-number-icon">+</span>
        <span class="product-content-items-card-panel-number-icon">-</span>
        <input
          ref="getValue"
          value="1"
          class="product-content-items-card-panel-number-input"
          id="number"
          type="number"
          required
        />
        <span>個</span>
      </div>
      <div class="product-content-items-card-panel-button">加入購物車</div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
.product-items {
        display: flex;
      flex-wrap: wrap;
      border-top: solid $color-brown 4px;
      padding-top:5%;
}
.product-content-items-card {
  margin-right: 4%;
  height: 450px;
  width: 300px;
  h2 {
    margin-top: 3%;
    text-align: center;
    color: $color-brown;
  }
  &-specification,
  &-price {
    text-align: center;
    color: $color-brown;
    font-size: 14px;
  }
  &-img {
    position: relative;
    display: flex;
    height: 60%;
    img {
      object-fit: cover;
      transition: 0.5s;
    }
    h4 {
      position: absolute;
      color: $color-brown;
      top: 0;
      right: 50%;
      transform: translateX(50%);
      width: 90%;
      opacity: 0;
      word-wrap: break-word;
      line-height: 200%;
      transition: 0.5s;
    }
    &:hover {
      img {
        opacity: 0.3;
      }
      h4 {
        opacity: 1;
      }
    }
  }

  &-panel {
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &-number {
      display: flex;
      &-icon {
        display: flex;
        height: 25px;
        width: 25px;
        margin-right: 3%;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
        background-color: #edda7e;
        transition: 0.3s;
        color: $color-brown;
        &:hover {
          background-color: $color-brown;
          color: white;
        }
      }

      input {
        display: inline-block;
        width: 20%;
        border: 1px $color-brown solid;
        margin: 0 2%;
        height: 25px;
        padding-left: 2%;
      }
    }
    &-button {
      background-color: $color-brown;
      text-align: center;
      color: white;
      white-space: nowrap;
      font-size: 14px;
      padding: 2%;
      &:hover {
        animation: logoFocus 0.1s linear infinite;
        cursor: pointer;
      }
    }
  }
}
</style>

<script>
import { descriptionLengthFilter} from "./../utils/mixins";
export default {
  props: {
    initialItems: {
      require: true
    }
  },
   mixins:[descriptionLengthFilter],
  data() {
    return{
      items : this.initialItems
    }
  }
  
}
</script>