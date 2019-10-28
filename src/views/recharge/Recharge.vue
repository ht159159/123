<template src="./Recharge.html"></template>


<script>
export default {
  name: "recharge",
  data() {
    return {
      siteID: this.$global.siteID,
      recharge: [],
      bankCardOpenClose: false,
      needFill: false,
      banklist: []
    };
  },
  methods: {
    test(v) {
      let t = this;
      let _web = JSON.parse(this.getCookie("webs"));
      if (v.tppType == -1) {
        var parm = {
          siteID: this.siteID,
          loginID: _web.loginID,
          token:  _web.Authorization
        };
        this.$axios("GetMemberDepositBankList", parm, function(resp) {
          let res = JSON.parse(resp.data);
          var list = res.data;
          t.$router.push({
                path: "/recharge/transfer",
                query: {
                  tppName: v.rechargeName,
                  tppType: v.tppType,
                  banklist: JSON.stringify(list)
                }
              });
        });
      } else {        
        this.$axios(
          "MemberThirdDepositList",
          {
            siteID: this.siteID,
            loginID:  _web.loginID,
            tppType: v.tppType,
            token: _web.Authorization
          },
          function(resp) {
            var res = JSON.parse(resp.data);
            var list = res.data;
            if (list != "") {
              t.$router.push({
                path: "/recharge/transfer",
                query: {
                  tppName: v.rechargeName,
                  tppType: v.tppType,
                  banklist: JSON.stringify(list)
                }
              });
            } else {
              alert("支付項目未设置银行卡");
            }
          }
        );
      }
    }
  },
  mounted() {
    let _this = this;
    let _web = JSON.parse(this.getCookie("webs"));
    let loginID = _web.loginID;
    let Authorization = _web.Authorization;
    this.$axios(
      "MemberThirdDepositType",
      { siteID: this.siteID, loginID: loginID, token: Authorization },
      function(resp) {
        var res = JSON.parse(resp.data);
        var list = res.data;
        if (list.length == 0) {
          alert("后台未设置第三方支付，请联系客服");
          _this.$router.push({ path: "/user" });
        } else {
          let webbank = [
            {
              src: require("@/assets/img/recharge_img01.png"),
              rechargeName: "网银支付",
              tppType: -1
            }
          ];
          let tpplist = list.map(v => {
            return {
              src: require("@/assets/img/recharge_img" + v.tppType + ".png"),
              rechargeName: v.typeName,
              tppType: v.tppType
            };
          });

          _this.recharge = [...tpplist, ...webbank];
        }
      }
    );
  }
};
</script>
<style src="./Recharge.css" >
</style>
