
<template src="./teamManagement.html"></template>

<script>
export default {
  name: "teamManagement",
  data() {
    return {
      siteID: this.$global.siteID,
      loginID: this.$store.state.bet.loginID,
      navType: 0, //标题编号
      allData: [], //旗下所有会员资料
      agentData: [], //旗下代理会员
      memberData: [], //旗下代理会员
      nowMember: "", //当前会员
      superiorData: {
        suLoginID: 0,
        suID: -1,
        nowLoginID: 0
      }, //上级会员资料
      memberBaseData: {
        points: 0,
        statusName: 0,
        lastLoginTime: 0,
        editTime: 0,
        createTime: 0
      },
      bonusGroupData: [], ///奖金组资料////
      gameAdjustmentVal: 1700,
      startX: 0,
      moveX: 0,
      endX: 0
    };
  },
  created() {
    this.downMember();
  },
  mounted() {
    this.bonusGroup();
  },
  methods: {
    clickNavType: function(num) {
      this.navType = num;
    },
    ////////產生旗下會員資料/////////////////
    downMember(parm) {
      let t = this;
      let allData = [];
      let agentData = [];
      let memberData = [];
      let _webs = JSON.parse(this.getCookie("webs"));
      let _parm;
      if (parm == undefined) {
        _parm = {
          jsonString: {
            siteID: this.siteID,
            loginID: this.loginID,
            suID: -1
          },
          token: _webs.Authorization
        };
      } else {
        _parm = parm;
      }

      this.$axios("T7SubordinateList", _parm, function(resp) {
        let json = JSON.parse(resp.data);
        let i;
        console.log(json);
        ///////////////////上級會員資料///////////////////////////
        t.superiorData.nowLoginID = json.data[0].loginID;
        t.superiorData.suLoginID = json.data[0].suLoginID;
        t.superiorData.suID = json.data[0].suID;
        //////////////////////////////////////////////////
        for (i = 0; i < json.data.length; i++) {
          let lastTime = json.data[i].lastLoginTime;
          if (lastTime) {
            lastTime = lastTime.slice(5);
          } else {
            lastTime = "未登入";
          }
          allData.push({
            loginID: json.data[i].loginID,
            points: json.data[i].points,
            statusName: json.data[i].statusName,
            lastLoginTime: lastTime,
            createTime: json.data[i].createTime,
            editTime: json.data[i].editTime,
            rCode: json.data[i].rCode,
            suID: json.data[i].suID,
            suLoginID: json.data[i].suLoginID,
            isMember: json.data[i].isMember,
            memberType: json.data[i].memberType,
            memberID: json.data[i].memberID
          });
          //代理
          if (json.data[i].memberType == 0) {
            memberData.push({
              loginID: json.data[i].loginID,
              points: json.data[i].points,
              statusName: json.data[i].statusName,
              lastLoginTime: lastTime,
              createTime: json.data[i].createTime,
              editTime: json.data[i].editTime,
              rCode: json.data[i].rCode,
              suID: json.data[i].suID,
              suLoginID: json.data[i].suLoginID,
              isMember: json.data[i].isMember,
              memberType: json.data[i].memberType,
              memberID: json.data[i].memberID
            });
          } else {
            agentData.push({
              loginID: json.data[i].loginID,
              points: json.data[i].points,
              statusName: json.data[i].statusName,
              lastLoginTime: lastTime,
              createTime: json.data[i].createTime,
              editTime: json.data[i].editTime,
              rCode: json.data[i].rCode,
              suID: json.data[i].suID,
              suLoginID: json.data[i].suLoginID,
              isMember: json.data[i].isMember,
              memberType: json.data[i].memberType,
              memberID: json.data[i].memberID
            });
          }
        }
        t.allData = allData;
        t.agentData = agentData;
        t.memberData = memberData;
        t.nowMember = allData[0].loginID;
        t.memberBaseData.points = allData[0].points;
        t.memberBaseData.statusName = allData[0].statusName;
        t.memberBaseData.createTime = allData[0].createTime;
        t.memberBaseData.editTime = allData[0].editTime;
        t.memberBaseData.lastLoginTime = allData[0].lastLoginTime;
      });
    },
    clickMember: function(suID, loginID) {
      let t = this;
      let _webs = JSON.parse(this.getCookie("webs"));
      let _parm = {
        jsonString: {
          siteID: t.siteID,
          loginID: t.loginID,
          suID: suID
        },
        token: _webs.Authorization
      };
      ////////////帶入資料產生畫面///////////////
      this.downMember(_parm);
    },
    backSuperior: function() {
      if (this.superiorData.suID != -1) {
        this.clickNavType(0);
        this.clickMember(this.superiorData.suID, this.superiorData.suLoginID);
      }
    },
    bonusGroup: function(parm) {
      let t = this;
      let _webs = JSON.parse(this.getCookie("webs"));
      let _parm;
      if (parm == undefined) {
        _parm = {
          jsonString: {
            siteID: this.siteID,
            loginID: this.loginID,
            suID: -1
          },
          token: _webs.Authorization
        };
      } else {
        _parm = parm;
      }
      this.$axios("T7RefundList", _parm, function(resp) {
        let json = JSON.parse(resp.data);
        let i;
        let bonusGroupData = [];
        console.log(json);
        let nowLoginID = t.allData[0].memberID;
        for (i = 0; i < json.data[nowLoginID].length; i++) {
          bonusGroupData.push({
            loginID: json.data[nowLoginID][i].loginID,
            memberID: json.data[nowLoginID][i].memberID,
            multiple: json.data[nowLoginID][i].multiple,
            multipleBase: json.data[nowLoginID][i].multipleBase,
            multipleGap: json.data[nowLoginID][i].multipleGap,
            multipleMax: json.data[nowLoginID][i].multipleMax,
            multipleMin: json.data[nowLoginID][i].multipleMin,
            spName: json.data[nowLoginID][i].spName
          });
        }
        t.bonusGroupData = bonusGroupData;
      });
    },
    tapstart: function(event) {
      this.startX = this.gameAdjustmentVal;
      // console.log("tap:" + this.startX);
      let max = 2000
      let min = 1700
      let maxRange = max-min
      let nowSite = this.gameAdjustmentVal - min
      let nowSiteP = (1-(maxRange-nowSite)/maxRange)*100;
      // console.log(document.getElementById("js-zipper").style);
      // document.getElementById("js-zipper").style.background = "linear-gradient(left, #80c269 "+nowSiteP+"%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)"
      // ({
      //    background:"linear-gradient(left, #80c269 "+nowSiteP+"%, #80c269 0%, #c2c2c2 0%, #c2c2c2 100%)"
      // })
    },
    onPanend: function(event) {
      // this.endX = event.center.x;
      this.endX = this.gameAdjustmentVal;
      console.log("end:" + this.endX);
    }
  }
};
</script>
<style src="./teamManagement.css" scoped></style>