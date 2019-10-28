<template src="./bjkl8.html">
    
</template>

<script>
import HistoricalboardComponent from "@/components/games/historicalboard/Historicalboard.vue";
import BettingFieldComponent from "@/components/games/bettingFiled/BetttingField.vue";
import { _getbettime, _payRate } from "@/assets/src/forgame.js";
// 汇入选择游戏组件
import GameChoiceComponent from "@/components/games/gameChoice/GameChoice.vue";


import {
    calPayRate,
    calPayRate2,
    combination,
    uniquearr,
    randomRangeId,
    gamestatus,
    cleartimer,
} from "@/assets/src/forgame";

let arr27=[]
for(let i=0;i<28;i++){
    arr27.push({
        id:'Specific-N'+i.toString(),
        play:i,
        checked:false
    })
}
export default {
    name: "bjkl8",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
    },
    data() {
        return {
            gameMenu: [{
                sub: [{
                    subName: "混合",
                    shortName: "mix",
                    classification: [{
                        classificationArr: [{ id: "Mix-B", play: "大", },
                            { id: "Mix-S", play: "小", },
                            { id: "Mix-O", play: "单", },
                            { id: "Mix-E", play: "双", },
                            { id: "Mix-BO", play: "大单", },
                            { id: "Mix-SO", play: "小单", },
                            { id: "Mix-BE", play: "大双", },
                            { id: "Mix-SE", play: "小双", },
                            { id: "Mix-BB", play: "极大", },
                            { id: "Mix-SS", play: "极小", }
                        ],
                    }]
                }],
            },
            {
                sub: [{
                    subName: "单码",
                    shortName: "Specific",
                    classification: [{
                        classificationArr: arr27
                    }]
                }],
            }],

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
            mask: true
        };
    },
    mounted() {
        window.scrollTo(0, 0);
        let t = this;
        let gameCode = this.$route.params.id;
        this.setCookie('currentGameName', encodeURI(this.$route.meta.title), 0.5) //safari 不支持存中文 要编码 

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
        //   监听事件 : 监听玩法选择有无变动，若有则执行FN
        clickOff: function(clickOffValue, clickSubValue) {
            this.offTitle = clickOffValue;
            this.OffSubTitle = clickSubValue;
            this.currentName = this.gameMenu[clickOffValue].sub[clickSubValue].subName;
        },

        //监听如果开启选择玩法页面 就取消所有游戏选取
        childByValue: function() {
            this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification.forEach(function(e) {
                e.option_slide_idx = null
                e.classificationArr.forEach(function(i) {
                    i.checked = false
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
                this.gameMenu.forEach(function(v) {
                    v.sub[0].classification.forEach(function(q) {
                        q.classificationArr.forEach(function(e) {
                            _t.renderdata(e);
                        })
                    })
                })
            }
            this.mask = false
        },
        renderdata(obj) {
            //玩法阵列资料绑定
            let _t = this;

            let _p = _t.payrate.value[obj.id];
            obj.odds = calPayRate(_p, 0);
            obj.odds2 = calPayRate2(_p, 0);
            obj.playTypeS = _p.playTypeS;
            obj.playTypeM = _p.playTypeM;
            _t.barMax = _p.rebatRate;

        },
        barrenderdata(obj) {
            //拉动bar 玩法赔率变动           
            let _p = this.payrate.value[obj.id];
            obj.odds = calPayRate(_p, this.rebatRate);
            obj.odds2 = calPayRate2(_p, this.rebatRate);

        },
        //选取的号码
        checkNum(Arr) {
            let _t = this;           
            this.forbet = [];

            let checkedArr = Arr.filter(function(v, i) {
                return v.checked == true
            })
            checkedArr.forEach(function(e) {
                let positions = [''];
                
                _t.forbet.push({
                    uid: randomRangeId(10),
                    id: e.id,
                    play: e.play,
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

            //画面、阵列更新
            this.gameMenu[this.offTitle].sub[0].classification.forEach(function(v) {
                v.classificationArr.forEach(function(e) {
                    _t.barrenderdata(e);
                })
            })

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

<style src="../k3/k3.css" scoped>

</style>
