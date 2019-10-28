<template src="./K3.html">
    
</template>

<script>
import HistoricalboardComponent from "@/components/games/historicalboard/Historicalboard.vue";
import BettingFieldComponent from "@/components/games/bettingFiled/BetttingField.vue";
import { _getbettime, _payRate } from "@/assets/src/forgame.js";
// 汇入选择游戏组件
import GameChoiceComponent from "@/components/games/gameChoice/GameChoice.vue";
import Option_slideComponent from "@/components/games/option_slide/Option_slide.vue";
import { calPayRate, calPayRate2, combination, uniquearr, randomRangeId, gamestatus,cleartimer} from "@/assets/src/forgame"


//和值 阵列资料，SUM3Arr于下方挂载进data
let SUM3Arr = [];
for (let i = 3; i < 19; i++) {
    SUM3Arr.push({ id: "SUM-" + i, play: i, odds: 0, checked: false });
}
//三同号单选(围骰)
let ThreeAtTripleSArr = [];
for (let i = 1; i < 7; i++) {
    let stingI = i.toString();
    ThreeAtTripleSArr.push({ id: 'ThreeAtTriple-S', name: stingI + stingI + stingI, play: i, odds: 0, checked: false });
}
//三不同号-三不同(标准)
let ThreeAtDiffGArr = []
for (let i = 1; i < 7; i++) {
    ThreeAtDiffGArr.push({ id: 'ThreeAtDiff-G', name: i, play: i, odds: 0, checked: false });
}
//三不同号-三不同(胆拖)
let ThreeAtDiffAArr = [];
let ThreeAtDiffBArr = []
for (let i = 1; i < 7; i++) {
    ThreeAtDiffAArr.push({ id: 'ThreeAtDiff-AB', play: i, odds: 0, checked: false, type: 'A' });
    ThreeAtDiffBArr.push({ id: 'ThreeAtDiff-AB', play: i, odds: 0, checked: false, type: 'B' });
}
//二同号-复选(短牌)
let TwoAtDoubleMArr = [];
for (let i = 1; i < 7; i++) {
    let stingI = i.toString();
    TwoAtDoubleMArr.push({ id: 'TwoAtDouble-M', name: stingI + stingI, play: i, odds: 0, checked: false });
}
//两同号-两同号(单选)
let TwoAtDoubleS0Arr = [];
let TwoAtDoubleS1Arr = [];
for (let i = 1; i < 7; i++) {
    TwoAtDoubleS0Arr.push({ id: 'TwoAtDouble-S', play: i + '' + i, odds: 0, checked: false, type: 'A' });
    TwoAtDoubleS1Arr.push({ id: 'TwoAtDouble-S', play: i, odds: 0, checked: false, type: 'B' });
}
//二不同-标准(长牌)
let TwoAtDiffGArr = [];
for (let i = 1; i < 7; i++) {
    TwoAtDiffGArr.push({ id: 'TwoAtDiff-G', name: i, play: i, odds: 0, checked: false });
}
//两不同号-二不同(胆拖)
let TwoAtDiffAArr = [];
let TwoAtDiffBArr = [];
for (let i = 1; i < 7; i++) {
    TwoAtDiffAArr.push({ id: 'TwoAtDiff-AB', play: i, odds: 0, checked: false, type: 'A' });
    TwoAtDiffBArr.push({ id: 'TwoAtDiff-AB', play: i, odds: 0, checked: false, type: 'B' });
}

