<template src="./qxc.html">
    
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

//arr 10
let arr10 = [];
for (let i = 0; i < 10; i++) {
    arr10.push(i);
}

export default {
    name: "qxc",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
        Option_slideComponent
    },
    data() {
        return { 
            objodds: { id: 'Fixed-P', odds: 0 },
            gameMenu: [{
                    name: "一定",                    
                    sub: this.gameMenuSub('Fixed-P')
                },
                {
                    name: "二定",                    
                    sub: this.gameMenuSub('AC2-P')
                },
                {
                    name: "三定",                    
                    sub: this.gameMenuSub('AC3-P')
                },
                {
                    name: "四定",                    
                    sub: this.gameMenuSub('AC4-P')
                },
                {
                    name: "不定位",                    
                    sub: [{
                            subName: '二字现',
                            shortName: 'Unfixed-F4x2',
                            optionSlide: true,
                            gameDes: '从0-9中任意选择2个以上号码。',
                            classification: [{
                                classificationNum: "二字现",
                                option_slide_idx: null,
                                classificationArr: this.arrCreated(arr10)
                            }]
                        },
                        {
                            subName: '三字现',
                            shortName: 'Unfixed-F4x3',
                            optionSlide: true,
                            gameDes: '从0-9中任意选择3个以上号码。',
                            classification: [{
                                classificationNum: "三字现",
                                option_slide_idx: null,
                                classificationArr: this.arrCreated(arr10)
                            }]
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
            }
            //更新vuex 状态
            t.$store.dispatch("updatebetGameCode", gameCode);

            _getbettime(t, gameCode, t.time); //盘口资料
            _payRate(t, gameCode, "1", t.payrate); //赔率
        });

    },
    methods: {
        gameMenuSub(id) {
            let name = '';
            let gamedes = '';
            switch (id) {
                case 'Fixed-P':
                    name = '一定',                    
                    gamedes = '在千位、百位、十位、个位任意位置上任意选择1个或1个以上号码。'
                    break;
                case 'AC2-P':
                    name = '二定'
                    gamedes = '从千位、百位、十位、个位中至少两位上各选1个号码组成一注。'
                    break;
                case 'AC3-P':
                    name = '三定'
                    gamedes = '从千位、百位、十位、个位中至少三位上各选1个号码组成一注。'
                    break;
                case 'AC4-P':
                    name = '四定'
                    gamedes = '从千位、百位、十位、个位中至少四位上各选1个号码组成一注。'
                    break;
            }

            return [{
                subName: name,
                shortName: id,
                optionSlide: true,
                gameDes: gamedes,
                classification: [{
                        classificationNum: "千位",
                        option_slide_idx: null,
                        classificationArr: this.arrCreated(arr10)
                    },
                    {
                        classificationNum: "百位",
                        option_slide_idx: null,
                        classificationArr: this.arrCreated(arr10)
                    },
                    {
                        classificationNum: "十位",
                        option_slide_idx: null,
                        classificationArr: this.arrCreated(arr10)
                    },
                    {
                        classificationNum: "个位",
                        option_slide_idx: null,
                        classificationArr: this.arrCreated(arr10)
                    }
                ]
            }]
        },
        //arrCreated
        arrCreated: function(arr) {
            let arrayReturn = [];
            arr.forEach(function(item, index) {
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
            this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification.forEach(function(e){
                e.option_slide_idx =null
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
                case 570:
                    return pos[0].length + pos[1].length + pos[2].length + pos[3].length
                case 571:
                    {
                        let count = 0
                        for (var i = 0; i < 4; i++) {
                            for (var j = i + 1; j < 4; j++) {
                                count += pos[i].length * pos[j].length
                            }
                        }
                        console.log(count)
                        return count;
                    }
                case 572:
                    {
                        let count = 0
                        for (var i = 0; i < 4; i++) {
                            for (var j = i + 1; j < 4; j++) {
                                for (var k = j + 1; k < 4; k++) {
                                    count += pos[i].length * pos[j].length * pos[k].length
                                }
                            }
                        }
                        return count;
                    }
                case 573:
                    {
                        let count = 0
                        for (var i = 0; i < 4; i++) {
                            for (var j = i + 1; j < 4; j++) {
                                for (var k = j + 1; k < 4; k++) {
                                    for (var m = k + 1; m < 4; m++) {
                                        count += pos[i].length * pos[j].length * pos[k].length * pos[m].length
                                    }
                                }
                            }
                        }
                        return count;
                    }
                case 574:
                    return combination(pos[0].length, 2)
                case 575:
                    return combination(pos[0].length, 3)
            }
        },
        //选取的号码
        checkNum(Arr) {
            let _t = this;
            let offtitle = this.offTitle;
            let OffSubTitle = this.OffSubTitle;
            this.forbet = [];

            let positions = ['', '', '', ''];
            let pos = []
            let tplay = '';
            let g = this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification
            for (let i = 0; i < g.length; i++) {
                let check = g[i].classificationArr.map(function(v, i) { if (v.checked) return v.play })
                pos[i] = check.filter(function(v, i) { return v != undefined });                
                if (pos[i].length > 0) tplay += g[i].classificationNum + ':' + pos[i].toString() + ' ';

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

<style src="./qxc.css" scoped>

</style>
