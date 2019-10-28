<template src="./ResultRecord.html"></template>

<script>
export default {
  name: "betRecored",
  components: {},
  data() {
    return {
      selected: "selected",
      menuSelected: 0,
      detailSwitch: "",
      gameArray: [],
      gameCodeDefault: "hk6",
      pos: null,
      dataShift: null,
      LotteryAnnouncement: [],
      GameResult: [],
      TrendList: [],
      TrendListMobile: [],
      coordinate: [],
      mask: 0,
      islow: false
    };
  },
  mounted: function() {
    let _this = this;
    this.$axios("AllGameStatus", { siteID: this.$global.siteID }, function(
      resp
    ) {
      let json = JSON.parse(resp.data);
      _this.gameArray = json.data.filter(function(v, i) {
        return v.gameStatus != 0;
      });
      _this.gameCodeDefault = _this.gameArray[0].gameCode;
      _this.gameCode();
    });
  },
  watch: {
    gameCodeDefault() {
      this.GameResult = [];
      this.TrendList = [];
      this.gameCode();
    },
    dataShift() {
      if (this.menuSelected == 0) {
        this.getLotteryAnnouncement();
      } else {
        this.getTrendListMobile();
      }
    },
    menuSelected() {
      let canvas = document.getElementById("canvas");
      if (canvas) {
        canvas.parentNode.removeChild(canvas);
      }
    },
    TrendListMobile() {
      let canvas = document.getElementById("canvas");
      if (canvas) {
        canvas.parentNode.removeChild(canvas);
      }
      this.drawTrendLine();
    }
  },
  computed: {
    cssStyle() {
      return word => {
        if (this.gameCodeDefault == "hk6" && this.menuSelected != 0) {
          return word + "Right2";
        } else if (this.gameCodeDefault == "bjpk10" && this.menuSelected != 0) {
          return word + "Right3";
        } else {
          return word + "Right3";
        }
      };
    }
  },
  methods: {
    TrendListFunc(item, num) {
      if (num == 0 && this.gameCodeDefault == "hk6") {
        return item.Pos0;
      } else if (num == 1 && this.gameCodeDefault == "hk6") {
        return item.Pos1;
      } else {
        return item.Pos;
      }
    },
    gameCode: function() {
      switch (this.gameCodeDefault) {
        case "hk6":
        case "fc3d":
        case "pl3":
        case "shssl":
        case "qxc":
          this.dataShift = 20;
          this.islow = true;
          this.getGameResult();
          this.getTrendListScheme();

          break;

        default:
          this.dataShift = 0;
          this.islow = false;
          this.getLotteryAnnouncement();
          this.getTrendListScheme();
          break;
      }
    },
    getLotteryAnnouncement() {
      this.mask = 1;
      let _this = this;
      this.$axios(
        "LotteryAnnouncement",
        {
          siteID: this.$global.siteID,
          gameCode: this.gameCodeDefault,
          dataShift: this.dataShift
        },
        function(resp) {
          let json = JSON.parse(resp.data);
          _this.GameResult = json.data.reverse();
          _this.mask = 0;
        }
      );
    },
    getGameResult() {
      this.mask = 1;
      let _this = this;
      this.$axios(
        "GameResult",
        {
          siteID: this.$global.siteID,
          gameCode: this.gameCodeDefault
        },
        function(resp) {
          let json = JSON.parse(resp.data);
          _this.GameResult = json.data;
          _this.mask = 0;
        }
      );
    },
    getTrendListScheme() {
      let _this = this;
      this.$axios(
        "TrendListScheme",
        {
          siteID: this.$global.siteID,
          gameCode: this.gameCodeDefault
        },
        function(resp) {
          let json = JSON.parse(resp.data);
          _this.TrendList = json.data;
        }
      );
    },
    getTrendListMobile() {
      this.mask = 1;
      let _this = this;
      this.$axios(
        "TrendListMobile",
        {
          siteID: this.$global.siteID,
          gameCode: this.gameCodeDefault,
          pos: this.pos,
          dataShift: 100
        },
        function(resp) {
          let json = JSON.parse(resp.data);
          json.data.body.reverse();
          _this.TrendListMobile = json.data;
          _this.mask = 0;
        }
      );
    },
    gameRsl(rsl) {
      let result = [];
      if (this.gameCodeDefault == "qxc") {
        result = rsl.substr(0, 7).split(",");
      } else if (this.gameCodeDefault == "hk6") {
        //六合彩开奖有 +
        result = rsl.split(",");
        result.splice(6, 0, "+");
      } else if (this.gameCodeDefault == "bjkl8") {
        result = rsl.split(",");
        result.splice(1, 0, "+");
        result.splice(3, 0, "+");
        result.splice(5, 0, "=");
      } else {
        result = rsl.split(",");
      }
      return result;
    },
    resultcss(number) {
      if (this.gameCodeDefault == "hk6") {
        let red = [
          1,
          2,
          7,
          8,
          12,
          13,
          18,
          19,
          23,
          24,
          29,
          30,
          34,
          35,
          40,
          45,
          46
        ];
        let blue = [
          3,
          4,
          9,
          10,
          14,
          15,
          20,
          25,
          26,
          31,
          36,
          37,
          41,
          42,
          47,
          48
        ];
        let green = [
          5,
          6,
          11,
          16,
          17,
          21,
          22,
          27,
          28,
          32,
          33,
          38,
          39,
          43,
          44,
          49
        ];
        let plus = "+";
        let css = "none";

        if (number == plus) css = "none";
        else if (red.indexOf(parseInt(number)) > -1) css = "red";
        else if (blue.indexOf(parseInt(number)) > -1) css = "blue";
        else if (green.indexOf(parseInt(number)) > -1) css = "green";
        else css = "yellow";
        return css;
      } else if (this.gameCodeDefault == "bjkl8") {
        let red = [3, 5, 8, 11, 17, 20, 23, 26];
        let blue = [2, 5, 8, 11, 17, 20, 23, 26];
        let green = [1, 4, 7, 10, 16, 19, 22, 25];
        let gray = [0, 13, 14, 27];
        let css = "red";
        if (red.indexOf(parseInt(number)) > -1) css = "red";
        if (blue.indexOf(parseInt(number)) > -1) css = "blue";
        if (green.indexOf(parseInt(number)) > -1) css = "green";
        if (gray.indexOf(parseInt(number)) > -1) css = "gray";
        if (number == "+" || number == "=") css = "none";

        return css;
      } else if (
        this.gameCodeDefault.indexOf("pk10") > -1 ||
        this.gameCodeDefault == "mlaft"
      ) {
        let aa = number.substr(1);
        let color = parseInt(aa);
        const pk10 = [
          "PKgreen",
          "PKyellow",
          "PKblue",
          "PKdeepGray",
          "PKorange",
          "PKwaterBlue",
          "PKpurple",
          "PKgray",
          "PKred",
          "PKcoffee"
        ];
        return pk10[color];
      } else if (
        this.gameCodeDefault.indexOf("11x5") > -1 ||
        this.gameCodeDefault.indexOf("ffc") > -1 ||
        this.gameCodeDefault.indexOf("ssc") > -1 ||
        this.gameCodeDefault == "fc3d" ||
        this.gameCodeDefault == "pl3" ||
        this.gameCodeDefault == "qxc" ||
        this.gameCodeDefault == "shssl"
      ) {
        return "yellow";
      } else {
        return false;
      }
    },
    formatDate(value) {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + Number(d.getDate() + value),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    k3DiceTotal(index) {
      let total = this.GameResult[index].gameRsl.split(",");
      let totalAll =
        parseInt(total[0]) + parseInt(total[1]) + parseInt(total[2]);
      return totalAll;
    },
    drawTrendLine() {
      this.mask = 1;
      setTimeout(function() {
        const trend = document.getElementById("trend");
        const active = document.getElementsByClassName("active");
        const canvas = document.createElement("canvas");
        let coordinate = [];
        canvas.width = trend.offsetWidth;
        canvas.height = trend.offsetHeight;
        canvas.style.width = trend.offsetWidth;
        canvas.style.height = trend.offsetHeight;
        canvas.style.zIndex = 1;
        canvas.style.background = "none";
        canvas.style.position = "absolute";
        canvas.style.left = 0;
        canvas.style.top = 0;
        canvas.setAttribute("id", "canvas");
        trend.appendChild(canvas);
        let canvasWidth = trend.offsetWidth;
        let canvasHeight = trend.offsetHeight;
        for (var i = 0; i < active.length; i++) {
          let halfWidth = active[i].offsetWidth / 2;
          let halfHeight = active[i].offsetHeight / 2;
          let centerWidth = active[i].offsetLeft + halfWidth;
          let centerHeight = active[i].offsetTop + halfHeight;
          coordinate.push(centerWidth + "@" + centerHeight);
        }
        var canvas2 = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        createHiDPICanvas(canvasWidth, canvasHeight, 3, canvas2, ctx);
        ctx.strokeStyle = "#eb6877";
        ctx.lineWidth = 2;

        ctx.beginPath();
        for (let j = 0; j < coordinate.length; j++) {
          if (j == 0) {
            let sp = coordinate[j].split("@");
            ctx.moveTo(sp[0], sp[1]);
          } else {
            let sp = coordinate[j].split("@");
            ctx.lineTo(sp[0], sp[1]);
          }
        }
        ctx.stroke();
      }, 50);
      this.mask = 0;
      //Retina 調整解析 ===============================================
      var PIXEL_RATIO = function(ctx) {
        var dpr = window.devicePixelRatio || 1,
          bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
        return dpr / bsr;
      };

      var createHiDPICanvas = function(w, h, ratio, can, cxt) {
        console.log(w);
        console.log(h);
        if (!ratio) {
          ratio = PIXEL_RATIO(cxt);
        }
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "px";
        can.style.height = h + "px";
        cxt.setTransform(ratio, 0, 0, ratio, 0, 0);
        return can;
      };
    }
  }
};
</script>

<style src="./ResultRecord.css" scoped>
</style>
