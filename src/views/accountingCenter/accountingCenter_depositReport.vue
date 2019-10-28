<template src="./accountingCenter_depositReport.html"></template>

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
      platform: -1,
      firstPlatform: -1,
      platformSelector: "",
      startTime: dateNow(),
      endTime: dateNow(),
      memberTransactionLog: [],
      memberTransactionLogInfo: [],
      transType: [
        { typeName: "存款", transType: 1 },
        { typeName: "提款", transType: 2 }
      ],
      //交易明細
      withdrawalDetailShow: false,
      withdrawalSelector: 0
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
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      let loginID = _web.loginID;
      let Authorization = _web.Authorization;
      this.$axios(
        "memberTransactionLog",
        {
          siteID: this.siteID,
          token: Authorization,
          loginID: loginID,
          sDate: this.startTime,
          eDate: this.endTime,
          status: -1,
          transType: this.platform
        },
        resp => {
          let res = JSON.parse(resp.data);
          console.log(res);
          this.memberTransactionLog = res.data;
          this.memberTransactionLogInfo = res.info;
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
    withdrawalDetail(i) {
      console.log(this.memberTransactionLog);
      this.withdrawalDetailShow = true;
      this.withdrawalSelector = i;
    },
    withdrawalDetailClose() {
      event.stopPropagation();
      console.log("close");
      this.withdrawalDetailShow = false;
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

<style src="./accountingCenter_depositReport.css" scope></style>