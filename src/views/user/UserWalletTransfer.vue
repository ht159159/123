<template src="./UserWalletTransfer.html"></template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      siteID: this.$global.siteID,
      mainbalance: null,
      wallentList: [],
      // wallentListBalance: [],
      userinfo: null,
      showtransfer: false,
      accountTypeSelector: null,
      //转入 转出
      transferAmount: null,
      picked: null,
      outid: null,
      inid: null,
      outspName: null,
      outpoints: null,
      inspName: null,
      inpoints: null,
      //转账类型
      transferTypeName: null,
      transferType: null,
      showType: false,
      autoTransAmt: 0,
      //金錢選擇
      selectorMoney: [
        { point: 100 },
        { point: 500 },
        { point: 1000 },
        { point: 5000 },
        { point: 9999 }
      ]
    };
  },
  mounted() {
    let _this = this;
    _this.getuserinfo();
  },
  methods: {
    getWalletList() {
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      // _this.balance = _web.balance;
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "getwalletlist",
        {
          siteID: this.siteID,
          loginID: loginID,
          token: Authorization
        },
        resp => {
          let res = JSON.parse(resp.data);
          let list = res.data;

          _this.wallentList = res.data.filter(function(i) {
            let f = _this.userinfo.data.find(function(e) {
              return i.spID == e.spid;
            });
            if (f != undefined) {
              i.points = f.points;
              if (i.spID == 0) {
                _this.mainbalance = f.points;
              }
              if (i.spID == 43) {
                i.src = require("@/assets/img/CQ92.png");
              }
              if (i.spID == 54) {
                i.src = require("@/assets/img/LEG.png");
              }
            }
            return !i.isOwn && i.spID != 0;
          });
        }
      );
    },
    //取得会员资讯
    getuserinfo() {
      let _this = this;
      _this.transferCancel();
      let _web = JSON.parse(this.getCookie("webs"));
      // _this.balance = _web.balance;
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
          let autoTransType = info.autoTransType;

          switch (autoTransType) {
            case 1:
              _this.accountTypeSelector = "自订";
              break;
            case 2:
              _this.accountTypeSelector = "免转钱包";
              break;
            default:
              _this.accountTypeSelector = "智充宝";
              break;
          }
          // for (let i = 0; i < list.length; i++) {
          //   if (list[i].spid != 0) {
          //     _this.wallentListBalance.push(list[i]);
          //   }
          // }
          _this.getWalletList();
        }
      );
    },

    transOut(v) {
      if (v.spStatus == 2) return;
      this.showtransfer = true;
      this.outid = v.spID;
      this.inid = 0;
    },
    transIn(v) {
      if (v.spStatus == 2) return;
      this.showtransfer = true;
      this.outid = 0;
      this.inid = v.spID;
    },
    transferCancel() {
      this.showtransfer = false;
      this.transferAmount = null;
      this.outid = null;
      this.inid = null;
    },
    //一键回收
    alltransferOutWallet() {
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "alltransferOutWallet",
        {
          siteID: this.siteID,
          loginID: loginID,
          token: Authorization
        },
        resp => {
          let res = JSON.parse(resp.data);
          let list = res.data;
          if (res.error._error) {
            // errorToast(res.error._error);
          } else if (res.message) {
            _this.getuserinfo();
          }
        }
      );
    },
    //转入转出
    transferWallet() {
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      // _this.balance = _web.balance;
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      if (this.outpoints < this.transferAmount || this.transferAmount < 1) {
        alert("账户余额不足");
        return;
      }
      this.$axios(
        "TransferWallet",
        {
          siteID: this.siteID,
          loginID: loginID,
          fromWalletID: this.outid,
          toWalletID: this.inid,
          amount: this.transferAmount,
          token: Authorization
        },
        resp => {
          let res = JSON.parse(resp.data);
          let list = res.data;
          if (res.message) {
            alert(res.message);
            _this.getuserinfo();
          }
        }
      );
    },
    //一鍵轉出
    transferOutOneWallet(v) {
      if (v.spStatus == 2) return;
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "TransferOutOneWallet",
        {
          siteID: this.siteID,
          loginID: loginID,
          walletID: v.spID,
          token: Authorization
        },
        resp => {
          let res = JSON.parse(resp.data);
          let list = res.data;
          if (res.error._error) {
            alert(res.error._error);
          } else if (res.message) {
            alert(res.message);
            _this.getuserinfo();
          }
        }
      );
    },
    //一鍵轉入
    allTransferInWallet(v) {
      if (v.spStatus == 2) return;
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "AllTransferInWallet",
        {
          siteID: this.siteID,
          loginID: loginID,
          walletID: v.spID,
          token: Authorization
        },
        resp => {
          let res = JSON.parse(resp.data);
          let list = res.data;
          if (res.error._error) {
            alert(res.error._error);
          } else if (res.message) {
            alert(res.message);
            _this.getuserinfo();
          }
        }
      );
    }
  },
  created() {
    // 1. 呼叫 api action
    this.$store.dispatch("actionAJAXexample");
  },
  computed: mapGetters({
    // 6. 等待通知.. 調用 getter function 取得 state
    datalist: "getDatalist"
  }),
  watch: {
    outid(nv, ov) {
      if (nv == null) {
        this.outspName = null;
        this.outpoints = null;
      } else if (nv == 0) {
        this.outspName = "主账户";
        this.outpoints = this.mainbalance;
      } else {
        let f = this.wallentList.find(e => {
          return e.spID == nv;
        });
        this.outspName = f.spName;
        this.outpoints = f.points;
      }
    },
    inid(nv, ov) {
      if (nv == null) {
        this.inspName = null;
        this.inpoints = null;
      } else if (nv == 0) {
        this.inspName = "主账户";
        this.inpoints = this.mainbalance;
      } else {
        let f = this.wallentList.find(function(e) {
          return e.spID == nv;
        });
        this.inspName = f.spName;
        this.inpoints = f.points;
      }
    },
    transferAmount(nv) {
      if (nv > this.outpoints) {
        this.transferAmount = this.outpoints;
      }
    }
  }
};
</script>

<style src="./UserWalletTransfer.css" scoped></style>