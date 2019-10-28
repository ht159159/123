<template src="./bjkl8.html"></template>

<script>
import HistoricalboardComponent from "@/components/games/historicalboard/Historicalboard.vue";
import BettingFieldComponent from "@/components/games/bettingFiled/BetttingField.vue";
import { _getbettime, _payRate } from "@/assets/src/forgame.js";
// 汇入选择游戏组件
import GameChoiceComponent from "@/components/games/gameChoice/GameChoice.vue";
import Option_slideComponent from "@/components/games/option_slide/Option_slide.vue";
import {
  calPayRate,
  calPayRate2,
  combination,
  randomRangeId,
  gamestatus,
  cleartimer
} from "@/assets/src/forgame";

//特码阵列资料 TMArr SixX1Arr于下方挂载进data
let TMArr = [],
  TMB3Arr = [];
for (var i = 0; i < 28; i++) {
  TMArr.push({ id: "Specific-N" + i, play: i, odds: 0, checked: false });
  TMB3Arr.push({ id: "Specific-NNN", play: i, odds: 0, checked: false });
}

//混合于下方挂载进data
let MixArr = [];
let subname = [
  "大",
  "小",
  "单",
  "双",
  "大单",
  "小单",
  "大双",
  "小双",
  "极大",
  "极小"
];
let subEn = ["B", "S", "O", "E", "BO", "SO", "BE", "SE", "BB", "SS"];
for (var y = 0; y < subname.length; y++) {
  MixArr.push({
    id: "Mix-" + subEn[y],
    play: subname[y],
    odds: 0,
    checked: false
  });
}

