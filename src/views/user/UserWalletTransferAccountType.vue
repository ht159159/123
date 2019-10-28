<template src="./UserWalletTransferAccountType.html"></template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      siteID: this.$global.siteID,
      accountType: [
        {
          title: "智充宝",
          content: "提示：依您设定的额度在你游戏时智慧充值",
          transType: 3
        },
        {
          title: "免转钱包",
          content: "提示：会在您进行游戏时自动将主帐户余额全 部转入该游戏",
          transType: 2
        },
        {
          title: "自订",
          content: "提示：进入游戏前，手动操作额度转换",
          transType: 1
        }
      ],
      accountTypeId: null,
      autoTransType: null,
      transType: null,
      autoTransAmt:0,
    };
  },
  created() {},
  mounted() {
    this.fristSelectior();
  },
  methods: {
    accountTypeSelector(i) {
      this.accountTypeId = i;
      this.transType = i;
      this.autoTransType = this.accountType[i].transType;
    },
    accountTypeSubmit() {
      //帳戶類型修改
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "UpdateMemberAutoTrans",
        {
          siteID: this.siteID,
          loginID: loginID,
          token: Authorization,
          autoTransAmt: _this.autoTransAmt,
          autoTransType: _this.autoTransType
        },
        resp => {
          let res = JSON.parse(resp.data);
          let list = res.data;
          if (res.error._error) {
            alert(res.error._error);
          } else {
            alert("修改成功");
          }
        }
      );
    },
    fristSelectior() {
      //取得会员资讯
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "getuserinfo",
        {
          jsonString: {
            siteID: this.siteID,
            loginID: loginID
          },
          token: Authorization
        },
        resp => {
          let res = JSON.parse(resp.data);
          let list = res.data;
          let info = res.info;
          // _this.wallentListBalance = [];
          _this.userinfo = res;
          _this.autoTransType = info.autoTransType;
          _this.autoTransAmt = info.autoTransAmt;
          switch (info.autoTransType) {
            case 1:
              _this.transType = 2;
              break;
            case 2:
              _this.transType = 1;
              break;

            default:
              _this.transType = 0;
              break;
          }
        }
      );
    }
  }
};
</script>

<style src="./UserWalletTransferAccountType.css" scoped></style>