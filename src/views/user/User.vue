<template src="./User.html"></template>

<script>
import { _getstatus,logout } from "@/assets/src/forgame"
export default {
  name: "user",
  data() {
    return {
      userOptions: [
        {
          optionFont: "充值",
          src:require("@/assets/img/icon_user_recharge.png"),
          href:"/recharge",
          name:"rechargeIconBg",
        },
        {
          optionFont: "提现",
          src:require("@/assets/img/icon_user_withdraw.png"),
          href:"/user/withdraw",
          name:"withdrawIconBg",
        },{
          optionFont: "额度转换",
          src:require("@/assets/img/icon_user_transfer.png"),
          href:"/user/UserWalletTransfer",
          name:"transferIconBg",
        },{
          optionFont: "帐务中心",
          src:require("@/assets/img/icon_user_record.png"),
          href:"/accountingCenter",
           name:"recordIconBg",
        },
        // {
        //   optionFont: "充提记录",
        //   src:require("@/assets/img/icon_user_record.png"),
        //   href:"/user/record",
        // },
        // {
        //   optionFont: "银行卡管理",
        //   src:require("@/assets/img/icon_user_card.png"),
        //   href:"/user/bindingBankCard",
        // },
        {
          optionFont: "修改密码",
          src:require("@/assets/img/icon_user_password.png"),
          href:"/user/changePassword",
           name:"passwordIconBg",
        },
        {
          optionFont: "提款密码",
          src:require("@/assets/img/icon_user_withdrawPassword.png"),
          href:"/user/changeWithdrawPassword",
          name:"withdrawPasswordIconBg",
        },
        {

          optionFont: "个人投注",
          src:require("@/assets/img/icon_user_betting.png"),
          href:"/user/betRecord",
          name:"bettingIconBg",
        },{
          optionFont: "代理中心",
          src:require("@/assets/img/icon_user_proxy.png"),
          href:"/proxyCenter",
          name:"proxyIconBg",
        }
      ]
    };
  },
  methods:{
    logout(){
       logout(this)
    }
  }
};
</script>

<style src="./User.css">
</style>
