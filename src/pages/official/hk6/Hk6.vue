<template src="./Hk6.html">
    
</template>

<script>
import HistoricalboardComponent from "@/components/games/historicalboard/Historicalboard.vue";
import BettingFieldComponent from "@/components/games/bettingFiled/BetttingField.vue";
import { _getbettime, _payRate } from "@/assets/src/forgame.js";
// 汇入选择游戏组件
import GameChoiceComponent from "@/components/games/gameChoice/GameChoice.vue";
import Option_slideComponent from "@/components/games/option_slide/Option_slide.vue";
import { calPayRate, calPayRate2, combination, randomRangeId ,gamestatus,cleartimer } from "@/assets/src/forgame"
import { gamemenu as gamemenujs}  from "./gameMenu"


//特码阵列资料 特码6中1阵列资料，TMArr SixX1Arr于下方挂载进data
let TMArr = [],
    SixX1Arr = [];
for (var i = 1; i < 50; i++) {
    TMArr.push({ id: "Specific-N" + i, play: i, odds: 0, checked: false });
    SixX1Arr.push({ id: "SixX1-N" + i, play: i, odds: 0, checked: false });
}

//特码1-6阵列资料，SixMixArr于下方挂载进data
let SixMixArr = [];
let subname = ["大", "小", "单", "双", "和大", "和小", "和单", "和双", "尾大", "尾小", "红波", "蓝波", "绿波"];
let subEn = ["B", "S", "O", "E", "SB", "SS", "SO", "SE", "LB", "LS", "Red", "Blue", "Green"];
for (var y = 0; y < subname.length; y++) {
    SixMixArr.push({
        id: "SixMix-F1-" + subEn[y],
        play: subname[y],
        odds: 0,
        checked: false
    });
}

//生肖
let zodiacEn = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];

//头尾数资料， TW于下方挂载进data
let tw_1 = [];
for (let i = 0; i < 5; i++) {
    tw_1.push({
        id: "Digits-InTens" + i,
        play: i + "头",
        odds: 0,
        checked: false
    });
}
let tw_2 = [];
for (let i = 0; i <= 9; i++) {
    tw_2.push({
        id: "Digits-InOnes" + i,
        play: i + "尾",
        odds: 0,
        checked: false
    });
}
let shiftNum = tw_2.shift(0);
tw_2.push(shiftNum);
let TWArr = tw_1.concat(tw_2);

// 正特尾数资料， ZTWSArr于下方挂载进data
let ZTWSArr = [];
for (let i = 0; i <= 9; i++) {
    ZTWSArr.push({
        id: "DigitsAll-InOnes" + i,
        play: i + "尾",
        odds: 0,
        checked: false
    });
}

//七码五行资料， QMWHArr于下方挂载进data
let numAry1 = [0, 1, 2, 3, 4, 5, 6, 7];
let numAry2 = [7, 6, 5, 4, 3, 2, 1, 0];
let fiveElementsAry = [
    { id: "Gold", name: "金" },
    { id: "Wood", name: "木" },
    { id: "Water", name: "水" },
    { id: "Fire", name: "火" },
    { id: "Soil", name: "土" }
];
let QMWH1 = [];
let QMWH2 = [];
for (let i = 0; i <= 7; i++) {
    QMWH1.push({
        id: "SevenFive-" + "B" + numAry1[i] + "S" + numAry2[i],
        play: "大" + numAry1[i] + "小" + numAry2[i],
        odds: 0,
        checked: false
    });
}
for (let i = 0; i < 5; i++) {
    QMWH2.push({
        id: "SevenFive-" + fiveElementsAry[i].id,
        play: fiveElementsAry[i].name,
        odds: 0,
        checked: false
    });
}
let QMWHArr = QMWH1.concat(QMWH2);

//连码阵列资料，LMaArr于下方挂载进data
let LMaArr = [];
for (var i = 1; i < 50; i++) {
    LMaArr.push({ id: "AddNum-2", play: i, odds: 0, checked: false });
}
//自选不中阵列资料，ZXBZArr于下方挂载进data
let ZXBZArr = [];
for (var i = 1; i < 50; i++) {
    ZXBZArr.push({ id: "AllOut-5", play: i, odds: 0, checked: false });
}



