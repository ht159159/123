<template src="./betReport.html"></template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      siteID: this.$global.siteID,
      timeSelector: [
        { time: "昨天", dayValue: "-1" },
        { time: "今日", dayValue: "1" },
        { time: "上周", dayValue: "-7" },
        { time: "本周", dayValue: "7" },
        { time: "上月", dayValue: "-30" },
        { time: "本月", dayValue: "30" }
      ],
      // platformList: this.$store.state.datalist,
      platform: "",
      platformSelector: "",
      level: 0,
      gameID: null,
      startTime: dateNow(),
      endTime: dateNow(),
      memberBetLog: [],
      memberBetLogInfo: [],
      betECountTotal: null,
      betAmtTotal: null,
      betEAmtTotal: null,
      rtnAmtTotal: null,
      //詳細內容
      detail: false,
      detailList: [
        { name: "注单编号", content: null },
        { name: "下注时间", content: null },
        { name: "平台", content: null },
        { name: "期号", content: null },
        { name: "玩法", content: null },
        { name: "下注内容", content: null },
        { name: "下注金额", content: null },
        { name: "中奖赔率", content: null },
        { name: "中奖注数", content: null },
        { name: "单注点数", content: null },
        { name: "状态", content: null },
        { name: "输赢金额", content: null }
      ],
      betContentData: [
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" }
      ],
      detailDataPage: null
    };
  },
  created() {
    // 1. 呼叫 api action
    this.$store.dispatch("actionAJAXexample");
  },
  computed: mapGetters([
    // 6. 等待通知.. 調用 getter function 取得 state
    "getDataList"
  ]),
  mounted() {},
  methods: {
    platformSeach() {
      if (this.level == 3) {
        this.level = 2;
        return;
      }
      if (this.level < 0) {
        this.level = 0;
        return;
      }
      // if (this.level > 0) {
      //   console.log("123");
      //   this.platform = this.platformSelector;
      // }
      this.betAmtTotal = null;
      this.betEAmtTotal = null;
      this.betECountTotal = null;
      this.rtnAmtTotal = null;
      let rtnAmtTotalMath = null;
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "MemberBetLog",
        {
          siteID: this.siteID,
          gameID: this.gameID,
          token: Authorization,
          level: this.level,
          loginID: loginID,
          platform: this.level <= 0 ? this.platform : this.platformSelector,
          sDate: this.startTime,
          eDate: this.endTime
        },
        resp => {
          let res = JSON.parse(resp.data);
          this.memberBetLog = res.data;
          this.memberBetLogInfo = res.info;
          for (let i = 0; i < res.data.length; i++) {
            this.betAmtTotal += res.data[i].betAmt;
            this.betEAmtTotal += res.data[i].betEAmt;
            this.betECountTotal += res.data[i].betECount;
            this.rtnAmtTotal =
              Math.round((rtnAmtTotalMath += res.data[i].rslAmt * 100000)) /
              100000;
          }
        }
      );
    },

    quickdate(v) {
      switch (v) {
        case "1":
          this.startTime = dateNow();
          this.endTime = dateNow();
          break;
        case "-1":
          this.startTime = yesterdate();
          this.endTime = yesterdate();
          break;
        case "7":
          this.startTime = getWeekStartDate();
          this.endTime = getWeekEndDate();
          break;
        case "-7":
          this.startTime = getLastWeekStartDate();
          this.endTime = getLastWeekEndDate();
          break;
        case "30":
          this.startTime = getMonthStartDate();
          this.endTime = getMonthEndDate();
          break;
        case "-30":
          this.startTime = getLastMonthStartDate();
          this.endTime = getLastMonthEndDate();
          break;
      }
      this.platformSeach();
    },
    gameList() {},
    detailShow(i) {
      this.detailDataPage = i;
      // this.betContentData = [];
      this.betContentData = [
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" },
        { Pos: "", PosTitle: "" }
      ];
      this.detailList[5].content = null;
      this.detail = true;
      this.detailList[0].content = this.memberBetLog[i].betNo;
      this.detailList[1].content = this.memberBetLog[i].betTime;
      this.detailList[2].content = this.memberBetLog[i].spName;
      this.detailList[3].content = this.memberBetLog[i].betContent[0].IssueNo;
      this.detailList[4].content =
        this.memberBetLog[i].gameName +
        "-" +
        this.memberBetLog[i].betContent[0].PlayTypeS;

      // this.detailList[5].content = this.memberBetLog[i].betContent[0].Pos0
      //   ? this.memberBetLog[i].betContent[0].Pos0Title +
      //     " : " +
      //     this.memberBetLog[i].betContent[0].Pos0
      //   : null;

      if (this.memberBetLog[i].betContent[0].Pos0) {
        this.betContentData[0].Pos = "";
        this.betContentData[0].PosTitle = "";
        this.betContentData[0].Pos = this.memberBetLog[i].betContent[0].Pos0;
        this.betContentData[0].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos0Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos1) {
        this.betContentData[1].Pos = "";
        this.betContentData[1].PosTitle = "";
        this.betContentData[1].Pos = this.memberBetLog[i].betContent[0].Pos1;
        this.betContentData[1].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos1Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos2) {
        this.betContentData[2].Pos = "";
        this.betContentData[2].PosTitle = "";
        this.betContentData[2].Pos = this.memberBetLog[i].betContent[0].Pos2;
        this.betContentData[2].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos2Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos3) {
        this.betContentData[3].Pos = "";
        this.betContentData[3].PosTitle = "";
        this.betContentData[3].Pos = this.memberBetLog[i].betContent[0].Pos3;
        this.betContentData[3].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos3Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos4) {
        this.betContentData[4].Pos = "";
        this.betContentData[4].PosTitle = "";
        this.betContentData[4].Pos = this.memberBetLog[i].betContent[0].Pos4;
        this.betContentData[4].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos4Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos5) {
        this.betContentData[5].Pos = "";
        this.betContentData[5].PosTitle = "";
        this.betContentData[5].Pos = this.memberBetLog[i].betContent[0].Pos5;
        this.betContentData[5].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos5Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos6) {
        this.betContentData[6].Pos = "";
        this.betContentData[6].PosTitle = "";
        this.betContentData[6].Pos = this.memberBetLog[i].betContent[0].Pos6;
        this.betContentData[6].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos6Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos7) {
        this.betContentData[7].Pos = "";
        this.betContentData[7].PosTitle = "";
        this.betContentData[7].Pos = this.memberBetLog[i].betContent[0].Pos7;
        this.betContentData[7].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos7Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos8) {
        this.betContentData[8].Pos = "";
        this.betContentData[8].PosTitle = "";
        this.betContentData[8].Pos = this.memberBetLog[i].betContent[0].Pos8;
        this.betContentData[8].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos8Title;
      }
      if (this.memberBetLog[i].betContent[0].Pos9) {
        this.betContentData[9].Pos = "";
        this.betContentData[9].PosTitle = "";
        this.betContentData[9].Pos = this.memberBetLog[i].betContent[0].Pos9;
        this.betContentData[9].PosTitle = this.memberBetLog[
          i
        ].betContent[0].Pos9Title;
      }

      this.detailList[6].content = this.memberBetLog[i].betEAmt;
      this.detailList[7].content = this.memberBetLog[i].betContent[0].RebatRate;
      this.detailList[8].content = this.memberBetLog[i].betContent[0].RebatAmt;
      this.detailList[9].content = this.memberBetLog[i].betContent[0].UnitPrice;
      this.detailList[10].content = this.memberBetLog[i].betContent[0].Status;
      this.detailList[11].content = this.memberBetLog[i].rslAmt;

      for (let i = 0; i < this.betContentData.length; i++) {
        if (this.betContentData[i].Pos != "") {
          return (this.detailList[5].content = "");
        }
      }
    },
    detailPagechange(p) {
      if (this.detailDataPage + p < 0 || this.detailDataPage + p > this.memberBetLog.length-1)return;
      let page = this.detailDataPage + p;
      this.detailShow(page);
    },
    test2() {
      this.detail = false;
    }
  }
};

