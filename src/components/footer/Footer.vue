
<template src="./Footer.html"></template>

<script>
export default {
  data() {
    return {
      footer: [
        {
          alias: "/recharge",
          name: "充值",
          src: require("@/assets/img/icon_recharge.png"),
          srcHeightLight: require("@/assets/img/icon_recharge_on.png")
        },
        {
          alias: "/user",
          name: "会员中心",
          src: require("@/assets/img/icon_user.png"),
          srcHeightLight: require("@/assets/img/icon_user_on.png")
        },
        {
          alias: "/index",
          name: "大厅",
          src: require("@/assets/img/icon_index.png"),
          srcHeightLight: require("@/assets/img/icon_index_on.png")
        },
        {
          alias: "/promo",
          name: "优惠",
          src: require("@/assets/img/icon_promo.png"),
          srcHeightLight: require("@/assets/img/icon_promo_on.png")
        },
        {
          alias: "/service",
          name: "客服",
          src: require("@/assets/img/icon_service.png"),
          srcHeightLight: require("@/assets/img/icon_service_on.png")
        }
      ]
    };
  }
};
</script>

<style src="./Footer.css">
</style>


