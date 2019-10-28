<template src="./teamOverview.html"></template>

<script>
export default {
  name: "linkMemberRegistered",
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
      startTime: dateNow(),
      endTime: dateNow(),
      level: 0,
      memberBetLog: [],
      detail: false
    };
  },
  methods: {
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
<style src="./teamOverview.css" scoped></style>