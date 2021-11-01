<template>
  <div class="orderList">
    <div class="orderList-welcome">
      <div class="orderList-welcome-click">
        <div
          class="orderList-welcome-spinner"
          :class="{ searchActive: searchActive }"
          @click="addListActive"
          v-if="searchActive"
        >
          <i class="fas fa-clipboard-list"></i>
        </div>
        <div
          class="orderList-welcome-spinner"
          :class="{ listActive: listActive }"
          @click="addSearchActive"
          v-if="listActive || initial"
        >
          <i class="fas fa-search"></i>
        </div>
      </div>
      <div class="orderList-welcome-text">
        <div v-if="searchActive" :class="{ searchActiveText: searchActive }">
          <h2>請輸入訂單編號</h2>
          <form>
            <input
              placeholder="ex：3275"
              type="number"
              required
              v-model="filterName"
            />
            <button @click.stop.prevent="filterOrder"><h4>送出</h4></button>
          </form>
        </div>
        <div
          v-if="listActive || initial"
          :class="{ listActiveText: listActive }"
        >
          <h2>{{ currentUser.name }} 您好！</h2>
          <h4>
            目前已經訂購
            <span @click="showAllOrders">{{ orders.length }} </span>筆訂單囉！
          </h4>
          <h4>
            提醒您還有
            <span @click="showUnCompleteOrders"
              >{{ unCompleteOrder.length }} </span
            >筆訂單尚未訂購完成唷！
          </h4>
        </div>
      </div>
    </div>
    <div class="orderList-list">
      <div
        class="orderList-list-card"
        v-for="order in showOrders"
        :key="order.id"
      >
        <div class="orderList-list-card-flex">
          <div
            class="orderList-list-card-notice"
            v-if="order.payment_status === '1'"
          >
            已付款<i class="fas fa-gift"></i>
          </div>
          <div
            class="orderList-list-card-notice2"
            v-if="order.payment_status === '0'"
            @click="gotoPay(order)"
          >
            未付款<i class="far fa-credit-card"></i>
          </div>
          <div>
            <h3>訂單編號:{{ order.id }}</h3>
            <h4>訂單金額：{{ order.amount }} 元</h4>
            <h4>訂購日期：{{ order.createdAt | newTime }}</h4>
          </div>
        </div>
        <div class="orderList-list-card-button">
          <button><h4>訂單詳情</h4></button>
          <button @click="gotoPay(order)" v-if="order.payment_status === '0'"><h4>前往付款</h4></button>
        </div>
      </div>
      <div
        class="orderList-list-none"
        v-if="showOrders.length === 0 && orders.length !== 0"
      >
        <h2>查無此訂單</h2>
        <button @click="showAllOrders">返回列表</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

.orderList {
  margin: 0 auto;
  width: 80%;

  &-welcome {
    position: relative;
    display: flex;
    justify-content: flex-end;
    &-click {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      margin-right: 5%;
    }
    &-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4vw;
      height: 4vw;
      border-radius: 100%;
      border: 4px solid $color-brown;
      cursor: pointer;
      background-color: $color-yellow;
    }

    .listActive {
      background-color: $color-yellow;
      animation: sk-scaleout 0.5s ease-in-out;
    }
    .searchActive {
      background-color: $color-green;
      animation: sk-scaleout-2 0.5s ease-in-out;
    }

    &-text {
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      border-bottom-left-radius: 30px;
      padding-left: 10%;
      width: 80%;
      border: 4px solid $color-brown;
      padding: 2% 3%;
      h4 {
        span {
          cursor: pointer;
          color: $color-red;
        }
      }
    }

    .searchActiveText {
      animation: searchAppear 0.5s ease-in-out;
      opacity: 1;
    }
    .listActiveText {
      animation: listAppear 0.5s ease-in-out;
      opacity: 1;
    }
    input {
      padding: 1%;
      border: 4px solid $color-brown;
    }
    button {
      font-weight: bolder;
      margin-left: 2%;
      background-color: $color-yellow;
      padding: 1%;
    }
  }
  &-list {
    margin: 5% 0;
    &-none {
      text-align: center;
      button {
        margin-top: 2%;
        border: 4px solid $color-brown;
        background-color: $color-yellow;
        padding: 2%;
        font-weight: bolder;
      }
    }
    &-card {
      margin-bottom: 2%;
      opacity: 0.5;
      display: flex;
      border: 4px solid $color-brown;
      background-color: white;
      padding: 1%;
      &:hover {
        opacity: 1;
      }
      &-notice,
      &-notice2 {
        margin-right: 3%;
        color: white;
        border: 4px solid $color-brown;
        height: 80px;
        width: 80px;
        display: flex;
        flex-direction: column;
        
        background-color: $color-brown;
        justify-content: center;
        align-items: center;
        .fas,
        .far {
          margin-top: 10px;
          font-size: 32px;
        }
      }
      &-notice2 {
        cursor: pointer;
        border: 4px solid $color-yellow;
        background-color: $color-red;
      }
      &-flex {
        width: 80%;
        display: flex;
      }

      &-button {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;

        button {
          transition: 0.3s;

          margin: 5%;
          background-color: $color-yellow;
          &:hover {
            transform: translateX(-5%) scale(1.05, 1.05);
          }
          h4 {
            white-space: nowrap;
          }
        }
      }
    }
  }
}

@keyframes sk-scaleout {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(70%);
    width: 3.7vw;
    height: 4.3vw;
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes sk-scaleout-2 {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(70%);
    width: 3.7vw;
    height: 4.3vw;
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes listAppear {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes searchAppear {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script>
import { mapState } from "vuex";
import UserAPI from "./../apis/users";
//import Swal from "sweetalert2";
import moment from "moment";
//import order from '../apis/order';
export default {
  data() {
    return {
      initial: true,
      searchActive: false,
      listActive: false,
      filterName: "",
      orders: [],
      unCompleteOrder: [],
      showOrders: [],
    };
  },
  filters: {
    newTime(datetime) {
      return moment(datetime).format("YYYY-MM-DD");
    },
  },
  methods: {
    addSearchActive() {
      this.listActive = false;
      this.searchActive = true;
      this.initial = false;
    },
    addListActive() {
      this.searchActive = false;
      this.listActive = true;
      this.initial = false;
    },

    async fetchOrder() {
      try {
        const { data } = await UserAPI.getCurrentUser();
        console.log(data);
        this.orders = [...data.userOrders];
        this.unCompleteOrder = this.orders.filter(
          (order) => order.payment_status === "0"
        );
        this.showOrders = this.orders;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        return true;
      } catch (error) {
        console.log(error.message);
      }
    },

    showUnCompleteOrders() {
      if (this.unCompleteOrder.length === 0) {
        return;
      }
      this.showOrders = this.unCompleteOrder;
    },
    showAllOrders() {
      this.showOrders = this.orders;
    },

    filterOrder() {
      this.showOrders = this.orders.filter(
        (order) => order.id === Number(this.filterName)
      );
      this.filterName = "";
    },

    async gotoPay(order) {
      localStorage.setItem("go_farmmy_orderId", order.id);
      this.$router.push({ name: "CheckOut-Payment" });
    },
  },
  computed: {
    ...mapState(["currentUser", "cart"]),
  },
  created() {
    this.fetchOrder();
  },
};
</script>

