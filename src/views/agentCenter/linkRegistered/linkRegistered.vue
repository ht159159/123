<template src="./linkRegistered.html"></template>
<script>
export default {
  name: "linkRegistered",
  data() {
    return {
      siteID: this.$global.siteID,
      loginID: this.$store.state.bet.loginID,
      memberID: null,
      userinfo: null,
      memberType: null,
      memberStaus: false,
      memberStausName: null,
      childrenMemberData: {
        siteID: this.$global.siteID,
        loginID: this.$store.state.bet.loginID,
        memberType: 0,
        childLoginID: null,
        childLoginPW: null,
        confirmChildPW: null
      },
      bonusGroupData: [], ///奖金组资料////
      bonustopMin: 0,
      bonustopMax: 0,
      topMultiple: 0,
      bonusStatus: true, //////奖金组是否可调整状态，反水共用////
      bonusWrapShow: true, /////奖金组调整区块显示////////////////
      bonusExtremeStatus: false, /////獎金組最高最低狀態/////////
      waterGroupData: [], /////反水资料/////
      watertopMin: 0,
      watertopMax: 0,
      watertopMultiple: 0,
      waterStatus: true, //////反水是否可调整状态////
      waterWrapShow: true, /////反水调整区块显示////////////////
      waterExtremeStatus: false, /////反水最高最低狀態/////////
      enterBonusGroupData: [],
      enterWaterGroupData: []
    };
  },
  mounted() {
    this.getuserinfo();
    this.waterBonusGroup();
  },
  computed: {
    openlist() {
      var memberType = this.memberType;
      this.memberStausName = "会员";
      if (memberType == 1) {
        return [{ id: 0, name: "会员" }];
      } else
        return [
          { id: 0, name: "会员" },
          { id: 1, name: "一级代理" },
          { id: 2, name: "二级代理" }
        ];
    }
  },
  methods: {
    getuserinfo() {
      let t = this;
      let _webs = JSON.parse(this.getCookie("webs"));
      var parm = {
        jsonString: {
          siteID: t.siteID,
          loginID: t.loginID
        },
        token: _webs.Authorization
      };
      this.$axios("getuserinfo", parm, function(resp) {
        var json = JSON.parse(resp.data);
        t.userinfo = json;
        console.log(json);
        t.memberType = json.info.memberType;
        t.memberID = json.info.memberID;
      });
    },
    selectMembertype(event, Index) {
      this.memberStaus = !this.memberStaus;
      if (Index == 0) {
        this.memberStausName = "会员";
      }
      if (Index == 1) {
        this.memberStausName = "一级代理";
      }
      if (Index == 2) {
        this.memberStausName = "二级代理";
      }
      this.childrenMemberData.memberType = Index;
    },
    tapstart: function(event, Index) {
      let gameAdjustmentVal = this.bonusGroupData[Index].multiple;
      let max = this.bonusGroupData[Index].multipleMax;
      let min = this.bonusGroupData[Index].multipleMin;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      document.querySelectorAll(".zipper")[Index + 1].style.background =
        "-webkit-linear-gradient(left, #80c269 " +
        nowSiteP +
        "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
    },
    waterTapstart: function(event, Index) {
      let gameAdjustmentVal = this.waterGroupData[Index].rebatRate;
      let max = this.waterGroupData[Index].rebatRateMax * 100;
      let min = this.waterGroupData[Index].rebatRateMin * 100;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      document.querySelectorAll(".waterZipper")[Index + 1].style.background =
        "-webkit-linear-gradient(left, #80c269 " +
        nowSiteP +
        "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
    },
    /////////判断极端直/////////////////
    judgingExtreme: function() {
      let t = this;
      let i;
      let bonusGroupData = t.bonusGroupData;
      let min = 10000,
        max = 0;
      for (i = 0; i < bonusGroupData.length; i++) {
        if (min > bonusGroupData[i].multipleMin) {
          min = bonusGroupData[i].multipleMin;
        }
        if (max < bonusGroupData[i].multipleMax) {
          max = bonusGroupData[i].multipleMax;
        }
      }
      this.bonustopMin = min;
      this.bonustopMax = max;
      this.topMultiple = min;
    },
    waterjudgingExtreme: function() {
      let t = this;
      let i;
      let waterGroupData = t.waterGroupData;
      let min = 10000,
        max = 0;
      for (i = 0; i < waterGroupData.length; i++) {
        if (min > waterGroupData[i].rebatRateMin) {
          min = waterGroupData[i].rebatRateMin;
        }
        if (max < waterGroupData[i].rebatRateMax) {
          max = waterGroupData[i].rebatRateMax;
        }
      }
      this.watertopMin = min;
      this.watertopMax = max;
      this.watertopMultiple = min;
    },
    /////////////最上層點擊移動所有////////////////////
    toptapstart: function() {
      let t = this;
      let gameAdjustmentVal = t.topMultiple;
      let max = t.bonustopMax;
      let min = t.bonustopMin;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      let allBar = document.querySelectorAll(".zipper");
      let i;
      for (i = 0; i < allBar.length; i++) {
        if (i == 0) {
          allBar[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        } else {
          if (gameAdjustmentVal <= this.bonusGroupData[i - 1].multipleMin) {
            this.bonusGroupData[i - 1].multiple = this.bonusGroupData[
              i - 1
            ].multipleMin;
          } else if (
            gameAdjustmentVal >= this.bonusGroupData[i - 1].multipleMax
          ) {
            this.bonusGroupData[i - 1].multiple = this.bonusGroupData[
              i - 1
            ].multipleMax;
          } else {
            this.bonusGroupData[i - 1].multiple = gameAdjustmentVal;
          }
          let max = this.bonusGroupData[i - 1].multipleMax;
          let min = this.bonusGroupData[i - 1].multipleMin;
          let maxRange = max - min;
          let nowSite = gameAdjustmentVal - min;
          let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
          document.querySelectorAll(".zipper")[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
      }
    },
    waterToptapstart: function() {
      let t = this;
      let gameAdjustmentVal = t.watertopMultiple;
      let max = t.watertopMax * 100;
      let min = t.watertopMin * 100;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      let allBar = document.querySelectorAll(".waterZipper");
      let i;
      gameAdjustmentVal = gameAdjustmentVal / 100;
      for (i = 0; i < allBar.length; i++) {
        if (i == 0) {
          allBar[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        } else {
          if (gameAdjustmentVal <= this.waterGroupData[i - 1].rebatRateMin) {
            this.waterGroupData[i - 1].rebatRate =
              this.waterGroupData[i - 1].rebatRateMin * 100;
          } else if (
            gameAdjustmentVal >= this.waterGroupData[i - 1].rebatRateMax
          ) {
            this.waterGroupData[i - 1].rebatRate =
              this.waterGroupData[i - 1].rebatRateMax * 100;
          } else {
            this.waterGroupData[i - 1].rebatRate = gameAdjustmentVal * 100;
          }
          let max = this.waterGroupData[i - 1].rebatRateMax;
          let min = this.waterGroupData[i - 1].rebatRateMin;
          let maxRange = max - min;
          let nowSite = gameAdjustmentVal - min;
          let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
          document.querySelectorAll(".waterZipper")[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
      }
    },
    changeBonusExtreme: function(event) {
      let t = this;
      let bonusGroupData = t.bonusGroupData;
      let i;

      if (t.bonusExtremeStatus == false) {
        for (i = 0; i < bonusGroupData.length; i++) {
          t.bonusGroupData[i].multiple = t.bonusGroupData[i].multipleMax;
          document.querySelectorAll(".zipper")[i + 1].style.background =
            "-webkit-linear-gradient(left, #80c269 100%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
        t.bonusExtremeStatus = true;
      } else {
        for (i = 0; i < bonusGroupData.length; i++) {
          t.bonusGroupData[i].multiple = t.bonusGroupData[i].multipleMin;
          document.querySelectorAll(".zipper")[i + 1].style.background =
            "-webkit-linear-gradient(left, #80c269 0%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
        t.bonusExtremeStatus = false;
      }
    },
    changeWaterExtreme: function(event) {
      let t = this;
      let waterGroupData = t.waterGroupData;
      let i;

      if (t.waterExtremeStatus == false) {
        for (i = 0; i < waterGroupData.length; i++) {
          t.waterGroupData[i].rebatRate =
            t.waterGroupData[i].rebatRateMax * 100;
          document.querySelectorAll(".waterZipper")[i + 1].style.background =
            "-webkit-linear-gradient(left, #80c269 100%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
        t.waterExtremeStatus = true;
      } else {
        for (i = 0; i < waterGroupData.length; i++) {
          t.waterGroupData[i].rebatRate = t.waterGroupData[i].rebatRateMin;
          document.querySelectorAll(".waterZipper")[i + 1].style.background =
            "-webkit-linear-gradient(left, #80c269 0%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
        t.waterExtremeStatus = false;
      }
    },
    /////////////////獎金組反水設定//////////////
    waterBonusGroup: function(parm) {
      let t = this;
      let _webs = JSON.parse(this.getCookie("webs"));
      let _parm;
      _parm = {
        jsonString: {
          siteID: this.siteID,
          loginID: this.loginID
        },
        token: _webs.Authorization
      };
      this.$axios("T7ChildSettings", _parm, function(resp) {
        let json = JSON.parse(resp.data);
        let i;
        console.log(json);
        let nowLoginID = t.memberID;
        let bonusGroupData = [];
        let waterGroupData = [];
        let refundInfos = json.data.refundInfos;
        let profitInfos = json.data.profitInfos;
        for (i = 0; i < refundInfos.length; i++) {
          bonusGroupData.push({
            multiple: refundInfos[i].multiple,
            multipleBase: refundInfos[i].multipleBase,
            multipleGap: refundInfos[i].multipleGap,
            multipleMax: refundInfos[i].multipleMax,
            multipleMin: refundInfos[i].multipleMin,
            spName: refundInfos[i].spName,
            spID: refundInfos[i].spID
          });
        }
        t.bonusGroupData = bonusGroupData;
        t.judgingExtreme();
        for (i = 0; i < profitInfos.length; i++) {
          waterGroupData.push({
            rebatRate: profitInfos[i].rebatRate,
            // rebatRateEdit: profitInfos[i].rebatRateEdit * 100,
            rebatRateMax: profitInfos[i].rebatRateMax,
            rebatRateMin: profitInfos[i].rebatRateMin,
            spName: profitInfos[i].spName,
            spID: profitInfos[i].spID
          });
        }
        t.waterGroupData = waterGroupData;
        t.waterjudgingExtreme();
      });
    },
    ///////创建帐号///////
    createUrl: function() {
      let i;
      let enterBonusGroupData = [];
      let enterWaterGroupData = [];
      for (i = 0; i < this.bonusGroupData.length; i++) {
        enterBonusGroupData.push({
          spID: this.bonusGroupData[i].spID,
          multiple: this.bonusGroupData[i].multiple
        });
      }
      this.enterBonusGroupData = enterBonusGroupData;
      for (i = 0; i < this.waterGroupData.length; i++) {
        enterWaterGroupData.push({
          spID: this.waterGroupData[i].spID,
          rebatRateEdit: this.waterGroupData[i].rebatRate / 100
        });
      }
      this.enterWaterGroupData = enterWaterGroupData;
      if (this.childrenMemberData.childLoginID == "" || this.childrenMemberData.childLoginID == null) {
        // errorToast("请输入名称");
        return;
      }

      let t = this;
      let _webs = JSON.parse(this.getCookie("webs"));
      var parm = {
        jsonString:{
        siteID: this.siteID,
        loginID: this.loginID,
        name: this.childrenMemberData.childLoginID,
        memberType: this.childrenMemberData.memberType,
        refundInfo: this.enterBonusGroupData,
        profitInfo: this.enterWaterGroupData,
        },
        token: _webs.Authorization
      };
      this.$axios("T7CreateUrl", parm, function(resp) {
        var json = JSON.parse(resp.data);
        if (json.error._error) {
          alert(json.error._error);
        } else {
          alert("开设成功");
        }
      });
    },
    //////////////獎金組加號減號功能//////////////////////
    addMultiple: function(Index) {
      this.bonusGroupData[Index].multiple =
        parseInt(this.bonusGroupData[Index].multiple) + 1;
      let gameAdjustmentVal = this.bonusGroupData[Index].multiple;
      let max = this.bonusGroupData[Index].multipleMax;
      let min = this.bonusGroupData[Index].multipleMin;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      document.querySelectorAll(".zipper")[Index + 1].style.background =
        "-webkit-linear-gradient(left, #80c269 " +
        nowSiteP +
        "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
    },
    lessMultiple: function(Index) {
      this.bonusGroupData[Index].multiple =
        parseInt(this.bonusGroupData[Index].multiple) - 1;
      let gameAdjustmentVal = this.bonusGroupData[Index].multiple;
      let max = this.bonusGroupData[Index].multipleMax;
      let min = this.bonusGroupData[Index].multipleMin;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      document.querySelectorAll(".zipper")[Index + 1].style.background =
        "-webkit-linear-gradient(left, #80c269 " +
        nowSiteP +
        "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
    },
    addToptapstart: function() {
      let t = this;
      t.topMultiple = parseInt(t.topMultiple) + 1;
      let gameAdjustmentVal = t.topMultiple;
      let max = t.bonustopMax;
      let min = t.bonustopMin;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      let allBar = document.querySelectorAll(".zipper");
      let i;
      for (i = 0; i < allBar.length; i++) {
        if (i == 0) {
          allBar[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        } else {
          if (gameAdjustmentVal <= this.bonusGroupData[i - 1].multipleMin) {
            this.bonusGroupData[i - 1].multiple = this.bonusGroupData[
              i - 1
            ].multipleMin;
          } else if (
            gameAdjustmentVal >= this.bonusGroupData[i - 1].multipleMax
          ) {
            this.bonusGroupData[i - 1].multiple = this.bonusGroupData[
              i - 1
            ].multipleMax;
          } else {
            this.bonusGroupData[i - 1].multiple = gameAdjustmentVal;
          }
          let max = this.bonusGroupData[i - 1].multipleMax;
          let min = this.bonusGroupData[i - 1].multipleMin;
          let maxRange = max - min;
          let nowSite = gameAdjustmentVal - min;
          let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
          document.querySelectorAll(".zipper")[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
      }
    },
    lessToptapstart: function() {
      let t = this;
      t.topMultiple = parseInt(t.topMultiple) + -1;
      let gameAdjustmentVal = t.topMultiple;
      let max = t.bonustopMax;
      let min = t.bonustopMin;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      let allBar = document.querySelectorAll(".zipper");
      let i;
      for (i = 0; i < allBar.length; i++) {
        if (i == 0) {
          allBar[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        } else {
          if (gameAdjustmentVal <= this.bonusGroupData[i - 1].multipleMin) {
            this.bonusGroupData[i - 1].multiple = this.bonusGroupData[
              i - 1
            ].multipleMin;
          } else if (
            gameAdjustmentVal >= this.bonusGroupData[i - 1].multipleMax
          ) {
            this.bonusGroupData[i - 1].multiple = this.bonusGroupData[
              i - 1
            ].multipleMax;
          } else {
            this.bonusGroupData[i - 1].multiple = gameAdjustmentVal;
          }
          let max = this.bonusGroupData[i - 1].multipleMax;
          let min = this.bonusGroupData[i - 1].multipleMin;
          let maxRange = max - min;
          let nowSite = gameAdjustmentVal - min;
          let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
          document.querySelectorAll(".zipper")[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
      }
    },
    //////////////反水加號減號功能//////////////////
    addRebatRateEdit: function(Index) {
      this.waterGroupData[Index].rebatRate =
        parseInt(this.waterGroupData[Index].rebatRate) + 1;
      let gameAdjustmentVal = this.waterGroupData[Index].rebatRate;
      let max = this.waterGroupData[Index].rebatRateMax * 100;
      let min = this.waterGroupData[Index].rebatRateMin * 100;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      document.querySelectorAll(".waterZipper")[Index + 1].style.background =
        "-webkit-linear-gradient(left, #80c269 " +
        nowSiteP +
        "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
    },
    lessRebatRateEdit: function(Index) {
      this.waterGroupData[Index].rebatRate =
        parseInt(this.waterGroupData[Index].rebatRate) - 1;
      let gameAdjustmentVal = this.waterGroupData[Index].rebatRate;
      let max = this.waterGroupData[Index].rebatRateMax * 100;
      let min = this.waterGroupData[Index].rebatRateMin * 100;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      document.querySelectorAll(".waterZipper")[Index + 1].style.background =
        "-webkit-linear-gradient(left, #80c269 " +
        nowSiteP +
        "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
    },
    addWaterToptapstart: function() {
      let t = this;
      t.watertopMultiple = parseInt(t.watertopMultiple) + 1;
      let gameAdjustmentVal = t.watertopMultiple;
      let max = t.watertopMax * 100;
      let min = t.watertopMin * 100;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      let allBar = document.querySelectorAll(".waterZipper");
      let i;
      gameAdjustmentVal = gameAdjustmentVal / 100;
      for (i = 0; i < allBar.length; i++) {
        if (i == 0) {
          allBar[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        } else {
          if (gameAdjustmentVal <= this.waterGroupData[i - 1].rebatRateMin) {
            this.waterGroupData[i - 1].rebatRate =
              this.waterGroupData[i - 1].rebatRateMin * 100;
          } else if (
            gameAdjustmentVal >= this.waterGroupData[i - 1].rebatRateMax
          ) {
            this.waterGroupData[i - 1].rebatRate =
              this.waterGroupData[i - 1].rebatRateMax * 100;
          } else {
            this.waterGroupData[i - 1].rebatRate = gameAdjustmentVal * 100;
          }
          let max = this.waterGroupData[i - 1].rebatRateMax;
          let min = this.waterGroupData[i - 1].rebatRateMin;
          let maxRange = max - min;
          let nowSite = gameAdjustmentVal - min;
          let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
          document.querySelectorAll(".waterZipper")[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
      }
    },
    lessWaterToptapstart: function() {
      let t = this;
      t.watertopMultiple = parseInt(t.watertopMultiple) - 1;
      let gameAdjustmentVal = t.watertopMultiple;
      let max = t.watertopMax * 100;
      let min = t.watertopMin * 100;
      let maxRange = max - min;
      let nowSite = gameAdjustmentVal - min;
      let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
      let allBar = document.querySelectorAll(".waterZipper");
      let i;
      gameAdjustmentVal = gameAdjustmentVal / 100;
      for (i = 0; i < allBar.length; i++) {
        if (i == 0) {
          allBar[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        } else {
          if (gameAdjustmentVal <= this.waterGroupData[i - 1].rebatRateMin) {
            this.waterGroupData[i - 1].rebatRate =
              this.waterGroupData[i - 1].rebatRateMin * 100;
          } else if (
            gameAdjustmentVal >= this.waterGroupData[i - 1].rebatRateMax
          ) {
            this.waterGroupData[i - 1].rebatRate =
              this.waterGroupData[i - 1].rebatRateMax * 100;
          } else {
            this.waterGroupData[i - 1].rebatRate = gameAdjustmentVal * 100;
          }
          let max = this.waterGroupData[i - 1].rebatRateMax;
          let min = this.waterGroupData[i - 1].rebatRateMin;
          let maxRange = max - min;
          let nowSite = gameAdjustmentVal - min;
          let nowSiteP = (1 - (maxRange - nowSite) / maxRange) * 100;
          document.querySelectorAll(".waterZipper")[i].style.background =
            "-webkit-linear-gradient(left, #80c269 " +
            nowSiteP +
            "%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)";
        }
      }
    }
  }
};
</script>
<style src="./linkRegistered.css" scoped></style>