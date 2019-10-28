<template src="./SSC.html"></template>

<script>
import HistoricalboardComponent from "@/components/games/historicalboard/Historicalboard.vue";
import BettingFieldComponent from "@/components/games/bettingFiled/BetttingField.vue";
import { _getbettime, _payRate } from "@/assets/src/forgame.js";
// 汇入选择游戏组件
import GameChoiceComponent from "@/components/games/gameChoice/GameChoice.vue";
import Option_slideComponent from "@/components/games/option_slide/Option_slide.vue";
import Special from "@/components/games/special/Special.vue";
import {
  calPayRate,
  calPayRate2,
  combination,
  uniquearr,
  randomRangeId,
  gamestatus,
  cleartimer,  
} from "@/assets/src/forgame";
import { debug } from 'util';


//龙虎和

let dtt=[]
for(let i = 1 ; i<5 ;i++){
  for(let j = i+1;j<6;j++){
    dtt.push({
                  classificationNum: i+"对"+j,
                  classificationArr:[
                    {
                      play: "龙",
                      checked: false,
                      oddsArr: [{ id: "Dragon"+ i +"vs"+ j, odds: 0 }],
                    },
                    {
                      play: "和",
                      checked: false,
                      oddsArr: [{ id: "Tie"+ i +"vs"+ j, odds: 0 }],
                    },
                    {
                      play: "虎",
                      checked: false,
                      oddsArr: [{ id: "Tiger"+ i +"vs"+ j, odds: 0 }],
                    },
                    ]
                })
  }
}
//大小单双
let bsoe = ['B','S','O','E'];

let ebsoe = ["大","小","单","双"];
for(let i = 0 ; i<4 ; i++){
  bsoe.push({
    play:ebsoe[i],
    checked:false,
    oddsArr:[{id:"", odds: 0 }],
  })
}
let arr10=[]
for (let i =0 ; i<10 ; i++){
  arr10.push(i)
}