export default {
    name: "K3",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
        Option_slideComponent,
    },
    data() {
        return {
            gameMenu: [
                { name: "和值", sub: [{ subName: "和值", gameDes: '至少选择1个和值或型态进行投注，所选和值与开奖的3个号码相加之和相同即中奖。和值3〜10为小，11~18为大，奇数为单，偶数为双' }, { subName: "大小单双", gameDes: '至少选择1个和值或型态进行投注，所选和值与开奖的3个号码相加之和相同即中奖。和值3〜10为小，11~18为大，奇数为单，偶数为双。' }], isShow: true },
                { name: "三同号", sub: [{ subName: "三同号通选(全骰)", gameDes: '对所有相同的三个号码（111,222,...,666）进行投注。' }, { subName: "三同号单选(围骰)", gameDes: '对所有相同的三个号码（111,222,...,666）中任意选择一组号码进行投注。' }], isShow: false },
                { name: "三不同号", sub: [{ subName: "三不同-标准", gameDes: '从1-6中任选3个或多个号码，所选号码与开奖号码的3个号码相同（顺序不限）即中奖。' }, { subName: "三不同-胆拖", gameDes: '从1-6中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。' }], isShow: false },
                { name: "三连号", sub: [{ subName: "号码", gameDes: '对所有三个相连的号码（仅限：123、234、345、456）进行投注' }], isShow: false },
                { name: "两同号", sub: [{ subName: "二同号-复选(短牌)", gameDes: '对三个号码中两个指定的相同号码和一个任意号码进行投注。' }, { subName: "二同号-单选", gameDes: '对三个号码中两个指定的相同号码和一个指定的不同号码进行投注。' }], isShow: false },
                { name: "两不同号", sub: [{ subName: "二不同-标准(长牌)", gameDes: '对三个号码中两个指定的不同号码和一个任意号码进行投注。' }, { subName: "二不同-胆拖", gameDes: '从1-6中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。' }], isShow: false }
            ],
            //和值-和值
            SUM3: SUM3Arr,
            //和值-大小单双
            SUMB: [
                { id: "SUM-B", play: "大", odds: 0, checked: false },
                { id: "SUM-S", play: "小", odds: 0, checked: false },
                { id: "SUM-O", play: "单", odds: 0, checked: false },
                { id: "SUM-E", play: "双", odds: 0, checked: false },
                { id: "SUM-BO", play: "大单", odds: 0, checked: false },
                { id: "SUM-SO", play: "小单", odds: 0, checked: false },
                { id: "SUM-BE", play: "大双", odds: 0, checked: false },
                { id: "SUM-SE", play: "小双", odds: 0, checked: false },
            ],
            //三同号-三同号通选(全骰)ThreeAtTriple-All 
            ThreeAtTripleAll: [
                { id: "ThreeAtTriple-All", play: "三同号通选(全骰)", odds: 0, checked: false }
            ],
            //三同号单选(围骰)ThreeAtTriple-S
            ThreeAtTripleS: ThreeAtTripleSArr,
            //三不同号-三不同(标准)
            ThreeAtDiffG: ThreeAtDiffGArr,
            //三不同号-三不同(胆拖)ThreeAtDiff-AB
            ThreeAtDiffA: ThreeAtDiffAArr,
            ThreeAtDiffB: ThreeAtDiffBArr,
            // 三连号-号码
            ThreeAtStraightAll: [
                { id: "ThreeAtStraight-All", play: "通选", odds: 0, checked: false }
            ],
            //二同号-复选(短牌)TwoAtDouble-M
            TwoAtDoubleM: TwoAtDoubleMArr,
            //两同号-两同号(单选)
            TwoAtDoubleS0: TwoAtDoubleS0Arr,
            TwoAtDoubleS1: TwoAtDoubleS1Arr,
            //二不同-标准(长牌)
            TwoAtDiffG: TwoAtDiffGArr,
            //两不同号-二不同(胆拖)
            TwoAtDiffA: TwoAtDiffAArr,
            TwoAtDiffB: TwoAtDiffBArr,
            danArr: [],
            touArr: [],

            offTitle: 0,
            OffSubTitle: 0,
            option_slide_idx: null,
            payrate: { value: {} },
            time: { value: '' },
            barMax: 0, //--->子组件
            rebatRate: 0, //与子组件双向绑定
            forbet: [], //投注暂存   
            quantity: 0,
            currentName: '', //购物车玩法显示
            issueTrace: true, //是否可追号
            mask:true
        };
    },
    mounted() {
        window.scrollTo(0,0);
        let t = this
        let gameCode = this.$route.params.id
        this.setCookie('currentGameName',encodeURI(this.$route.meta.title),0.5) //safari 不支持存中文 要编码  
        gamestatus(this, gameCode, function(res) {
            if (Object.keys(res).length === 0) {
                alert('维护中')
                t.$router.push({ path: '/index' });
                return;
            }
            //更新vuex 状态
            t.$store.dispatch("updatebetGameCode", gameCode)

            _getbettime(t, gameCode, t.time); //盘口资料
            _payRate(t, gameCode, '1', t.payrate); //赔率
            
        })

    },
    methods: {
        //   监听事件 : 监听玩法选择有无变动，若有则执行FN
        clickOff: function(clickOffValue, clickSubValue) {
            this.offTitle = clickOffValue;
            this.OffSubTitle = clickSubValue;
            this.currentName = this.gameMenu[clickOffValue].sub[clickSubValue].subName
        },

        //监听如果开启选择玩法页面 就取消所有游戏选取
        childByValue: function() {
            let GameType = [
                this.SUM3,
                this.SUMB,
                this.ThreeAtTripleAll,
                this.ThreeAtTripleS,
                this.ThreeAtDiffG,
                this.ThreeAtDiffA,
                this.ThreeAtDiffB,
                this.ThreeAtStraightAll,
                this.TwoAtDoubleM,
                this.TwoAtDoubleS0,
                this.TwoAtDoubleS1,
                this.TwoAtDiffG,
                this.TwoAtDiffA,
                this.TwoAtDiffB,
            ];
            for (let j = 0; j < GameType.length; j++) {
                for (let i = 0; i < GameType[j].length; i++) {
                    GameType[j][i].checked = false;
                }
            }
            this.option_slide_idx = null
            this.quantity = 0
            this.forbet = [] //暂存清空
            this.rebatRate=0
            this.danArr = []
            this.touArr = []
        },
        bundledatainit() { //资料初始
            let _t = this
            let GameType = [
                this.SUM3,
                this.SUMB,
                this.ThreeAtTripleAll,
                this.ThreeAtTripleS,
                this.ThreeAtDiffG,
                this.ThreeAtDiffA,
                this.ThreeAtDiffB,
                this.ThreeAtStraightAll,
                this.TwoAtDoubleM,
                this.TwoAtDoubleS0,
                this.TwoAtDoubleS1,
                this.TwoAtDiffG,
                this.TwoAtDiffA,
                this.TwoAtDiffB,
            ];
            if (Object.keys(this.payrate.value).length > 0) {
                GameType.forEach(function(v, i) {
                    _t.renderdata(v)
                })
            }
            this.mask=false
        },
        renderdata(obj) { //玩法阵列资料绑定
            let _t = this
            obj.forEach(function(v, i) {
                let _p = _t.payrate.value[v.id];
                v.odds = calPayRate(_p, 0);
                v.odds2 = calPayRate2(_p, 0)
                v.playTypeS = _p.playTypeS;
                v.playTypeM = _p.playTypeM;
                _t.barMax = _p.rebatRate
            })

        },
        barrenderdata(obj) { //拉动bar 玩法赔率变动
            let _t = this
            obj.forEach(function(v, i) {
                let _p = _t.payrate.value[v.id];
                v.odds = calPayRate(_p, _t.rebatRate);
                v.odds2 = calPayRate2(_p, _t.rebatRate)
            })
        },
        getQuantity(e, posArr, pos2Arr) {
            switch (e.playTypeS) {
                case 109:
                case 113: //三同号单选(围骰)  二同号-复选(短牌) 
                    return posArr.length
                case 110: //三不同标准
                    return combination(posArr.length, 3)
                case 111:
                case 116: //三不同-胆拖  二不同-胆拖
                    {
                        let _l = 0;
                        if (e.playTypeS == 111) _l = 3
                        else _l = 2

                        var dan = posArr; //膽號
                        var tuo = pos2Arr; //拖號

                        var tuo2 = uniquearr(dan, tuo); //先將拖號裡有重複膽號的去除
                        let len_1 = dan.length;
                        let len_2 = tuo2.length;
                        if (len_1 > 0) {
                            return combination(len_2, _l - len_1);
                        } else {
                            return 0;
                        }
                    }
                case 114:
                    return posArr.length * pos2Arr.length
                case 115: //二不同-标准(长牌)
                    return combination(posArr.length, 2)
                default:
                    return 1;

            }
        },
        //选取的号码
        checkNum(Arr, indx) {
            let _t = this
            let offtitle = this.offTitle
            let OffSubTitle = this.OffSubTitle
            this.forbet = []

            let title2 = ((OffSubTitle == 1 && offtitle == 2) || (OffSubTitle == 1 && offtitle == 5) || (OffSubTitle == 1 && offtitle == 4)) ? true : false

            if (title2) { //胆拖 二同号-单选
                let dan = this.danArr
                let tou = this.touArr

                let limit = offtitle == 2 ? 2 : 1
                let cleardancheck
                let cleartoucheck
                switch (offtitle) {
                    case 2:
                        cleardancheck = this.ThreeAtDiffA[indx];
                        cleartoucheck = this.ThreeAtDiffB[indx]
                        break;
                    case 5:
                        cleardancheck = this.TwoAtDiffA[indx];
                        cleartoucheck = this.TwoAtDiffB[indx]
                        break;
                    case 4:
                        cleardancheck = this.TwoAtDoubleS0[indx];
                        cleartoucheck = this.TwoAtDoubleS1[indx]
                        break;
                }


                if (Arr[0].type === 'A') {

                    if (dan.indexOf(indx) > -1) dan.splice(dan.indexOf(indx), 1)
                    else if (tou.indexOf(indx) > -1) {
                        cleartoucheck.checked = false
                        tou.splice(tou.indexOf(indx), 1)
                        dan.push(indx)
                    } else dan.push(indx)

                    if (dan.length > limit && offtitle != 4) {
                        Arr.forEach(function(v, i) { v.checked = false })
                        dan.shift()
                    }

                    dan.forEach(function(v, i) {
                        Arr[v].checked = true
                    })
                } else {

                    if (tou.indexOf(indx) > -1) tou.splice(tou.indexOf(indx), 1)
                    else if (dan.indexOf(indx) > -1) {
                        cleardancheck.checked = false
                        dan.splice(dan.indexOf(indx), 1)
                        tou.push(indx)
                    } else tou.push(indx)
                    tou.forEach(function(v, i) {
                        Arr[v].checked = true
                    })
                }

                let e = Arr[0]
                let p = ["", "", ""]
                dan = dan.map(function(v, i) { return v = v + 1 }) //dan tou 是放indx position要放号码 所以要+1
                tou = tou.map(function(v, i) { return v = v + 1 })
                p[0] = dan.toString()
                p[1] = tou.toString()
                let q = _t.getQuantity(e, dan, tou) //注数计算

                let tplay = '胆码:' + p[0] + ' 拖码:' + p[1] //购物车显示
                if (offtitle == 4) {
                    let temp = dan.map(function(v, i) { return v.toString() + v.toString() })
                    tplay = '同号:' + temp.toString() + ' 不同号:' + p[1]
                }

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
                    return v.checked == true
                })
                if(this.option_slide_idx==5 && checkedArr.length>0) this.option_slide_idx =null  //點選”清”之後，再點選下方號碼，”清”恢復原樣

                let posArr = [],
                    pos2Arr = [],
                    posNameArr = []
                checkedArr.forEach(function(e, i) {

                    if (offtitle == 0 || offtitle == 3) {
                        //和值
                        //三连号 
                        _t.forbet.push({
                            uid: randomRangeId(10),
                            id: e.id,
                            play: e.play,
                            name: _t.currentName,
                            betMainInfo: {
                                playTypeM: e.playTypeM,
                                playTypeS: e.playTypeS,
                                positions: ["", "", ""],
                                quantity: _t.getQuantity(e),
                                payRate: e.odds,
                                payRate2: e.odds2,
                                rebatRate: _t.rebatRate,
                                unitPrice: 0
                            }
                        })
                    }

                    if (offtitle == 1 ||
                        (offtitle == 2 && OffSubTitle == 0) ||
                        (offtitle == 4 && OffSubTitle == 0) ||
                        (offtitle == 5 && OffSubTitle == 0)
                    ) {
                        let tplay = ''
                        posArr.push(e.play)
                        posNameArr.push(e.name)

                        if (_t.offTitle == 1 && _t.OffSubTitle == 0) { //三同号通选 塞值
                            posArr = [1, 2, 3, 4, 5, 6]
                            tplay = e.play
                        } else
                            tplay = posNameArr.toString()

                        let p = ["", "", ""]
                        p[0] = posArr.toString()
                        let q = _t.getQuantity(e, posArr)

                        if ((checkedArr.length - 1) == i && q > 0) {
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
                    }
                })
            }

            let Plus = 0
            this.forbet.forEach(function(v, i) {
                Plus += v.betMainInfo.quantity
            });

            this.quantity = Plus;
        },
    },
    watch: {
        payrate: {
            deep: true,
            handler(nv, ov) {
                this.bundledatainit()
            }
        },
        rebatRate(nv, ov) {
            let _t = this
            this.rebatRate = nv

            let GameType = [
                [this.SUM3, this.SUMB],
                [this.ThreeAtTripleAll, this.ThreeAtTripleS],
                [this.ThreeAtDiffG, this.ThreeAtDiffA],
                [this.ThreeAtStraightAll],
                [this.TwoAtDoubleM, this.TwoAtDoubleS0],
                [this.TwoAtDiffG, this.TwoAtDiffA]
            ];
            //画面、阵列更新
            this.barrenderdata(GameType[this.offTitle][this.OffSubTitle])

            //已选的下注 更新资料
            if (this.forbet.length > 0) {
                this.forbet.forEach(function(v, i) {
                    let _p = _t.payrate.value[v.id];
                    v.betMainInfo.payRate = calPayRate(_p, nv);
                    v.betMainInfo.payRate2 = calPayRate2(_p, nv)
                    v.betMainInfo.rebatRate = nv
                })
            }
        }
    },
    destroyed() {
        const unWatch = this.$watch('payrate')
        unWatch(); // 手动注销watch
        this.childByValue()        
        cleartimer()
    },
    computed: {
        donotTouch(){
            return this.$store.state.dontTouch
        }
    }

};
</script>

<style src="./K3.css" scoped>

</style>
