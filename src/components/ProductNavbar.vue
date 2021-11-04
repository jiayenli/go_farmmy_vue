<template>
  <div >
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
    <div class="product-content-nav-category">
      <h2>商品分類</h2>
      <div class="product-content-nav-category-name" @click="refresh">
        <router-link
          class="product-content-nav-category-link"
          :to="{ name: 'Product' }"
          
        >
          <h3>全部</h3>
        </router-link>

        <div>
          <router-link
            class="product-content-nav-category-link"
            :to="{ name: 'Product', query: { categoryId: 1 } }"
          >
            <h3>果物</h3>
          </router-link>
        </div>
        <div>
          <router-link
            class="product-content-nav-category-link cat"
            :to="{ name: 'Product', query: { categoryId: 11 } }"
          >
            <h3>蔬菜</h3>
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
    filterName:""
    }

  },

  methods: {
    refresh(){
      this.$emit('refresh')
    },
    filterItem() {
      this.$store.commit('addFilterKeyword', this.filterName)
      this.$emit('listPageFilter')
      this.$emit('detailPageFilter')
      this.filterName = ""

    }

  },
}



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
            transform: scale(1.05,1.05);

          }
        }
      }
    

.product-content-nav-category {
  margin-top: 18%;
  border: 4px $color-brown solid;
  background-color: $color-brown;

  h2 {
    padding: 2%;
    color: white;
  }
  &-name {
    background-image: url("./../assets/home-background.png");
    padding: 2%;
    padding-top: 5%;
  }
  &-link {
    h3 {
      color: $color-brown;
      margin-bottom: 5%;
    }
    h3::before {
      content: "";
      display: inline-block;
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
  .router-link-exact-active {
    h3::before {
      background-color: $color-brown;
    }
  }
}
</style>