export default {
  name: "bjkl8",
  components: {
    HistoricalboardComponent,
    BettingFieldComponent,
    GameChoiceComponent,
    Option_slideComponent
  },
  data() {
    return {
      gameMenu: [
        {
          name: "混合",
          sub: [{ subName: "混合", gameDes: "对特码大（14~27）小（0~13）单（1,3,5~27）双（0,2,4~26）大单（15,17,19,21,23,25,27）小单（1,3,5,7,9,11,13）大双（14,16,18,20,22,24,26）小双（0,2,4,6,8,10,12）极大（22~27）极小（0~5）形态进行投注，所选号码的形态与开奖号码的形态相同，即为中奖。" }],
          isShow: true
        },
        {
          name: "波色",
          sub: [{ subName: "波色", gameDes: "对绿波（1，4，7，10，16，19，22，25），蓝波（2，5，8，11，17，20，23，26），红波（3，6，9，12，15，18，21，24）形态进行投注，所选号码的形态与开奖号码相加之和的形态相同，即为中奖。" }],
          isShow: false
        },
        {
          name: "豹子",
          sub: [{ subName: "豹子", gameDes: "对所有的豹子（000，111，222，333，444，555，666，777，888，999）进行投注。当开奖号码为任意1个豹子时，即中奖。" }],
          isShow: false
        },
        {
          name: "特码",
          sub: [
            {
              subName: "特码",
              gameDes: "特码 投注方案：投注号码6<br>开奖号码：1，2，3，即中特码。中奖条件：所选特码与开奖的3个号码相加之和相同，即中奖。"
            },
            {
              subName: "特码包三",
              gameDes: "特码包三 投注方案：投注号码5，6，7<br>开奖号码：3 1 1、2 2 2、5 0 2，即中特码包三。投选三个特码，任意一个特码与开奖的3个号码相加之和相同，即中奖。"
            }
          ],
          isShow: false
        }
      ],
      // 混合资料
      Mix: MixArr,
      //色波資料
      SB: [
        { id: "Color-Red", play: "红波", odds: 0, checked: false },
        { id: "Color-Blue", play: "蓝波", odds: 0, checked: false },
        { id: "Color-Green", play: "绿波", odds: 0, checked: false }
      ],
      BZ: [{ id: "Triple-All", play: "豹子", odds: 0, checked: false }],
      TM: TMArr,
      TMB3: TMB3Arr,
      B3Arr: [],
      offTitle: 0,
      OffSubTitle: 0,
      option_slide_idx: null,
      payrate: { value: {} },
      time: { value: "" },
      barMax: 0, //--->子组件
      rebatRate: 0, //与子组件双向绑定
      forbet: [], //投注暂存
      quantity: 0,
      currentName: "", //购物车玩法显示
      issueTrace: true, //是否可追号
      mask:true
    };
  },
  mounted() {
    window.scrollTo(0,0);
    let t = this;
    let gameCode = this.$route.params.id;
    this.setCookie('currentGameName',encodeURI(this.$route.meta.title),0.5) //safari 不支持存中文 要编码 
    gamestatus(this, gameCode, function(res) {
      if (Object.keys(res).length === 0) {
        alert("维护中");
        t.$router.push({ path: "/index" });
        return;
      }
      //更新vuex 状态
      t.$store.dispatch("updatebetGameCode", gameCode);
      _getbettime(t, gameCode, t.time); //盘口资料
      _payRate(t, gameCode, "1", t.payrate); //赔率
      
    });
  },
  methods: {
    //   监听事件 : 监听玩法选择有无变动，若有则执行FN
    clickOff: function(clickOffValue, clickSubValue) {
      this.offTitle = clickOffValue;
      this.OffSubTitle = clickSubValue;
      this.currentName = this.gameMenu[clickOffValue].sub[clickSubValue].subName;
    },

    //监听如果开启选择玩法页面 就取消所有游戏选取
    childByValue: function() {
      let GameType = [this.Mix, this.SB, this.BZ, this.TM, this.TMB3];
      for (let j = 0; j < GameType.length; j++) {
        for (let i = 0; i < GameType[j].length; i++) {
          GameType[j][i].checked = false;
        }
      }
      this.option_slide_idx = null;
      this.quantity = 0;
      this.forbet = []; //暂存清空
      this.rebatRate = 0;
      this.B3Arr=[]
    },
    bundledatainit() {
      //资料初始
      let _t = this;
      let GameType = [this.Mix, this.SB, this.BZ, this.TM, this.TMB3];
      if (Object.keys(this.payrate.value).length > 0) {
        GameType.forEach(function(v, i) {
          _t.renderdata(v);
        });
      }
      this.mask=false
    },
    // 彩球颜色判定;彩球数字判定(特码+特码6中1);
    getcolor(number) {
      var red = [3, 6, 9, 12, 15, 18, 21, 24];
      var blue = [2, 5, 8, 11, 17, 20, 23, 26];
      var green = [1, 4, 7, 10, 16, 19, 22, 25];
      var gray = [0, 13, 14, 27];
      var css = "";
      if (red.indexOf(parseInt(number)) > -1) css = "redback";
      if (blue.indexOf(parseInt(number)) > -1) css = "blueback";
      if (green.indexOf(parseInt(number)) > -1) css = "greenback";
      if (gray.indexOf(parseInt(number)) > -1) css = "noneback";
      return css;
    },
    mixbackground(i) {
      if (i < 4) return "noneback";
      else if (i > 3 && i < 8) return "blueback";
      else return "greenback";
    },
    //色波背景判定
    bobackground(str) {
      if (str.indexOf("Red") > 0) return "big-redback";
      else if (str.indexOf("Blue") > 0) return "big-blueback";
      else if (str.indexOf("Green") > 0) return "big-greenback";
    },
    renderdata(obj) {
      //玩法阵列资料绑定
      let _t = this;
      obj.forEach(function(v, i) {
        let _p = _t.payrate.value[v.id];
        v.odds = calPayRate(_p, 0);
        v.odds2 = calPayRate2(_p, 0);
        v.playTypeS = _p.playTypeS;
        v.playTypeM = _p.playTypeM;
        _t.barMax = _p.rebatRate;
      });
    },
    barrenderdata(obj) {
      //拉动bar 玩法赔率变动
      let _t = this;
      obj.forEach(function(v, i) {
        let _p = _t.payrate.value[v.id];
        v.odds = calPayRate(_p, _t.rebatRate);
        v.odds2 = calPayRate2(_p, _t.rebatRate);
      });
    },    
    //选取的号码
    checkNum(Arr, indx) {
      let _t = this;
      this.forbet = [];

      if (_t.offTitle == 3 && _t.OffSubTitle == 1) {
        let B3 = _t.B3Arr;
        if (B3.indexOf(indx) > -1) B3.splice(B3.indexOf(indx), 1);
        else B3.push(indx);

        if (B3.length > 3) {
          Arr.forEach(function(v, i) {
            v.checked = false;
          });
          B3.shift();
        }

        B3.forEach(function(v, i) {
          Arr[v].checked = true;
        });
       
        let e = Arr[0]
        let q = B3.length==3?1:0
        let p = ['']
        p[0] = B3.toString()

        let tplay = p[0];

        if (q > 0) {
            _t.forbet.push({
                uid: randomRangeId(10),
                id: e.id,
                play: tplay,
                name: _t.currentName,
                betMainInfo: {
                    playTypeM: e.playTypeM,
                    playTypeS: e.playTypeS,
                    positions: p,
                    quantity: q,
                    payRate: e.odds,
                    payRate2: e.odds2,
                    rebatRate: _t.rebatRate,
                    unitPrice: 0
                }
            });
        }
      } else {
        let checkedArr = Arr.filter(function(v, i) {
          return v.checked == true;
        });
        checkedArr.forEach(function(e, i) {
          _t.forbet.push({
            uid: randomRangeId(10),
            id: e.id,
            play: e.play,
            name: _t.currentName,
            betMainInfo: {
              playTypeM: e.playTypeM,
              playTypeS: e.playTypeS,
              positions: [""],
              quantity: 1,
              payRate: e.odds,
              payRate2: e.odds2,
              rebatRate: _t.rebatRate,
              unitPrice: 0
            }
          });
        });
      }

      let Plus = 0;
      this.forbet.forEach(function(v, i) {
        Plus += v.betMainInfo.quantity;
      });

      this.quantity = Plus;
    }
  },
  watch: {
    payrate: {
      deep: true,
      handler(nv, ov) {
        this.bundledatainit();        
      }
    },
    rebatRate(nv, ov) {
      let _t = this;
      this.rebatRate = nv;

      let GameType = [[this.Mix], [this.SB], [this.BZ], [this.TM, this.TMB3]];
      //画面、阵列更新
      this.barrenderdata(GameType[this.offTitle][this.OffSubTitle]);

      //已选的下注 更新资料
      if (this.forbet.length > 0) {
        this.forbet.forEach(function(v, i) {
          let _p = _t.payrate.value[v.id];
          v.betMainInfo.payRate = calPayRate(_p, nv);
          v.betMainInfo.payRate2 = calPayRate2(_p, nv);
          v.betMainInfo.rebatRate = nv;
        });
      }
    }
  },
  destroyed() {
    const unWatch = this.$watch("payrate");
    unWatch(); // 手动注销watch
    this.childByValue();    
    cleartimer()
  },
  computed: {
    donotTouch() {
      return this.$store.state.dontTouch;
    }
  }
};
</script>

<style src="./bjkl8.css" scoped>
</style>
