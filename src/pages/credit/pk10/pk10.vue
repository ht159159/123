<template src="./pk10.html">
    
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

let Pos = ['大', '小', '单', '双', '龙', '虎']
let Posid = ['B', 'S', 'O', 'E', 'Dragon', 'Tiger']
let Pos1 = ['大', '小', '单', '双']
let Pos1id = ['B', 'S', 'O', 'E']
//arr 10
let arr10 = [];
for (let i = 1; i < 11; i++) {
    arr10.push({
        id: 'Fixed-P',
        play: i,
        checked: false
    });
}

let ranking = ['冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名']
let r = []
for (let i = 0; i < ranking.length; i++) {
    let n = "Pos" + (i + 1)
    if (i > 4) { //第五名之后没有龙虎
        Pos = Pos1
        Posid = Pos1id
    }
    r.push({
        sub: [{
            subName: ranking[i],
            shortName: n,
            classification: [{
                    name: n,
                    classificationArr: arrCreated(n, Pos, Posid).concat(arr10),               
                }
            ]
        }]
    })
}

function arrCreated(name, arr, arrid) {
    let arrayReturn = [];
    arr.forEach(function(item, i) {
        arrayReturn.push({
            id: name + '-' + arrid[i],
            play: item,
            checked: false
        });
    });
    return arrayReturn;
}

export default {
    name: "pk10",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
    },
    data() {
        return {
            gameMenu: [{
                sub: [{
                    subName: "冠、亚军和",
                    shortName: "F2Sum",
                    classification: [{
                        classificationArr: [{
                                play: '大',
                                id: 'F2Sum-B',
                            },
                            {
                                play: '小',
                                id: 'F2Sum-S'
                            },
                            {
                                play: '单',
                                id: 'F2Sum-O'
                            },
                            {
                                play: '双',
                                id: 'F2Sum-E'
                            },
                            {
                                play: '大单',
                                id: 'F2Sum-BO'
                            },
                            {
                                play: '小单',
                                id: 'F2Sum-SO'
                            },
                            {
                                play: '大双',
                                id: 'F2Sum-BE'
                            },
                            {
                                play: '小双',
                                id: 'F2Sum-SE'
                            },
                            {
                                play: '三',
                                id: 'F2Sum-3'
                            },
                            {
                                play: '四',
                                id: 'F2Sum-4'
                            },
                            {
                                play: '五',
                                id: 'F2Sum-5'
                            },
                            {
                                play: '六',
                                id: 'F2Sum-6'
                            },
                            {
                                play: '七',
                                id: 'F2Sum-7'
                            },
                            {
                                play: '八',
                                id: 'F2Sum-8'
                            },
                            {
                                play: '九',
                                id: 'F2Sum-9'
                            },
                            {
                                play: '十',
                                id: 'F2Sum-10'
                            },
                            {
                                play: '十一',
                                id: 'F2Sum-11'
                            },
                            {
                                play: '十二',
                                id: 'F2Sum-12'
                            },
                            {
                                play: '十三',
                                id: 'F2Sum-13'
                            },
                            {
                                play: '十四',
                                id: 'F2Sum-14'
                            },
                            {
                                play: '十五',
                                id: 'F2Sum-15'
                            },
                            {
                                play: '十六',
                                id: 'F2Sum-16'
                            },
                            {
                                play: '十七',
                                id: 'F2Sum-17'
                            },
                            {
                                play: '十八',
                                id: 'F2Sum-18'
                            },
                            {
                                play: '十九',
                                id: 'F2Sum-19'
                            },
                        ],
                    }]
                }],
            }].concat(r),

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
                let positions = ['', '', '', '', '', '', '', '', '', ''];
                if (e.id == 'Fixed-P') {
                    positions[0] = e.play.toString()
                }
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
