<template src="./low.html">
    
</template>

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
    uniquearr,
    randomRangeId,
    gamestatus,
    cleartimer,
    computeAllHeZhuCount,
    computeZxHeZhu3Count,
    computeZxHeZhu6Count
} from "@/assets/src/forgame";

//arr 28 0~27
let arr28 = [];
for (let i = 0; i < 28; i++) {
    arr28.push(i);
}
//arr 28 1~26
let arr26 = [];
for (let i = 1; i < 27; i++) {
    arr26.push(i);
}
let arr24 = []
for (let i = 3; i < 25; i++) {
    arr24.push(i)
}

//arr 10
let arr10 = [];
for (let i = 0; i < 10; i++) {
    arr10.push(i);
}

//bsoe
let bsoe = ["大", "小", "单", "双"];
let ebsoe = ['B', 'S', 'O', 'E']
export default {
    name: "low",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
        Option_slideComponent,
    },
    data() {
        return {
            objodds: { id: 'N3-P', odds: 0 },
            gameMenu: [{
                    name: "3星",
                    sub: [{
                            subName: "三码复式",
                            shortName: "N3-P",
                            optionSlide: true,
                            gameDes: "从百位、十位、个位各选一个号码组成一注。",
                            classification: [{
                                    classificationNum: "百位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "十位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "个位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "三码直选和值",
                            shortName: "N3-P-Sum",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从0-27中任意选择1个或1个以上号码。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr28),
                                    option_slide_idx: null
                            }]
                        },
                        {
                            subName: "三码组三",
                            shortName: "N3-C3",
                            optionSlide: true,
                            gameDes: "从0-9中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "组三",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }]
                        },
                        {
                            subName: "三码组六",
                            shortName: "N3-C6",
                            optionSlide: true,
                            gameDes: "从0-9中任意选择3个或3个以上号码。",
                            classification: [{
                                classificationNum: "组六",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }]
                        },
                        {
                            subName: "三码组三和值",
                            shortName: "N3-C3-Sum",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从1-26中选择1个号码。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr26),
                                    option_slide_idx: null
                            }]
                        },
                        {
                            subName: "三码组六和值",
                            shortName: "N3-C6-Sum",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从3-24中选择1个号码。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr24),
                                    option_slide_idx: null
                            }]
                        }
                    ]
                },
                {
                    name: "2星",
                    sub: [{
                            subName: "前二直选",
                            shortName: "N2-F2-P",
                            optionSlide: true,
                            gameDes: "从百位、十位中至少各选1个号码组成一注。",
                            classification: [{
                                    classificationNum: "百位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "十位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }

                            ]
                        },
                        {
                            subName: "后二直选",
                            shortName: "N2-L2-P",
                            optionSlide: true,
                            gameDes: "从十位、个位中至少各选1个号码组成一注。",
                            classification: [{
                                    classificationNum: "十位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "个位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "前二组选",
                            shortName: "N2-F2-C",
                            optionSlide: true,
                            gameDes: "从0-9中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "前二",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后二组选",
                            shortName: "N2-L2-C",
                            optionSlide: true,
                            gameDes: "从0-9中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "后二",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }]
                        }
                    ]
                },
                {
                    name: "定位胆",
                    sub: [{
                        subName: "定位胆",
                        shortName: "Fixed-P",
                        optionSlide: true,
                        gameDes: "在百位、十位、个位任意位置上任意选择1个或1个以上号码。",
                        classification: [{
                                classificationNum: "百位",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "十位",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "个位",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }
                        ]
                    }]
                },
                {
                    name: "不定位",
                    sub: [{
                            subName: "一码不定位",
                            shortName: "Unfixed-N1",
                            optionSlide: true,
                            gameDes: "从0-9中任意选择1个以上号码。",
                            classification: [{
                                classificationNum: "一码",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }]
                        },
                        {
                            subName: "二码不定位",
                            shortName: "Unfixed-N2",
                            optionSlide: true,
                            gameDes: "从0-9中任意选择2个以上号码。",
                            classification: [{
                                classificationNum: "二码",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }]
                        }
                    ]
                },
                {
                    name: "大小单双",
                    sub: [{
                            subName: "前二大小单双",
                            shortName: "BSOE-F2",
                            optionSlide: false,
                            gameDes: "从百位、十位中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "百位",
                                    classificationArr: this.arrCreated(bsoe),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "十位",
                                    classificationArr: this.arrCreated(bsoe),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "后二大小单双",
                            shortName: "BSOE-L2",
                            optionSlide: false,
                            gameDes: "从十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "十位",
                                    classificationArr: this.arrCreated(bsoe),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "个位",
                                    classificationArr: this.arrCreated(bsoe),
                                    option_slide_idx: null
                                }
                            ]
                        }
                    ]
                }

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
            issueTrace: false, //是否可追号
            shortName: [],
            mask:true
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
            _payRate(t, gameCode, "1", t.payrate); //赔率

        });
    },
    methods: {
        //arrCreated
        arrCreated: function(arr) {
            let arrayReturn = [];
            arr.forEach(function(item) {
                arrayReturn.push({
                    play: item,
                    checked: false
                });
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
            this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification.forEach(function(e) {
                e.option_slide_idx =null
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
                _t.renderdata(this.objodds);
            }
            this.mask=false
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
        getQuantity(e, pos) {
            switch (e.playTypeS) {
                case 173:
                    return pos[0].length * pos[1].length * pos[2].length
                case 175:
                    {
                        let count = 0
                        let c = computeAllHeZhuCount(3)
                        pos[0].forEach(function(v, i) {
                            count += c[v];
                        })
                        return count;
                    }
                case 176:
                    return combination(pos[0].length, 2) * 2
                case 177:
                    return combination(pos[0].length, 3)
                case 178:
                    {
                        let count = 0
                        let c = computeZxHeZhu3Count();
                        pos[0].forEach(function(v, i) {
                            count += c[v];
                        })
                        return count
                    }
                case 179:
                    {
                        let count = 0
                        let c = computeZxHeZhu6Count();
                        pos[0].forEach(function(v, i) {
                            count += c[v];
                        })
                        return count
                    }
                case 180:
                case 181:
                case 187:
                case 188:
                    return pos[0].length * pos[1].length;
                case 182:
                case 183:
                case 186:
                    return combination(pos[0].length, 2)
                case 184:
                case 185:
                    {
                        let count = 0
                        for (var i = 0; i < pos.length; i++) {
                            count += pos[i].length;
                        }
                        return count
                    }
            }
        },
        //选取的号码
        checkNum(Arr) {
            let _t = this;
            let offtitle = this.offTitle;
            let OffSubTitle = this.OffSubTitle;
            this.forbet = [];

            let positions = ['', '', ''];
            let pos = [],
                cnpos = []
            let tplay = '';
            let g = this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification
            for (let i = 0; i < g.length; i++) {
                let check = g[i].classificationArr.map(function(v) { if (v.checked) return v.play })

                if (this.offTitle == 4) { //大小单双  
                    cnpos[i] = check.filter(function(v) { return v != undefined }); //中文
                    for (let index = 0; index < check.length; index++) {
                        if (check[index] != undefined) check[index] = ebsoe[index] //中文置换代号
                    }                    
                }                

                pos[i] = check.filter(function(v) { return v != undefined });
                if (pos[i].length > 0) {
                    if (this.offTitle == 4)
                        tplay += g[i].classificationNum + ':' + cnpos[i].toString() + ' ';
                    else
                        tplay += g[i].classificationNum + ':' + pos[i].toString() + ' ';
                }

                if(g[i].option_slide_idx==5&& pos[i].length>0){
                    g[i].option_slide_idx=null
                }
            }

            let e = this.objodds
            let q = this.getQuantity(e, pos)

            pos.forEach(function(v, i) {
                positions[i] = v.toString()
            })
            
            if (q > 0) {
                _t.forbet.push({
                    uid: randomRangeId(10),
                    id: e.id,
                    play: tplay,
                    name: _t.currentName,
                    betMainInfo: {
                        playTypeM: e.playTypeM,
                        playTypeS: e.playTypeS,
                        positions: positions,
                        quantity: q,
                        payRate: e.odds,
                        payRate2: e.odds2,
                        rebatRate: _t.rebatRate,
                        unitPrice: 0
                    }
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

        offTitle: function() {
            this.objodds = { id: this.gameMenu[this.offTitle].sub[this.OffSubTitle].shortName, odds: 0 }
            this.renderdata(this.objodds);
        },

        OffSubTitle: function() {
            this.objodds = { id: this.gameMenu[this.offTitle].sub[this.OffSubTitle].shortName, odds: 0 }
            this.renderdata(this.objodds);
        },
        rebatRate(nv, ov) {
            let _t = this;
            this.rebatRate = nv;

            //画面、阵列更新
            this.barrenderdata(this.objodds);

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

<style src="./low.css" scoped>

</style>