function dateNow() {
  return new Date().yyyymmdd();
}

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("-");
};

var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getFullYear(); //当前年
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//获得某月的天数
function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}
function yesterdate() {
  return new Date(nowYear, nowMonth, nowDay - 1).yyyymmdd();
}
//获得本周的开始日期
function getWeekStartDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek).yyyymmdd();
}
//获得本周的结束日期
function getWeekEndDate() {
  return new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)).yyyymmdd();
}
//获得上周的开始日期
function getLastWeekStartDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7).yyyymmdd();
}
//获得上周的结束日期
function getLastWeekEndDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1).yyyymmdd();
}
//获得本月的开始日期
function getMonthStartDate() {
  return new Date(nowYear, nowMonth, 1).yyyymmdd();
}
//获得本月的结束日期
function getMonthEndDate() {
  return new Date(nowYear, nowMonth, getMonthDays(nowMonth)).yyyymmdd();
}
//获得上月开始时间
function getLastMonthStartDate() {
  return new Date(nowYear, nowMonth - 1, 1).yyyymmdd();
}
//获得上月结束时间
function getLastMonthEndDate() {
  return new Date(nowYear, nowMonth - 1, getMonthDays(lastMonth)).yyyymmdd();
}
</script>

<style src="./betReport.css" scoped></style>