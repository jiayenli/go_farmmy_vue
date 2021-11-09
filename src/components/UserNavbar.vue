<template>
  <div>
    <div class="product-content-nav-search">
      <div>
        <i class="fas fa-search" @click="filterItem"></i>
      </div>
      <input
        placeholder="商品搜尋！ex：火龍果！"
        type="text"
        required
        v-model="filterName"
        @keyup.enter="filterItem"
      />
    </div>
    <div class="user-content-nav-category">
      <div class="user-content-nav-category-name">
        <router-link
          class="user-content-nav-category-link"
          :to="{ name: 'User-Profile' }"
        >
          <h3>個人資料</h3>
        </router-link>
      </div>
      <div class="user-content-nav-category-name">
        <div>
          <router-link
            class="user-content-nav-category-link"
            :to="{ name: 'User-Order' }"
          >
            <h3>訂單查詢</h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterName: "",
    };
  },

  methods: {
    filterItem() {
      this.$store.commit("addFilterKeyword", this.filterName);
      this.$emit("listPageFilter");
      this.$emit("detailPageFilter");
      this.filterName = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

// outline: green 1px solid;
.product-content-nav-search {
  display: flex;
  //padding: 2%;
  //background-color: $color-brown;
  input {
    margin-left: 5%;
    height: 40px;
    border: 4px $color-brown solid;
    padding-left: 2%;
    width: 100%;
  }
  div {
    flex-shrink: 0;
    display: flex;
    height: 40px;
    width: 40px;
    background-color: $color-brown;
    justify-content: center;
    align-items: center;
    color: white;
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      transform: scale(1.05, 1.05);
    }
  }
}

.user-content-nav-category {
  margin-top: 18%;
  h2 {
    padding: 2%;
  }
  &-name {
    margin-bottom: 4%;
    border: 4px $color-brown solid;
    background-color: $color-yellow;
    transition: 0.3s;
    padding: 2%;
    padding-top: 5%;
    &:hover {
      transform: translateX(-6%);
    }
  }
  &-link {
    h3 {
      color: $color-brown;
      margin-bottom: 5%;
    }
    h3::before {
      content: "";
      display: inline-block;
      background-color: white;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      border: 4px $color-brown solid;
      margin-right: 5%;
      transition: 0.3s;
    }
    h3:hover {
      &::before {
        background-color: $color-brown;
      }
    }
  }
  .router-link-active {
    h3::before {
      background-color: $color-brown;
    }
  }
}
@media screen and (max-width: 767px) {
  .product-content-nav-search {
 margin-top: 5%;
 
  }
  .user-content-nav-category {
   
    justify-content: center;
    width: 100%;
    margin-top: 3%;
    
    display: flex;

    &-name {
      width: 30%;

      margin: 0 1% 2% 1%;
      border: 4px $color-brown solid;
      background-color: $color-yellow;
      transition: 0.3s;
      padding: 1%;
      &:hover {
        transform: translateX(-6%);
      }
    }
  }
}
@media screen and (max-width: 539px) {
  .user-content-nav-category {
    margin-top: 5%;
    margin-bottom: 4%;
    &-name {
      width: 50%;
    }
  }
}
</style>