export default {
  name: "SSC",
  components: {
    HistoricalboardComponent,
    BettingFieldComponent,
    GameChoiceComponent,
    Option_slideComponent,
    Special
  },
  data() {
    return {
      gameMenu: [
        {
          name: "",
          sub: [
            {
              subName: "龙虎斗",
              shortName: "",
              gameDes:"",
              classification: dtt
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "百家乐",
              shortName: "",
              gameDes:"",
              classification:[
                {
                  classificationNum: "",
                  classificationArr:[
                    {
                      play: "闲对",
                      checked: false,
                      oddsArr: [{ id: "PlayerPair", odds: 0 }],
                    },
                    {
                      play: "和",
                      checked: false,
                      oddsArr: [{ id: "Tie", odds: 0 }],
                    },
                    {
                      play: "庄对",
                      checked: false,
                      oddsArr: [{ id: "BankerPair", odds: 0 }],
                    },
                    {
                      play: "闲赢",
                      checked: false,
                      oddsArr: [{ id: "PlayerWin", odds: 0 }],
                    },
                    {
                      play: "庄赢",
                      checked: false,
                      oddsArr: [{ id: "BankerWin", odds: 0 }],
                    },
                  ]
                }
              ]
            },
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "全5中1",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:this.arrCreated(arr10,'All5in1_'),
              }
              ]
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "万位",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:this.arrCreated(ebsoe,'Pos0-').concat(this.arrCreated(arr10,'Fixed-P')),
              }
              ]
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "千位",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:this.arrCreated(ebsoe,'Pos1-').concat(this.arrCreated(arr10,'Fixed-P')),
              }
              ]
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "百位",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:this.arrCreated(ebsoe,'Pos2-').concat(this.arrCreated(arr10,'Fixed-P')),
              }
              ]
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "十位",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:this.arrCreated(ebsoe,'Pos3-').concat(this.arrCreated(arr10,'Fixed-P')),
              }
              ]
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "个位",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:this.arrCreated(ebsoe,'Pos4-').concat(this.arrCreated(arr10,'Fixed-P')),
              }
              ]
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "前三球",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:[
                    {
                      play: "豹子",
                      checked: false,
                      oddsArr: [{ id: "F3-S-Triple", odds: 0 }],
                    },
                    {
                      play: "顺子",
                      checked: false,
                      oddsArr: [{ id: "F3-S-Straight", odds: 0 }],
                    },
                    {
                      play: "对子",
                      checked: false,
                      oddsArr: [{ id: "F3-S-Double", odds: 0 }],
                    },
                    {
                      play: "半顺",
                      checked: false,
                      oddsArr: [{ id: "F3-S-HalfStraight", odds: 0 }],
                    },
                    {
                      play: "杂六",
                      checked: false,
                      oddsArr: [{ id: "F3-S-Mix", odds: 0 }],
                    },
                  ]
              }
              ]
            }
          ]
        },
        {
          name: "",
          sub: [
            {
              subName: "后三球",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:[
                    {
                      play: "豹子",
                      checked: false,
                      oddsArr: [{ id: "L3-S-Triple", odds: 0 }],
                    },
                    {
                      play: "顺子",
                      checked: false,
                      oddsArr: [{ id: "L3-S-Straight", odds: 0 }],
                    },
                    {
                      play: "对子",
                      checked: false,
                      oddsArr: [{ id: "L3-S-Double", odds: 0 }],
                    },
                    {
                      play: "半顺",
                      checked: false,
                      oddsArr: [{ id: "L3-S-HalfStraight", odds: 0 }],
                    },
                    {
                      play: "杂六",
                      checked: false,
                      oddsArr: [{ id: "L3-S-Mix", odds: 0 }],
                    },
                  ]
              }
              ]
            }
          ]
        },
        {
          open: this.$route.params.id=='txffc'? false : true,
          name: "",
          sub: [
            {
              subName: "总和",
              shortName: "",
              gameDes:"",
              classification: [
                {
                  classificationNum: "",
                  classificationArr:this.arrCreated(ebsoe,"Sum-")
              }
              ]
            }
          ]
        },
      ],
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
      shortName: [],
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
      } //更新vuex 状态
      t.$store.dispatch("updatebetGameCode", gameCode);
      _getbettime(t, gameCode, t.time); //盘口资料
      _payRate(t, gameCode, "2", t.payrate); //赔率
      
    });
  },
  methods: {
    //arrCreated
    arrCreated: function(arr,id) {
      let arrayReturn = [];
      arr.forEach(function(item,index) {
      if(isNaN(item)){ //大小单双
        arrayReturn.push({
          play: item,
          checked: false,
          oddsArr: [{ id: id + bsoe[index] , odds: 0 }],
        });
      }else{
        if(id == "Fixed-P"){index = ""}
        arrayReturn.push({
          play: item,
          checked: false,
          oddsArr: [{ id: id + index , odds: 0 }],
        });
      }
      });
      return arrayReturn;
    },
    //   监听事件 : 监听玩法选择有无变动，若有则执行FN
    clickOff: function(clickOffValue, clickSubValue) {
      this.offTitle = clickOffValue;
      this.OffSubTitle = clickSubValue;
      this.currentName = this.gameMenu[clickOffValue].sub[clickSubValue].subName;
    },
    //监听如果开启选择玩法页面 就取消所有游戏选取
    childByValue: function() {
       this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification.forEach(function(e){
                e.classificationArr.forEach(function(i){
                  i.checked=false
                })
            })
      this.option_slide_idx = null;
      this.quantity = 0;
      this.forbet = []; //暂存清空
      this.rebatRate = 0;
    },
    bundledatainit() {
      //资料初始
      let _t = this;

      if (Object.keys(this.payrate.value).length > 0) {
        this.gameMenu.forEach(function(v){
            v.sub.forEach(function(v1){
              v1.classification.forEach(function(v2){
                v2.classificationArr.forEach(function(v3){
                  _t.renderdata(v3.oddsArr);
                })
              })
            })
        });        
      }
      this.mask=false
    },
    renderdata(obj) {
      //玩法阵列资料绑定
      let _t = this;
      obj.forEach(function(v) {
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
      obj.forEach(function(v) {
        let _p = _t.payrate.value[v.id];
        v.odds = calPayRate(_p, _t.rebatRate);
        v.odds2 = calPayRate2(_p, _t.rebatRate);
      });
    },
    //选取的号码
    checkNum(Arr) {      
      
        let _t = this;
            this.forbet = [];           

Arr.forEach(function(k){
let checkedArr = k.classificationArr.filter(function(v) {
                return v.checked == true
            })
            checkedArr.forEach(function(e) {
                let positions = ['', '', '', '', ''];
                if (e.oddsArr[0].id == 'Fixed-P') {
                  let positoinsindex;
                  switch(_t.currentName){
                    
                    case '万位':{
                      positoinsindex = 0
                      break;
                    }
                    case '千位':{
                      positoinsindex = 1
                      break;
                    }
                    case '百位':{
                      positoinsindex = 2
                      break;
                    }
                    case '十位':{
                      positoinsindex = 3
                      break;
                    }
                    case '个位':{
                      positoinsindex = 4
                      break;
                    }
                    default :{
                      console.error("error");
                    }
                  }
                    positions[positoinsindex] = e.play.toString()
                }
                let tplay = e.play 
                e =e.oddsArr[0]
                _t.forbet.push({
                    uid: randomRangeId(10),
                    id: e.id,
                    play: tplay,
                    name: _t.currentName,
                    betMainInfo: {
                        playTypeM: e.playTypeM,
                        playTypeS: e.playTypeS,
                        positions: positions,
                        quantity: 1,
                        payRate: e.odds,
                        payRate2: e.odds2,
                        rebatRate: _t.rebatRate,
                        unitPrice: 0
                    }
                });

            })
})
      let Plus = 0;
      this.forbet.forEach(function(v) {
        Plus += v.betMainInfo.quantity;
      });

      this.quantity = Plus;
    }
  },
  watch: {
    payrate: {
      deep: true,
      handler() {
        this.bundledatainit();
      }
    },
    rebatRate(nv) {
      let _t = this;
      this.rebatRate = nv;
      //画面、阵列更新
      this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification
      .forEach(function(v){
        v.classificationArr.forEach(function(va){
          _t.barrenderdata(va.oddsArr)
        })
      });
      //已选的下注 更新资料
      if (this.forbet.length > 0) {
        this.forbet.forEach(function(v) {
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

<style src="./SSC.css" scoped>
</style>