export default {
    name: "hk6",
    components: {
        HistoricalboardComponent,
        BettingFieldComponent,
        GameChoiceComponent,
        Option_slideComponent,
    },
    data() {
        return {
            gameMenu:gamemenujs,
            // 特碼资料
            TM: TMArr,
            //兩面资料
            LM: [
                { id: "Half-SpecificB", play: "特大", odds: 0, checked: false },
                { id: "Half-SpecificS", play: "特小", odds: 0, checked: false },
                { id: "Half-SpecificO", play: "特单", odds: 0, checked: false },
                { id: "Half-SpecificE", play: "特双", odds: 0, checked: false },
                { id: "Half-SumB", play: "和大", odds: 0, checked: false },
                { id: "Half-SumS", play: "和小", odds: 0, checked: false },
                { id: "Half-SumO", play: "和单", odds: 0, checked: false },
                { id: "Half-SumE", play: "和双", odds: 0, checked: false },
                { id: "Half-TotalB", play: "总大", odds: 0, checked: false },
                { id: "Half-TotalS", play: "总小", odds: 0, checked: false },
                { id: "Half-TotalO", play: "总单", odds: 0, checked: false },
                { id: "Half-TotalE", play: "总双", odds: 0, checked: false }
            ],
            //正碼6中1资料
            SixX1: SixX1Arr,
            //正碼1-6資料
            SixMixArr,
            //色波資料
            SB: [
                { id: "Color-Red", play: "红波", odds: 0, checked: false },
                { id: "Color-Blue", play: "蓝波", odds: 0, checked: false },
                { id: "Color-Green", play: "绿波", odds: 0, checked: false }
            ],
            //半波
            BB: [
                { id: "ColorHalf-RedB", play: "红大", odds: 0, checked: false },
                { id: "ColorHalf-RedS", play: "红小", odds: 0, checked: false },
                { id: "ColorHalf-RedO", play: "红单", odds: 0, checked: false },
                { id: "ColorHalf-RedE", play: "红双", odds: 0, checked: false },
                { id: "ColorHalf-BlueB", play: "蓝大", odds: 0, checked: false },
                { id: "ColorHalf-BlueS", play: "蓝小", odds: 0, checked: false },
                { id: "ColorHalf-BlueO", play: "蓝单", odds: 0, checked: false },
                { id: "ColorHalf-BlueE", play: "蓝双", odds: 0, checked: false },
                { id: "ColorHalf-GreenB", play: "绿大", odds: 0, checked: false },
                { id: "ColorHalf-GreenS", play: "绿小", odds: 0, checked: false },
                { id: "ColorHalf-GreenO", play: "绿单", odds: 0, checked: false },
                { id: "ColorHalf-GreenE", play: "绿双", odds: 0, checked: false }
            ],
            //半半波
            BBB: [
                { id: "ColorQuarter-RedBO", play: "红大单", odds: 0, checked: false },
                { id: "ColorQuarter-RedBE", play: "红大双", odds: 0, checked: false },
                { id: "ColorQuarter-RedSO", play: "红小单", odds: 0, checked: false },
                { id: "ColorQuarter-RedSE", play: "红小双", odds: 0, checked: false },
                { id: "ColorQuarter-BlueBO", play: "蓝大单", odds: 0, checked: false },
                { id: "ColorQuarter-BlueBE", play: "蓝大双", odds: 0, checked: false },
                { id: "ColorQuarter-BlueSO", play: "蓝小单", odds: 0, checked: false },
                { id: "ColorQuarter-BlueSE", play: "蓝小双", odds: 0, checked: false },
                { id: "ColorQuarter-GreenBO", play: "绿大单", odds: 0, checked: false },
                { id: "ColorQuarter-GreenBE", play: "绿大双", odds: 0, checked: false },
                { id: "ColorQuarter-GreenSO", play: "绿小单", odds: 0, checked: false },
                { id: "ColorQuarter-GreenSE", play: "绿小双", odds: 0, checked: false }
            ],
            //七色波资料
            QSB: [
                { id: "ColorSeven-Red", play: "红波", odds: 0, checked: false },
                { id: "ColorSeven-Blue", play: "蓝波", odds: 0, checked: false },
                { id: "ColorSeven-Green", play: "绿波", odds: 0, checked: false },
                { id: "ColorSeven-Tie", play: "和局", odds: 0, checked: false }
            ],
            // 生肖资料
            Zodiac: [
                { id: "Zodiac-Rat", play: "鼠", odds: 0, checked: false, imgURL: require("@/assets/img/icon_mouse.svg") },
                { id: "Zodiac-Ox", play: "牛", odds: 0, checked: false, imgURL: require("@/assets/img/icon_cattle.svg") },
                { id: "Zodiac-Tiger", play: "虎", odds: 0, checked: false, imgURL: require("@/assets/img/icon_tiger.svg") },
                { id: "Zodiac-Rabbit", play: "兔", odds: 0, checked: false, imgURL: require("@/assets/img/icon_rabbit.svg") },
                { id: "Zodiac-Dragon", play: "龙", odds: 0, checked: false, imgURL: require("@/assets/img/icon_dragon.svg") },
                { id: "Zodiac-Snake", play: "蛇", odds: 0, checked: false, imgURL: require("@/assets/img/icon_snake.svg") },
                { id: "Zodiac-Horse", play: "马", odds: 0, checked: false, imgURL: require("@/assets/img/icon_horse.svg") },
                { id: "Zodiac-Goat", play: "羊", odds: 0, checked: false, imgURL: require("@/assets/img/icon_sheep.svg") },
                { id: "Zodiac-Monkey", play: "猴", odds: 0, checked: false, imgURL: require("@/assets/img/icon_monkey.svg") },
                { id: "Zodiac-Rooster", play: "鸡", odds: 0, checked: false, imgURL: require("@/assets/img/icon_chicken.svg") },
                { id: "Zodiac-Dog", play: "狗", odds: 0, checked: false, imgURL: require("@/assets/img/icon_dog.svg") },
                { id: "Zodiac-Pig", play: "猪", odds: 0, checked: false, imgURL: require("@/assets/img/icon_pig.svg") }
            ],
            //总肖资料
            ZX: [
                { id: "ZodiacAllCounts-Equal234", play: "234肖", odds: 0, checked: false },
                { id: "ZodiacAllCounts-Equal5", play: "5肖", odds: 0, checked: false },
                { id: "ZodiacAllCounts-Equal6", play: "6肖", odds: 0, checked: false },
                { id: "ZodiacAllCounts-Equal7", play: "7肖", odds: 0, checked: false },
                { id: "ZodiacAllCounts-Odd", play: "单", odds: 0, checked: false },
                { id: "ZodiacAllCounts-Even", play: "双", odds: 0, checked: false }
            ],
            //头尾数資料
            TWArr,
            //正特尾数資料
            ZTWSArr,
            //七码五行資料
            QMWHArr,
            //连码資料
            LMatitle: ['二全中', '三全中', '四全中', '三中二', '二中特', '特串'],
            LMaArr,
            //连肖资料
            LSTitle: ['二肖连', '三肖连', '四肖连', '五肖连'],
            LS: [
                { id: "AddZodiac-2", name: "鼠", odds: 0, checked: false, imgURL: require("@/assets/img/icon_mouse.svg"), play: 0 },
                { id: "AddZodiac-2", name: "牛", odds: 0, checked: false, imgURL: require("@/assets/img/icon_cattle.svg"), play: 1 },
                { id: "AddZodiac-2", name: "虎", odds: 0, checked: false, imgURL: require("@/assets/img/icon_tiger.svg"), play: 2 },
                { id: "AddZodiac-2", name: "兔", odds: 0, checked: false, imgURL: require("@/assets/img/icon_rabbit.svg"), play: 3 },
                { id: "AddZodiac-2", name: "龙", odds: 0, checked: false, imgURL: require("@/assets/img/icon_dragon.svg"), play: 4 },
                { id: "AddZodiac-2", name: "蛇", odds: 0, checked: false, imgURL: require("@/assets/img/icon_snake.svg"), play: 5 },
                { id: "AddZodiac-2", name: "马", odds: 0, checked: false, imgURL: require("@/assets/img/icon_horse.svg"), play: 6 },
                { id: "AddZodiac-2", name: "羊", odds: 0, checked: false, imgURL: require("@/assets/img/icon_sheep.svg"), play: 7 },
                { id: "AddZodiac-2", name: "猴", odds: 0, checked: false, imgURL: require("@/assets/img/icon_monkey.svg"), play: 8 },
                { id: "AddZodiac-2", name: "鸡", odds: 0, checked: false, imgURL: require("@/assets/img/icon_chicken.svg"), play: 9 },
                { id: "AddZodiac-2", name: "狗", odds: 0, checked: false, imgURL: require("@/assets/img/icon_dog.svg"), play: 10 },
                { id: "AddZodiac-2", name: "猪", odds: 0, checked: false, imgURL: require("@/assets/img/icon_pig.svg"), play: 11 }
            ],
            //连尾资料
            LWTitle: ['二尾碰', '三尾碰', '四尾碰', '五尾碰'],
            LW: [
                { id: 'AddDigitsInOnes-2', name: '尾0', odds: 0, checked: false, play: 0 },
                { id: 'AddDigitsInOnes-2', name: '尾1', odds: 0, checked: false, play: 1 },
                { id: 'AddDigitsInOnes-2', name: '尾2', odds: 0, checked: false, play: 2 },
                { id: 'AddDigitsInOnes-2', name: '尾3', odds: 0, checked: false, play: 3 },
                { id: 'AddDigitsInOnes-2', name: '尾4', odds: 0, checked: false, play: 4 },
                { id: 'AddDigitsInOnes-2', name: '尾5', odds: 0, checked: false, play: 5 },
                { id: 'AddDigitsInOnes-2', name: '尾6', odds: 0, checked: false, play: 6 },
                { id: 'AddDigitsInOnes-2', name: '尾7', odds: 0, checked: false, play: 7 },
                { id: 'AddDigitsInOnes-2', name: '尾8', odds: 0, checked: false, play: 8 },
                { id: 'AddDigitsInOnes-2', name: '尾9', odds: 0, checked: false, play: 9 },
            ],
            //自选不中
            ZXBZTitle: ['五不中', '六不中', '七不中', '八不中', '九不中', '十不中', '十一不中', '十二不中', ],
            ZXBZArr,
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
            issueTrace:false, //是否可追号
            mask:true
        };
    },
    mounted() {
        window.scrollTo(0,0);
        let t = this         
        let gameCode = this.$route.params.id;
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
                this.TM,
                this.LM,
                this.SixX1,
                this.SixMixArr,
                this.SB,
                this.BB,
                this.BBB,
                this.QSB,
                this.Zodiac,
                this.ZX,
                this.TWArr,
                this.ZTWSArr,
                this.QMWHArr,
                this.LMaArr,
                this.LS,
                this.LW,
                this.ZXBZArr,
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
        },
        bundledatainit() { //资料初始
            let _t = this
            let GameType = [
                this.TM,
                this.LM,
                this.SixX1,
                this.SixMixArr,
                this.SB,
                this.BB,
                this.BBB,
                this.QSB,
                this.Zodiac,
                this.ZX,
                this.TWArr,
                this.ZTWSArr,
                this.QMWHArr,
                this.LMaArr,
                this.LS,
                this.LW,
                this.ZXBZArr,
            ];
            if (Object.keys(this.payrate.value).length > 0) {
                GameType.forEach(function(v, i) {
                    _t.renderdata(v)
                })
            }
            this.mask=false
        },
        // 彩球颜色判定;彩球数字判定(特码+特码6中1);
        getcolor(number) {
            var red = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46];
            var blue = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48];
            var green = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49];

            var css = "redback";
            if (red.indexOf(parseInt(number)) > -1) css = "redback";
            if (blue.indexOf(parseInt(number)) > -1) css = "blueback";
            if (green.indexOf(parseInt(number)) > -1) css = "greenback";

            return css;
        }, //色波背景判定
        bobackground(str) {
            if (str.indexOf('Red') > 0)
                return 'big-redback'
            else if (str.indexOf('Blue') > 0)
                return 'big-blueback'
            else if (str.indexOf('Green') > 0)
                return 'big-greenback'
            else if (str.indexOf('Tie') > 0)
                return 'big-noneback'
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
        getQuantity(e, posArr) {
            switch (e.playTypeS) {
                case 545:
                case 546:
                case 547:
                case 548:
                case 552:
                    { //二全中 二中特 特串 二连肖 二尾碰                        
                        return combination(posArr.length, 2);
                    }
                case 543:
                case 544:
                case 549:
                case 553:
                    { //三全中 三中二 三连肖 三尾碰
                        return combination(posArr.length, 3);
                    }
                case 542:
                case 550:
                case 554:
                    { //四全中 四连肖 四尾碰
                        return combination(posArr.length, 4);
                    }
                case 551:
                case 556:
                case 555:
                    { //五连肖、五不中 五尾碰
                        return combination(posArr.length, 5);
                    }
                case 557:
                    { //六不中
                        return combination(posArr.length, 6);
                    }
                case 558:
                    { //七不中
                        return combination(posArr.length, 7);
                    }
                case 559:
                    { //八不中
                        return combination(posArr.length, 8);
                    }
                case 560:
                    { //九不中
                        return combination(posArr.length, 9);
                    }
                case 561:
                    { //十不中
                        return combination(posArr.length, 10);
                    }
                case 562:
                    { //十一不中
                        return combination(posArr.length, 11);
                    }
                case 563:
                    { //十二不中
                        return combination(posArr.length, 12);
                    }
                default:
                    return 1;

            }
        },
        //选取的号码
        checkNum(Arr) {
            let _t = this
            this.forbet = []
            let checkedArr = Arr.filter(function(v, i) {
                return v.checked == true
            })
            
            if(this.option_slide_idx==5 && checkedArr.length>0) this.option_slide_idx =null  //點選”清”之後，再點選下方號碼，”清”恢復原樣
            let posArr = [],posCnArr=[]
            checkedArr.forEach(function(e, i) {
                switch (_t.offTitle) {                    
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        posArr.push(e.play)
                        posCnArr.push(e.name)
                        let q = _t.getQuantity(e, posArr)
                        let p = ["", "", "", "", "", "", "", ""]
                        p[0] = posArr.toString()

                        let tplay=p[0];
                        if(_t.offTitle==16){
                            //连肖position是放数字
                            //这里给购物篮显示用
                            tplay = posCnArr.toString()
                        }

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
                        break;
                    default:
                        _t.forbet.push({
                            uid: randomRangeId(10),
                            id: e.id,
                            play: e.play,
                            name: _t.currentName,
                            betMainInfo: {
                                playTypeM: e.playTypeM,
                                playTypeS: e.playTypeS,
                                positions: ["", "", "", "", "", "", "", ""],
                                quantity: _t.getQuantity(e),
                                payRate: e.odds,
                                payRate2: e.odds2,
                                rebatRate: _t.rebatRate,
                                unitPrice: 0
                            }
                        })
                        break;
                }
            })

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
        offTitle: function() {
            let _this = this;
            switch (this.offTitle) {
                case 3:
                    {
                        //正码1-6阵列变动
                        this.SixMixArr.forEach(function(v, i) {
                            v.id = "SixMix-F" + (_this.OffSubTitle + 1) + "-" + subEn[i];
                        });
                        this.renderdata(this.SixMixArr)

                    }
                    break;
                case 8: //生肖阵列变动
                    {
                        this.Zodiac.forEach(function(v, i) {
                            v.id = "Zodiac-" + zodiacEn[i];
                        });
                        this.renderdata(this.Zodiac)

                    }
                    break;
                case 9: //正肖阵列变动
                    {
                        this.Zodiac.forEach(function(v, i) {
                            v.id = "ZodiacSix-" + zodiacEn[i];
                        });
                        this.renderdata(this.Zodiac)
                    }
                    break;
                case 10: //一肖阵列变动
                    {
                        this.Zodiac.forEach(function(v, i) {
                            v.id = "ZodiacAll-" + zodiacEn[i];
                        });
                        this.renderdata(this.Zodiac)
                    }
                    break;
                case 15: //连码-二全中阵列变动
                    {
                        this.oddsmask = 1
                        this.LMaArr.forEach(function(v, i) {
                            v.id = "AddNum-2";
                        });
                        this.renderdata(this.LMaArr)

                    }
                    break;
                case 16: //连肖-二肖连阵列变动
                    {
                        this.LS.forEach(function(v, i) {
                            v.id = "AddZodiac-2";
                        });
                        this.renderdata(this.LS)

                    }
                    break;
                case 17: //连尾-二连碰阵列变动
                    {
                        this.LW.forEach(function(v, i) {
                            v.id = "AddDigitsInOnes-2";
                        });
                        this.renderdata(this.LW)

                    }
                    break;
                case 18: //自选不中-五不中阵列变动
                    {
                        this.ZXBZArr.forEach(function(v, i) {
                            v.id = "AllOut-5";
                        });
                        this.renderdata(this.ZXBZArr)

                    }
                    break;
            }
        },

        OffSubTitle: function() {
            let _this = this;
            switch (this.offTitle) {
                case 3:
                    {
                        //正码1-6阵列变动
                        this.SixMixArr.forEach(function(v, i) {
                            v.id = "SixMix-F" + (_this.OffSubTitle + 1) + "-" + subEn[i];
                        });
                        this.renderdata(this.SixMixArr)

                    }
                    break;
                case 15:
                    {
                        //连码阵列变动
                        if (this.OffSubTitle == 0) {
                            this.LMaArr.forEach(function(v, i) {
                                v.id = "AddNum-2";
                            });
                        }
                        if (this.OffSubTitle == 1) {
                            this.LMaArr.forEach(function(v, i) {
                                v.id = "AddNum-3";
                            });
                        }
                        if (this.OffSubTitle == 2) {
                            this.LMaArr.forEach(function(v, i) {
                                v.id = "AddNum-4";
                            });
                        }
                        if (this.OffSubTitle == 3) {
                            this.LMaArr.forEach(function(v, i) {
                                v.id = "AddNum-3in2";
                            });
                        }
                        if (this.OffSubTitle == 4) {
                            this.LMaArr.forEach(function(v, i) {
                                v.id = "AddNum-2S";
                            });
                        }
                        if (this.OffSubTitle == 5) {
                            this.LMaArr.forEach(function(v, i) {
                                v.id = "AddNum-S";
                            });
                        }
                        this.renderdata(this.LMaArr)
                    }
                    break;
                case 16:
                    {
                        //连肖阵列变动
                        if (this.OffSubTitle == 0) {
                            this.LS.forEach(function(v, i) {
                                v.id = "AddZodiac-2";
                            });
                        }
                        if (this.OffSubTitle == 1) {
                            this.LS.forEach(function(v, i) {
                                v.id = "AddZodiac-3";
                            });
                        }
                        if (this.OffSubTitle == 2) {
                            this.LS.forEach(function(v, i) {
                                v.id = "AddZodiac-4";
                            });
                        }
                        if (this.OffSubTitle == 3) {
                            this.LS.forEach(function(v, i) {
                                v.id = "AddZodiac-5";
                            });
                        }
                        this.renderdata(this.LS)                        
                    }
                    break;
                case 17:
                    {
                        //连尾阵列变动
                        if (this.OffSubTitle == 0) {
                            this.LW.forEach(function(v, i) {
                                v.id = "AddDigitsInOnes-2";
                            });
                        }
                        if (this.OffSubTitle == 1) {
                            this.LW.forEach(function(v, i) {
                                v.id = "AddDigitsInOnes-3";
                            });
                        }
                        if (this.OffSubTitle == 2) {
                            this.LW.forEach(function(v, i) {
                                v.id = "AddDigitsInOnes-4";
                            });
                        }
                        if (this.OffSubTitle == 3) {
                            this.LW.forEach(function(v, i) {
                                v.id = "AddZodiac-5";
                            });
                        }
                        this.renderdata(this.LW)                        
                    }
                    break;
                case 18:
                    {
                        //连码阵列变动
                        if (this.OffSubTitle == 0) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-5";
                            });
                        }
                        if (this.OffSubTitle == 1) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-6";
                            });
                        }
                        if (this.OffSubTitle == 2) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-7";
                            });
                        }
                        if (this.OffSubTitle == 3) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-8";
                            });
                        }
                        if (this.OffSubTitle == 4) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-9";
                            });
                        }
                        if (this.OffSubTitle == 5) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-10";
                            });
                        }
                        if (this.OffSubTitle == 6) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-11";
                            });
                        }
                        if (this.OffSubTitle == 7) {
                            this.ZXBZArr.forEach(function(v, i) {
                                v.id = "AllOut-12";
                            });
                        }
                        this.renderdata(this.ZXBZArr)                        
                    }
                    break;
            }
        },
        rebatRate(nv, ov) {
            let _t = this
            this.rebatRate = nv

            let GameType = [
                this.TM,
                this.LM,
                this.SixX1,
                this.SixMixArr,
                this.SB,
                this.BB,
                this.BBB,
                this.QSB,
                this.Zodiac,
                this.Zodiac,
                this.Zodiac,
                this.ZX,
                this.TWArr,
                this.ZTWSArr,
                this.QMWHArr,
                this.LMaArr,
                this.LS,
                this.LW,
                this.ZXBZArr,
            ];
            //画面、阵列更新
            this.barrenderdata(GameType[this.offTitle])

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

<style src="./Hk6.css" scoped>

</style>
