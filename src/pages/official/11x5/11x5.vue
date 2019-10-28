<template src="./11x5.html">
    
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
    cleartimer
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
//arr 18
let arr18 = [];
for (let i = 0; i < 19; i++) {
    arr18.push(i);
}
//arr 17
let arr17 = [];
for (let i = 1; i < 18; i++) {
    arr17.push(i);
}
//arr 10
let arr10 = [];
for (let i = 1; i < 12; i++) {
    arr10.push(i);
}
//arr 6
let arr6 = [];
for (let i = 1; i < 7; i++) {
    arr6.push(i);
}

export default {
    name: "x115",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
        Option_slideComponent,
    },
    data() {
        return {
            objodds: { id: 'N3-F3-P', odds: 0 },
            gameMenu: [{
                    name: "三码",
                    sub: [{
                            subName: "前三直选复式",
                            shortName: "N3-F3-P",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从任意位置上任意选择1个或1个以上号码。",
                            classification: [{
                                    classificationNum: "第一位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第二位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第三位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "前三组选复式",
                            shortName: "N3-F3-C",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择3个或3个以上号码。",
                            classification: [{
                                classificationNum: "组选",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        },
                        {
                            subName: "前三组选胆拖",
                            shortName: "N3-F3-C-AB",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "中三直选复式",
                            shortName: "N3-M3-P",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从第二位、第三位、第四位中至少各选择1个号码。",
                            classification: [{
                                    classificationNum: "第二位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第三位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第四位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "中三组选复式",
                            shortName: "N3-M3-C",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择3个或3个以上号码。",
                            classification: [{
                                classificationNum: "组选",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        },
                        {
                            subName: "中三组选胆拖",
                            shortName: "N3-M3-C-AB",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "后三直选复式",
                            shortName: "N3-L3-P",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从第三位、第四位、第五位中至少各选择1个号码。",
                            classification: [{
                                    classificationNum: "第三位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第四位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第五位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "后三组选复式",
                            shortName: "N3-L3-C",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择3个或3个以上号码。",
                            classification: [{
                                classificationNum: "组选",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        },
                        {
                            subName: "后三组选胆拖",
                            shortName: "N3-L3-C-AB",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "二码",
                    sub: [{
                            subName: "前二直选复式",
                            shortName: "N2-F2-P",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从第一位、第二位中至少各选择1个号码。",
                            classification: [{
                                    classificationNum: "第一位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第二位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "前二组选复式",
                            shortName: "N2-F2-C",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "组选",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        },
                        {
                            subName: "前二组选胆拖",
                            shortName: "N2-F2-C-AB",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "后二直选复式",
                            shortName: "N2-L2-P",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从第四位、第五位中至少各选择1个号码。",
                            classification: [{
                                    classificationNum: "第四位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "第五位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "后二组选复式",
                            shortName: "N2-L2-C",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "组选",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        },
                        {
                            subName: "后二组选胆拖",
                            shortName: "N2-L2-C-AB",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "不定位",
                    sub: [{
                            subName: "不定位胆-前三",
                            shortName: "Unfixed-F3",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择1个或1个以上号码。",
                            classification: [{
                                classificationNum: "前三位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        },
                        {
                            subName: "不定位胆-中三",
                            shortName: "Unfixed-M3",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择1个或1个以上号码。",
                            classification: [{
                                classificationNum: "中三位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        },
                        {
                            subName: "不定位胆-后三",
                            shortName: "Unfixed-L3",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择1个或1个以上号码。",
                            classification: [{
                                classificationNum: "后三位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }, ]
                        }
                    ]
                },
                {
                    name: "定位胆",
                    sub: [{
                        subName: "定位胆",
                        shortName: "Fixed-P",
                        contentStyle: "gameContent2",
                        optionSlide: true,
                        gameDes: "从任意位置上任意选择1个或1个以上号码。",
                        classification: [{
                                classificationNum: "第一位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
                                classificationNum: "第二位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
                                classificationNum: "第三位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
                                classificationNum: "第四位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
                                classificationNum: "第五位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }
                        ]
                    }]
                },
                {
                    name: "任选复式",
                    sub: [{
                            subName: "任选复式一中一",
                            shortName: "AC-1x1",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择1个或1个以上号码。",
                            classification: [{
                                classificationNum: "选1中1",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任选复式二中二",
                            shortName: "AC-2x2",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "选2中2",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任选复式三中三",
                            shortName: "AC-3x3",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择3个或3个以上号码。",
                            classification: [{
                                classificationNum: "选3中3",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任选复式四中四",
                            shortName: "AC-4x4",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择4个或4个以上号码。",
                            classification: [{
                                classificationNum: "选4中4",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任选复式五中五",
                            shortName: "AC-5x5",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择5个或5个以上号码。",
                            classification: [{
                                classificationNum: "选5中5",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任选复式六中五",
                            shortName: "AC-6x5",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择6个或6个以上号码。",
                            classification: [{
                                classificationNum: "选6中5",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任选复式七中五",
                            shortName: "AC-7x5",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择7个或7个以上号码。",
                            classification: [{
                                classificationNum: "选7中5",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任选复式八中五",
                            shortName: "AC-8x5",
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从01-11中任意选择8个或8个以上号码。",
                            classification: [{
                                classificationNum: "选8中5",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                    ]
                },
                {
                    name: "任选胆拖",
                    sub: [{
                            subName: "任选胆拖二中二",
                            shortName: "AB-2x2",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，2个号码一注,每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "任选胆拖三中三",
                            shortName: "AB-3x3",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，3个号码一注,每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "任选胆拖四中四",
                            shortName: "AB-4x4",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，4个号码一注,每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "任选胆拖五中五",
                            shortName: "AB-5x5",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，5个号码一注,每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "任选胆拖六中五",
                            shortName: "AB-6x5",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，6个号码一注,每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "任选胆拖七中五",
                            shortName: "AB-7x5",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，7个号码一注,每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                        {
                            subName: "任选胆拖八中五",
                            shortName: "AB-8x5",
                            contentStyle: "gameContent2",
                            optionSlide: false,
                            gameDes: "从01-11中，选取2个及以上的号码进行投注，8个号码一注,每注需至少包括1个胆码及1个拖码。",
                            classification: [{
                                    classificationNum: "胆码",
                                    classificationArr: this.arrCreated(arr10)
                                },
                                {
                                    classificationNum: "拖码",
                                    classificationArr: this.arrCreated(arr10)
                                }
                            ]
                        },
                    ]
                },
            ],

            dan: [],
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
            this.dan = []
        },
        bundledatainit() {
            //资料初始
            let _t = this;
            if (Object.keys(this.payrate.value).length > 0) {
                _t.renderdata(this.objodds);
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
        getQuantity(e, pos) {
            switch (e.playTypeS) {
                case 117:
                case 119:
                case 121: //三码直选复式
                    {
                        let count = 0
                        let a1 = pos[0];
                        let a2 = pos[1];
                        let a3 = pos[2];
                        if ((a1.length * a2.length * a3.length) > 0) {
                            for (var i = 0; i < a1.length; i++) {
                                let b1 = a1[i];
                                for (var j = 0; j < a2.length; j++) {
                                    let b2 = a2[j];
                                    if (b2 != b1) {
                                        for (var k = 0; k < a3.length; k++) {
                                            if (a3[k] != b1 && a3[k] != b2) {
                                                count++;
                                            }

                                        }
                                    }

                                }
                            }
                        }
                        return count
                    }
                case 123:
                case 126:
                case 129: //三码组选复式
                case 148: //任选三中三
                    return combination(pos[0].length, 3);
                case 125:
                case 128:
                case 131: //三码组选胆拖
                case 138:
                case 141: //二码组选胆拖
                    {
                        let _l = 3;
                        switch (e.playTypeS) {
                            case 138:
                            case 141:
                                _l = 2;
                                break;
                        }

                        var dan = pos[0]; //膽號
                        var tuo = pos[1]; //拖號

                        var tuo2 = uniquearr(this.dan, tuo); //先將拖號裡有重複膽號的去除
                        let len_1 = this.dan.length;
                        let len_2 = tuo2.length;
                        if (len_1 > 0) {
                            return combination(len_2, _l - len_1);
                        } else {
                            return 0;
                        }
                    }
                case 132:
                case 134: //二码直选复式
                    {
                        let count = 0
                        let a1 = pos[0];
                        let a2 = pos[1];
                        if ((a1.length * a2.length) > 0) {
                            for (var i = 0; i < a1.length; i++) {
                                let b1 = a1[i];
                                for (var j = 0; j < a2.length; j++) {
                                    let b2 = a2[j];
                                    if (b2 != b1) {
                                        count++;
                                    }
                                }
                            }
                        }
                        return count
                    }
                case 136:
                case 139: //二码组选复式
                case 147: //任选二中二
                    return combination(pos[0].length, 2)
                case 142:
                case 143:
                case 144: //不定位
                case 146: //任选一中一
                    return pos[0].length
                case 145: //定位胆
                    {
                        let count = 0
                        for (var i = 0; i < pos.length; i++) {
                            count += pos[i].length;
                        }
                        return count
                    }
                case 149: //任选四中四
                    return combination(pos[0].length, 4)
                case 150: //任选五中五
                    return combination(pos[0].length, 5)
                case 151: //任选六中五
                    return combination(pos[0].length, 6)
                case 152: //任选七中五
                    return combination(pos[0].length, 7)
                case 153: //任选八中五
                    return combination(pos[0].length, 8)
                case 162: //任选胆拖n中n
                case 163:
                case 164:
                case 165:
                case 166:
                case 167:
                case 168:
                    {
                        //抓胆码限制数
                        let str = e.playTypeS.toString()
                        str = str.substr(2, 1)
                        let _l = parseInt(str);

                        var dan = pos[0]; //膽號
                        var tuo = pos[1]; //拖號

                        var tuo2 = uniquearr(this.dan, tuo); //先將拖號裡有重複膽號的去除
                        let len_1 = this.dan.length;
                        let len_2 = tuo2.length;
                        if (len_1 > 0) {
                            return combination(len_2, _l - len_1);
                        } else {
                            return 0;
                        }
                    }

            }
        },
        //选取的号码
        checkNum(Arr, p, idx, sortindx) {
            let _t = this;
            let offtitle = this.offTitle;
            let OffSubTitle = this.OffSubTitle;
            this.forbet = [];

            let positions = ['', '', '', '', ''];
            let pos = [],
                cnpos = []
            let tplay = '';
            let g = this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification

            if (!this.gameMenu[this.offTitle].sub[this.OffSubTitle].optionSlide) { //胆拖

                let limit = 0
                switch (this.objodds.playTypeS) {
                    case 125:
                    case 128:
                    case 131:
                    case 163:
                        limit = 2;
                        break;
                    case 138:
                    case 141:
                    case 162:
                        limit = 1;
                        break;
                    case 164:
                        limit = 3;
                        break;
                    case 165:
                        limit = 4;
                        break;
                    case 166:
                        limit = 5;
                        break;
                    case 167:
                        limit = 6;
                        break;
                    case 168:
                        limit = 7;
                        break;
                }
                if (this.dan.indexOf(p) > -1) this.dan.splice(this.dan.indexOf(p), 1)
                if (sortindx == 0) {
                    let t = this


                    if (this.dan.length == limit) {
                        this.dan.shift()
                        this.dan.push(p)

                        for (let k = 0; k < Arr.length; k++) {
                            Arr[k].checked = false
                            for (let j = 0; j < this.dan.length; j++) {
                                if (Arr[k].play == this.dan[j]) {
                                    Arr[k] = { play: this.dan[j], checked: true }
                                }

                            }
                        }
                    } else this.dan.push(p)
                }
                g[sortindx == 0 ? 1 : 0].classificationArr[idx].checked = false

            }

            for (let i = 0; i < g.length; i++) {
                let check = g[i].classificationArr.map(function(v) { if (v.checked) return v.play }).filter(function(v) { return v != undefined })

                pos[i] = check
                if (pos[i].length > 0) {
                    tplay += g[i].classificationNum + ': ' + pos[i].toString() + ' ';
                }

                if (g[i].option_slide_idx == 5 && pos[i].length > 0) {
                    g[i].option_slide_idx = null
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

<style src="./11x5.css" scoped>

</style>
