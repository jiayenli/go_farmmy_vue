(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f1cab86"],{2423:function(t,e,s){},4518:function(t,e,s){"use strict";s("a436")},"552b":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"checkout-product"},[t.PaymentStage?e("CheckOutModal",{attrs:{tradeInfo:t.tradeInfo,totalCost:t.totalCost}}):t._e(),t.checkOrderProccessing?e("CheckOrderSpinner",{attrs:{text:t.checkOrderProccessingWord}}):t._e(),e("Navbar"),e("CartNavbar"),t._m(0),e("div",{staticClass:"checkout-product-step"},[e("CheckOutStep")],1),e("form",{attrs:{name:"Spgateway",action:t.tradeInfo.PayGateWay,method:"POST"}},[e("div",{staticClass:"checkout-product-content"},[e("div",{staticClass:"checkout-product-content-left"},[e("h2",[t._v(" 訂單資訊 "),t.productList?e("i",{staticClass:"fas fa-minus-circle",on:{click:t.openProductList}}):e("i",{staticClass:"fas fa-plus-circle",on:{click:t.openProductList}}),e("h6",[t._v("訂單編號："+t._s(t.orderList.id))])]),t.productList?e("div",{staticClass:"checkout-product-content-left-content"},[e("div",{staticClass:"checkout-product-content-left-content-products"},[t._m(1),t._l(t.orderList.items,(function(s){return e("div",{key:s.id,staticClass:"checkout-product-content-left-content-product"},[e("img",{staticClass:"product-image",attrs:{src:s.image}}),e("div",{staticClass:"product-name"},[t._v(t._s(s.name))]),e("div",{staticClass:"product-number"},[t._v(" "+t._s(s.OrderItem.quantity)+" 箱 ")]),e("div",{staticClass:"product-price"},[t._v(t._s(s.price)+" 元")]),e("div",{staticClass:"product-totle"},[t._v(" "+t._s(s.OrderItem.price)+" 元 ")])])})),e("div",{staticClass:"checkout-product-content-left-content-totlePrice"},[e("h4",[t._v("小計："+t._s(t.orderList.amount-t.orderList.shipping_fee)+"元")]),e("h4",[t._v("運費："+t._s(t.orderList.shipping_fee)+"元")]),e("h3",[t._v("總計："+t._s(t.orderList.amount)+"元")])])],2)]):t._e(),e("h2",[t._v(" 寄送資訊 "),t.userInfoList?e("i",{staticClass:"fas fa-minus-circle",on:{click:t.openUserInfoList}}):e("i",{staticClass:"fas fa-plus-circle",on:{click:t.openUserInfoList}})]),t.userInfoList?e("div",{staticClass:"checkout-product-content-left-content"},[e("div",{staticClass:"checkout-product-content-left-content-orderInfo"},[e("h3",[t._v("訂購人資料")]),e("div",[t._v("姓名："+t._s(t.orderList.customerName))]),e("div",[t._v("電話："+t._s(t.orderList.customerPhone))]),e("div",[t._v("Email："+t._s(t.orderList.customerEmail))])]),e("div",{staticClass:"checkout-product-content-left-content-recieverInfo"},[e("h3",[t._v("收件人資料")]),e("div",[t._v("姓名："+t._s(t.orderList.recipientName))]),e("div",[t._v("電話："+t._s(t.orderList.recipientPhone))]),e("div",[t._v("地址："+t._s(t.orderList.recipientAddress))]),e("div",[t._v("Email："+t._s(t.orderList.recipientEmail))])])]):t._e()]),e("div",{staticClass:"checkout-product-content-right"},[e("h2",[t._v("付款方式")]),e("div",{staticClass:"checkout-product-content-right-content"},[e("div",[e("span",{staticClass:"payment-choice",class:{focus:"online"===t.payWay},on:{click:function(e){return t.choicePayWay("online")}}}),e("h3",[t._v("線上付款")])]),t._m(2),t._m(3)])])]),e("input",{attrs:{type:"hidden",name:"MerchantID"},domProps:{value:t.tradeInfo.MerchantID}}),e("input",{attrs:{type:"hidden",name:"TradeInfo"},domProps:{value:t.tradeInfo.TradeInfo}}),e("input",{attrs:{type:"hidden",name:"TradeSha"},domProps:{value:t.tradeInfo.TradeSha}}),e("input",{attrs:{type:"hidden",name:"Version"},domProps:{value:t.tradeInfo.Version}}),t._m(4)])],1)},c=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"checkout-product-cover"},[e("img",{staticClass:"checkout-product-cover-title",attrs:{src:s("c59a")}}),e("img",{staticClass:"checkout-product-cover-img",attrs:{src:s("b220")}})])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"checkout-product-content-left-content-title"},[e("div",{staticClass:"product-image"}),e("div",{staticClass:"product-name"},[t._v("名稱")]),e("div",{staticClass:"product-number"},[t._v("數量")]),e("div",{staticClass:"product-price"},[t._v("單價")]),e("div",{staticClass:"product-totle"},[t._v("小計")])])},function(){var t=this,e=t._self._c;return e("div",[e("span",{staticClass:"payment-choice"}),e("h3",[t._v("轉帳(即將開放)")])])},function(){var t=this,e=t._self._c;return e("div",[e("span",{staticClass:"payment-choice"}),e("h3",[t._v("貨到付款(即將開放)")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"checkout-product-button"},[e("button",{staticClass:"checkout-product-button-next",attrs:{type:"submit"}},[t._v("付款")])])}],o=(s("14d9"),s("d178")),a=s("bd13"),i=s("94ee"),n=s("bc5c"),d=function(){var t=this,e=t._self._c;return e("div",{staticClass:"loader-area"},[e("div",{staticClass:"loader-area-hightlight"},[e("form",{attrs:{name:"Spgateway",action:t.tradeInfo.PayGateWay,method:"POST"}},[e("h1",[t._v("訂單已建立")]),e("h3",[t._v("訂單金額為："+t._s(t.totalCost)+" 元")]),e("input",{attrs:{type:"hidden",name:"MerchantID"},domProps:{value:t.tradeInfo.MerchantID}}),e("input",{attrs:{type:"hidden",name:"TradeInfo"},domProps:{value:t.tradeInfo.TradeInfo}}),e("input",{attrs:{type:"hidden",name:"TradeSha"},domProps:{value:t.tradeInfo.TradeSha}}),e("input",{attrs:{type:"hidden",name:"Version"},domProps:{value:t.tradeInfo.Version}}),e("button",{attrs:{type:"submit"}},[t._v("前往付款")])])])])},u=[],h={props:{tradeInfo:{require:!0},totalCost:{require:!0}},method:{empyItems(){this.$store.dispatch("ChangeShoppingCart",[])}},beforeDestroy(){console.log("有觸發"),this.empyItems()}},p=h,l=(s("c619"),s("2877")),m=Object(l["a"])(p,d,u,!1,null,"162bf505",null),v=m.exports,f=s("2f62"),_=s("3d20"),C=s.n(_),g=s("9b2a"),I={name:"checkout-product",components:{Navbar:o["a"],CartNavbar:a["a"],CheckOutStep:i["a"],CheckOrderSpinner:n["a"],CheckOutModal:v},data(){return{payWay:"online",productList:!0,userInfoList:!1,checkOrderProccessing:!1,checkOrderProccessingWord:"訂單建立中",tradeInfo:{},totalCost:0,PaymentStage:!1,orderId:0,orderList:[]}},methods:{choicePayWay(t){this.payWay=t},openProductList(){this.productList=!this.productList},openUserInfoList(){this.userInfoList=!this.userInfoList},fetchInfo(){this.userInfo={...this.userInfo,...JSON.parse(localStorage.getItem("go_farmmy_user"))}},async pay(t){if(""===t)return this.checkOrderProccessingWord="訂單建立失敗，請至會員中心確認",this.checkOrderProccessing=!0,void setTimeout(this.previousPage,2e3);try{const e=await g["a"].getPayment({Id:t});this.tradeInfo=e.data.tradeInfo,this.checkOrderProccessing=!1}catch(e){this.checkOrderProccessing=!1,C.a.fire({icon:"warning",title:"訂單建立失敗，請與客服聯繫 ",toast:!0,showConfirmButton:!1,timer:2e3}),setTimeout(this.previousPage,2e3)}},async getOrder(t){try{const e=await g["a"].getOrder({Id:t});if("1"===e.data.order.payment_status)return void this.$router.push({name:"CheckOut-Complete"});this.orderList=e.data.order,this.checkOrderProccessing=!1}catch(e){console.log(e)}},async previousPage(){const t=localStorage.getItem("go_farmmy_orderId")||"";""!==t||this.$router.push({name:"User-Order"})}},mounted(){this.$store.commit("changeCheckOutStep",3)},created(){const t=localStorage.getItem("go_farmmy_orderId")||"";this.checkOrderProccessingWord="資料核對中",this.checkOrderProccessing=!0,this.pay(t),this.getOrder(t)},computed:{...Object(f["b"])(["isAuthenticated","cart"])},beforeDestroy(){localStorage.removeItem("go_farmmy_orderId"),this.$store.commit("changeCheckOutStep",0)}},y=I,k=(s("4518"),Object(l["a"])(y,r,c,!1,null,"22c5af26",null));e["default"]=k.exports},a436:function(t,e,s){},c619:function(t,e,s){"use strict";s("2423")}}]);
//# sourceMappingURL=chunk-7f1cab86.51f1dd60.js.map