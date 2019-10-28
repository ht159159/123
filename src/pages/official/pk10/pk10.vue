<template src="./pk10.html">
    
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
} from "@/assets/src/forgame";


//arr 10
let arr10 = [];
for (let i = 1; i < 11; i++) {
    arr10.push(i);
}

//bsoe
let bsoe = ["大", "小", "单", "双"];
let ebsoe = ['B', 'S', 'O', 'E']
export default {
    name: "pk10",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
        Option_slideComponent,
    },
    data() {
        return {
            objodds: { id: 'Fixed-P', odds: 0 },
            gameMenu: [{
                    name: "定位",
                    sub: [{
                        subName: "定位胆",
                        shortName: "Fixed-P",
                        optionSlide: true,
                        gameDes: "从第一名到第十名任意位置上选择1个或1个以上号码。",
                        classification: [{
                                classificationNum: "冠军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "亚军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "季军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "第四名",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "第五名",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "第六名",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "第七名",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "第八名",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "第九名",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "第十名",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }
                        ]
                    }]
                },
                {
                    name: "大小单双",
                    sub: [{
                            subName: "冠军大小单双",
                            shortName: "BSOE-F1",
                            optionSlide: false,
                            gameDes: "从冠军中的“大、小、单、双”中至少选一个组成一注。",
                            classification: [{
                                classificationNum: "冠军",
                                classificationArr: this.arrCreated(bsoe)
                            }]
                        },
                        {
                            subName: "前二大小单双",
                            shortName: "BSOE-F2",
                            optionSlide: false,
                            gameDes: "从冠军、亚军中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "冠军",
                                    classificationArr: this.arrCreated(bsoe),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "亚军",
                                    classificationArr: this.arrCreated(bsoe)
                                }
                            ]
                        },
                        {
                            subName: "前三大小单双",
                            shortName: "BSOE-F3",
                            optionSlide: false,
                            gameDes: "从冠军、亚军、季军中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "冠军",
                                    classificationArr: this.arrCreated(bsoe)                                    
                                },
                                {
                                    classificationNum: "亚军",
                                    classificationArr: this.arrCreated(bsoe)
                                },
                                {
                                    classificationNum: "季军",
                                    classificationArr: this.arrCreated(bsoe)
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "前1",
                    sub: [{
                        subName: "猜冠军",
                        shortName: "F1-P",
                        optionSlide: true,
                        gameDes: "从第一名中至少选择1个号码组成一注。",
                        classification: [{
                            classificationNum: "冠军",
                            classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                        }]
                    }]
                },
                {
                    name: "前2",
                    sub: [{
                        subName: "猜前二复式",
                        shortName: "F2-P",
                        optionSlide: true,
                        gameDes: "从第一名、第二名中至少选择1个号码组成一注。",
                        classification: [{
                                classificationNum: "冠军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "亚军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }
                        ]
                    }]
                },
                {
                    name: "前3",
                    sub: [{
                        subName: "猜前三复式",
                        shortName: "F3-P",
                        optionSlide: true,
                        gameDes: "从第一名、第二名、第三名中至少选择1个号码组成一注。",
                        classification: [{
                                classificationNum: "冠军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "亚军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            },
                            {
                                classificationNum: "季军",
                                classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                            }
                        ]
                    }]
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
            issueTrace: true, //是否可追号
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
                case 91:
                    {
                        let count = 0
                        for (var i = 0; i < pos.length; i++) {
                            count += pos[i].length;
                        }
                        return count
                    }
                case 232:
                case 233:
                case 234:
                    {
                        let count = 1
                        for (var i = 0; i < pos.length; i++) {
                            count *= pos[i].length;
                        }
                        return count
                    }
                case 86:
                    return pos[0].length
                case 87:
                    {
                        let count = 0
                        for (var i = 0; i < pos[0].length; i++) {
                            for (var j = 0; j < pos[1].length; j++) {
                                if (pos[0][i] != pos[1][j]) count++
                            }
                        }
                        return count
                    }
                case 89:
                    {
                        let count = 0
                        for (var i = 0; i < pos[0].length; i++) {
                            for (var j = 0; j < pos[1].length; j++) {
                                for (var k = 0; k < pos[2].length; k++) {
                                    if (pos[0][i] != pos[1][j] && pos[1][j] != pos[2][k] && pos[0][i] != pos[2][k])
                                        count++
                                }

                            }
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

            let positions = ['', '', '', '', '', '', '', '', '', ''];
            let pos = [],
                cnpos = []
            let tplay = '';
            let g = this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification
            for (let i = 0; i < g.length; i++) {
                let check = g[i].classificationArr.map(function(v) { if (v.checked) return v.play })

                if (this.offTitle == 1) { //大小单双  
                    cnpos[i] = check.filter(function(v) { return v != undefined }); //中文
                    for (let index = 0; index < check.length; index++) {
                        if (check[index] != undefined) check[index] = ebsoe[index] //中文置换代号
                    }
                }
                pos[i] = check.filter(function(v) { return v != undefined });
                if (pos[i].length > 0) {
                    if (this.offTitle == 1)
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

<style src="./pk10.css" scoped>

</style>
