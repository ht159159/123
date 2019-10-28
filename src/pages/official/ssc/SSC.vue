<template src="./SSC.html">
    
</template>

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
    computeAllHeZhuCount,
    computeAllKdZhuCount,
    computeZxHeZhuCount,
} from "@/assets/src/forgame";
import { debug } from 'util';

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
for (let i = 0; i < 10; i++) {
    arr10.push(i);
}
//arr 6
let arr6 = [];
for (let i = 1; i < 7; i++) {
    arr6.push(i);
}
//bsoe
let bsoe = ["大", "小", "单", "双"];
let ebsoe = ['B', 'S', 'O', 'E'];

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
            gameMenu: [{
                    name: "定位",
                    sub: [{
                        subName: "定位胆",
                        shortName: "Fixed-P",
                        oddsArr: [{ id: "Fixed-P", odds: 0 }],
                        optionSlide: true,
                        gameDes: "在万位、千位、百位、十位、个位任意位置上选择1个或1个以上号码。",
                        classification: [{
                                classificationNum: "万位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
                                classificationNum: "千位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
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
                    name: "大小单双",
                    sub: [{
                            subName: "前二大小单双",
                            shortName: "BSOE-F2",
                            oddsArr: [{ id: "BSOE-F2", odds: 0 }],
                            optionSlide: false,
                            gameDes: "从万位、千位中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(bsoe)
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(bsoe)
                                }
                            ]
                        },
                        {
                            subName: "后二大小单双",
                            shortName: "BSOE-L2",
                            oddsArr: [{ id: "BSOE-L2", odds: 0 }],
                            optionSlide: false,
                            gameDes: "从十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "十位",
                                    classificationArr: this.arrCreated(bsoe)
                                },
                                {
                                    classificationNum: "个位",
                                    classificationArr: this.arrCreated(bsoe)
                                }
                            ]
                        },
                        {
                            subName: "前三大小单双",
                            shortName: "BSOE-F3",
                            oddsArr: [{ id: "BSOE-F3", odds: 0 }],
                            optionSlide: false,
                            gameDes: "从万位、千位、百位中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(bsoe)
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(bsoe)
                                },
                                {
                                    classificationNum: "百位",
                                    classificationArr: this.arrCreated(bsoe)
                                }
                            ]
                        },
                        {
                            subName: "后三大小单双",
                            shortName: "BSOE-L3",
                            oddsArr: [{ id: "BSOE-L3", odds: 0 }],
                            optionSlide: false,
                            gameDes: "从百位、十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
                            classification: [{
                                    classificationNum: "百位",
                                    classificationArr: this.arrCreated(bsoe)
                                },
                                {
                                    classificationNum: "十位",
                                    classificationArr: this.arrCreated(bsoe)
                                },
                                {
                                    classificationNum: "个位",
                                    classificationArr: this.arrCreated(bsoe)
                                }
                            ]
                        }
                    ]
                },
                {
                    open: this.$route.params.id == 'txffc' ? false : true,
                    name: "5星",
                    sub: [{
                        subName: "五星复式",
                        shortName: "N5-P",
                        oddsArr: [{ id: "N5-P", odds: 0 }],
                        optionSlide: true,
                        gameDes: "从万位、千位、百位、十位、个位各选一个号码组成一注。",
                        classification: [{
                                classificationNum: "万位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
                                classificationNum: "千位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
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
                    open: this.$route.params.id == 'txffc' ? false : true,
                    name: "4星",
                    sub: [{
                        subName: "四星复式",
                        shortName: "N4-P",
                        oddsArr: [{ id: "N4-P", odds: 0 }],
                        optionSlide: true,
                        gameDes: "从千位、百位、十位、个位各选一个号码组成一注。",
                        classification: [{
                                classificationNum: "千位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            },
                            {
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
                    name: "后3",
                    sub: [{
                            subName: "后三直选复式",
                            shortName: "L3-P",
                            oddsArr: [{ id: "L3-P", odds: 0 }],
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
                            subName: "后三组合",
                            shortName: "L3-P-C",
                            oddsArr: [{ id: "L3-P-C", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从百位、十位、个位各选一个号码组成三注。",
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
                            subName: "后三直选和值",
                            shortName: "L3-P-Sum",
                            oddsArr: [{ id: "L3-P-Sum", odds: 0 }],
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
                            subName: "后三跨度",
                            shortName: "L3-P-Diff",
                            oddsArr: [{ id: "L3-P-Diff", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "跨度",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后三组三",
                            shortName: "L3-C3",
                            oddsArr: [{ id: "L3-C3", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "组三",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后三组六",
                            shortName: "L3-C6",
                            oddsArr: [{ id: "L3-C6", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中任意选择3个或3个以上号码。",
                            classification: [{
                                classificationNum: "组六",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后三组选和值",
                            shortName: "L3-C-Sum",
                            oddsArr: [{ id: "L3-C-Sum", odds: 0 }],
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
                            subName: "后三组选包胆",
                            shortName: "L3-C-Correct",
                            oddsArr: [{ id: "L3-C-Correct", odds: 0 }],
                            optionSlide: false,
                            gameDes: "从0-9中选择1个号码。",
                            classification: [{
                                classificationNum: "包胆",
                                classificationArr: this.arrCreated(arr10)
                            }]
                        },
                        {
                            subName: "后三和值尾数",
                            shortName: "L3-Sum-DigitInOnes",
                            oddsArr: [{ id: "L3-Sum-DigitInOnes", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个号码。",
                            classification: [{
                                classificationNum: "和值尾数",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "豹子",
                            shortName: "L3-S-Triple",
                            oddsArr: [{ id: "L3-S-Triple", odds: 0 }],
                            optionSlide: false,
                            gameDes: "选择一个号码形态。",
                            classification: [{
                                classificationNum: "",
                                classificationArr: this.arrCreated(["豹子"])
                            }]
                        },
                        {
                            subName: "顺子",
                            shortName: "L3-S-Straight",
                            oddsArr: [{ id: "L3-S-Straight", odds: 0 }],
                            optionSlide: false,
                            gameDes: "选择一个号码形态。",
                            classification: [{
                                classificationNum: "",
                                classificationArr: this.arrCreated(["顺子"])
                            }]
                        },
                        {
                            subName: "对子",
                            shortName: "L3-S-Double",
                            oddsArr: [{ id: "L3-S-Double", odds: 0 }],
                            optionSlide: false,
                            gameDes: "选择一个号码形态。",
                            classification: [{
                                classificationNum: "",
                                classificationArr: this.arrCreated(["对子"])
                            }]
                        }
                    ]
                },
                {
                    name: "前3",
                    sub: [{
                            subName: "前三直选复式",
                            shortName: "F3-P",
                            oddsArr: [{ id: "F3-P", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从万位、千位、百位各选一个号码组成一注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "百位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "前三组合",
                            shortName: "F3-P-C",
                            oddsArr: [{ id: "F3-P-C", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从万位、千位、百位各选一个号码组成三注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "百位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "前三直选和值",
                            shortName: "F3-P-Sum",
                            oddsArr: [{ id: "F3-P-Sum", odds: 0 }],
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
                            subName: "前三跨度",
                            shortName: "F3-P-Diff",
                            oddsArr: [{ id: "F3-P-Diff", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "跨度",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前三组三",
                            shortName: "F3-C3",
                            oddsArr: [{ id: "F3-C3", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "组三",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前三组六",
                            shortName: "F3-C6",
                            oddsArr: [{ id: "F3-C6", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中任意选择3个或3个以上号码。",
                            classification: [{
                                classificationNum: "组六",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前三组选和值",
                            shortName: "F3-C-Sum",
                            oddsArr: [{ id: "F3-C-Sum", odds: 0 }],
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
                            subName: "前三组选包胆",
                            shortName: "F3-C-Correct",
                            oddsArr: [{ id: "F3-C-Correct", odds: 0 }],
                            optionSlide: false,
                            gameDes: "从0-9中选择1个号码。",
                            classification: [{
                                classificationNum: "包胆",
                                classificationArr: this.arrCreated(arr10)
                            }]
                        },
                        {
                            subName: "前三和值尾数",
                            shortName: "F3-Sum-DigitInOnes",
                            oddsArr: [{ id: "F3-Sum-DigitInOnes", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个号码。",
                            classification: [{
                                classificationNum: "和值尾数",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "豹子",
                            shortName: "F3-S-Triple",
                            oddsArr: [{ id: "F3-S-Triple", odds: 0 }],
                            optionSlide: false,
                            gameDes: "选择一个号码形态。",
                            classification: [{
                                classificationNum: "",
                                classificationArr: this.arrCreated(["豹子"])
                            }]
                        },
                        {
                            subName: "顺子",
                            shortName: "F3-S-Straight",
                            oddsArr: [{ id: "F3-S-Straight", odds: 0 }],
                            optionSlide: false,
                            gameDes: "选择一个号码形态。",
                            classification: [{
                                classificationNum: "",
                                classificationArr: this.arrCreated(["顺子"])
                            }]
                        },
                        {
                            subName: "对子",
                            shortName: "F3-S-Double",
                            oddsArr: [{ id: "F3-S-Double", odds: 0 }],
                            optionSlide: false,
                            gameDes: "选择一个号码形态。",
                            classification: [{
                                classificationNum: "",
                                classificationArr: this.arrCreated(["对子"])
                            }]
                        }
                    ]
                },
                {
                    name: "前2",
                    sub: [{
                            subName: "前二直选复式",
                            shortName: "F2-P",
                            oddsArr: [{ id: "F2-P", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从万位、千位中至少各选1个号码组成一注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                            ]
                        },
                        {
                            subName: "前二直选和值",
                            shortName: "F2-P-Sum",
                            oddsArr: [{ id: "F2-P-Sum", odds: 0 }],
                            contentStyle: "gameContent2",
                            optionSlide: true,
                            gameDes: "从0-18中任意选择1个或1个以上的和值号码。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr18),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前二直选跨度",
                            shortName: "F2-P-Diff",
                            oddsArr: [{ id: "F2-P-Diff", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "跨度",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前二组选复式",
                            shortName: "F2-C",
                            oddsArr: [{ id: "F2-C", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中任意选择2个或2个以上号码。",
                            classification: [{
                                classificationNum: "组选",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前二组选和值",
                            shortName: "F2-C-Sum",
                            oddsArr: [{ id: "F2-C-Sum", odds: 0 }],
                            contentStyle: "gameCOntent2",
                            optionSlide: true,
                            gameDes: "从1-17中任意选择1个或1个以上号码。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr17),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前二组选包胆",
                            shortName: "F2-C-Correct",
                            oddsArr: [{ id: "F2-C-Correct", odds: 0 }],
                            optionSlide: false,
                            gameDes: "从0-9中选择1个号码。",
                            classification: [{
                                classificationNum: "包胆",
                                classificationArr: this.arrCreated(arr10)
                            }]
                        }
                    ]
                },
                {
                    name: "不定位",
                    sub: [{
                            subName: "前三一码不定胆",
                            shortName: "Unfixed-F3x1",
                            oddsArr: [{ id: "Unfixed-F3x1", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前三二码不定胆",
                            shortName: "Unfixed-F3x2",
                            oddsArr: [{ id: "Unfixed-F3x2", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择2个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后三一码不定胆",
                            shortName: "Unfixed-L3x1",
                            oddsArr: [{ id: "Unfixed-L3x1", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后三二码不定胆",
                            shortName: "Unfixed-L3x2",
                            oddsArr: [{ id: "Unfixed-L3x2", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择2个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前四一码不定胆",
                            shortName: "Unfixed-F4x1",
                            oddsArr: [{ id: "Unfixed-F4x1", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "前四二码不定胆",
                            shortName: "Unfixed-F4x2",
                            oddsArr: [{ id: "Unfixed-F4x2", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择2个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后四一码不定胆",
                            shortName: "Unfixed-L4x1",
                            oddsArr: [{ id: "Unfixed-L4x1", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "后四二码不定胆",
                            shortName: "Unfixed-L4x2",
                            oddsArr: [{ id: "Unfixed-L4x2", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择2个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "五星一码不定胆",
                            shortName: "Unfixed-N5x1",
                            oddsArr: [{ id: "Unfixed-N5x1", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择1个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "五星二码不定胆",
                            shortName: "Unfixed-N5x2",
                            oddsArr: [{ id: "Unfixed-N5x2", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择2个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "五星三码不定胆",
                            shortName: "Unfixed-N5x3",
                            oddsArr: [{ id: "Unfixed-N5x3", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从0-9中选择3个以上号码。",
                            classification: [{
                                classificationNum: "不定位",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        }
                    ]
                },
                {
                    name: "任选2",
                    sub: [{
                            subName: "任二直选复式",
                            shortName: "AC2-P",
                            oddsArr: [{ id: "AC2-P", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少两位上各选1个号码组成一注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
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
                            subName: "任二直选和值",
                            shortName: "AC2-P-Sum",
                            oddsArr: [{ id: "AC2-P-Sum", odds: 0 }],
                            contentStyle: "gameContnet2",
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr18),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任二组选复式",
                            shortName: "AC2-C",
                            oddsArr: [{ id: "AC2-C", odds: 0 }],
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择两个位置,号码区至少选择两个号码构成一注。",
                            classification: [{
                                classificationNum: "组选",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任二组选和值",
                            shortName: "AC2-C-Sum",
                            oddsArr: [{ id: "AC2-C-Sum", odds: 0 }],
                            contentStyle: "gameContent2",
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr17),
                                option_slide_idx: null
                            }]
                        }
                    ]
                },
                {
                    open: this.$route.params.id == 'txffc' ? false : true,
                    name: "任选3",
                    sub: [{
                            subName: "任三直选复式",
                            shortName: "AC3-P",
                            oddsArr: [{ id: "AC3-P", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
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
                            subName: "任三直选和值",
                            shortName: "AC3-P-Sum",
                            oddsArr: [{ id: "AC3-P-Sum", odds: 0 }],
                            contentStyle: "gameContent2",
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr28),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任三组三复式",
                            shortName: "AC3-C3",
                            oddsArr: [{ id: "AC3-C3", odds: 0 }],
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择两个号码构成一注。",
                            classification: [{
                                classificationNum: "组三",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任三组六复式",
                            shortName: "AC3-C6",
                            oddsArr: [{ id: "AC3-C6", odds: 0 }],
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择三个号码构成一注。",
                            classification: [{
                                classificationNum: "组六",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任三组选和值",
                            shortName: "AC3-C-Sum",
                            oddsArr: [{ id: "AC3-C-Sum", odds: 0 }],
                            contentStyle: "gameContent2",
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注。",
                            classification: [{
                                classificationNum: "和值",
                                classificationArr: this.arrCreated(arr26),
                                option_slide_idx: null
                            }]
                        }
                    ]
                },
                {
                    name: "任选4",
                    sub: [{
                            subName: "任四直选复式",
                            shortName: "AC4-P",
                            oddsArr: [{ id: "AC4-P", odds: 0 }],
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注。",
                            classification: [{
                                    classificationNum: "万位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "千位",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
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
                            subName: "任四组选24",
                            shortName: "AC4-C24",
                            oddsArr: [{ id: "AC4-C24", odds: 0 }],
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择四个位置,号码区至少选择四个号码构成一注。",
                            classification: [{
                                classificationNum: "组选24",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任四组选12",
                            shortName: "AC4-C12",
                            oddsArr: [{ id: "AC4-C12", odds: 0 }],
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”选择一个号码，“单号”中选择两个号码组成一注。",
                            classification: [{
                                    classificationNum: "二重号",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "单号",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        },
                        {
                            subName: "任四组选6",
                            shortName: "AC4-C6",
                            oddsArr: [{ id: "AC4-C6", odds: 0 }],
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”中选择两个号码组成一注。",
                            classification: [{
                                classificationNum: "二重号",
                                classificationArr: this.arrCreated(arr10),
                                option_slide_idx: null
                            }]
                        },
                        {
                            subName: "任四组选4",
                            shortName: "AC4-C4",
                            oddsArr: [{ id: "AC4-C4", odds: 0 }],
                            special: true,
                            optionSlide: true,
                            gameDes: "从万位、千位、百位、十位、个位中至少选择四个位置,从“三重号”中选择一个号码，“单号”中选择一个号码组成一注。",
                            classification: [{
                                    classificationNum: "三重号",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                },
                                {
                                    classificationNum: "单号",
                                    classificationArr: this.arrCreated(arr10),
                                    option_slide_idx: null
                                }
                            ]
                        }
                    ]
                }
            ],
            hookCheck: [], //万千百十个打勾组件
            scheme: 0, //万千百十个打勾组件
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
        hookCheckfunc: function(item) {
            this.hookCheck = item
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
                    v.sub.forEach(function(v1, i1) {
                        _t.renderdata(v.sub[i1].oddsArr);
                    })
                });
            }
            this.mask = false
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
        getQuantity(e, pos) {
            console.log("玩法id :" + e.id + "玩法号码 :" + e.playTypeS)
            switch (e.id) {

                case 'BSOE-F3': //前三大小单双
                case 'BSOE-L3': //后三大小单双
                case 'L3-P': //后三直选复式
                case 'F3-P': //前三直选复式
                    return pos[0].length * pos[1].length * pos[2].length;
                case 'L3-P-C': //后三组合
                case 'F3-P-C': //前三组合
                    return pos[0].length * pos[1].length * pos[2].length * 3;
                case 'F2-P-Sum': //前二直选和值
                    {
                        let count = 0;
                        let c = computeAllHeZhuCount(2)
                        pos[0].forEach(function(v) {
                            count += c[v];
                        })
                        return count;
                    }

                case 'L3-P-Sum': //后三直选和值
                case 'F3-P-Sum':
                    {
                        let count = 0;
                        let c = computeAllHeZhuCount(3)
                        pos[0].forEach(function(v) {
                            count += c[v];
                        })
                        return count;
                    }
                case 'F2-P-Diff':
                    {
                        let count = 0;
                        let c = computeAllKdZhuCount(2)
                        pos[0].forEach(function(v) {
                            count += c[v];
                        })
                        return count;
                    }
                case 'L3-P-Diff': //后三跨度
                case 'F3-P-Diff':
                    {
                        let count = 0;
                        let c = computeAllKdZhuCount(3)
                        pos[0].forEach(function(v) {
                            count += c[v];
                        })
                        return count;
                    }
                case 'F2-C':
                case 'Unfixed-F3x2':
                case 'Unfixed-L3x2':
                case 'Unfixed-F4x2':
                case 'Unfixed-L4x2':
                case 'Unfixed-N5x2':
                case 'x2':
                    {
                        return combination(pos[0].length, 2)
                    }
                case 'L3-C3': // 后三组三
                case 'F3-C3': //前三组三
                    {
                        return combination(pos[0].length, 2) * 2
                    }
                case 'L3-C6': // 后三组六
                case 'F3-C6': //前三组六
                case 'Unfixed-N5x3':
                    return combination(pos[0].length, 3)
                case 'F2-C-Sum':
                    {
                        let count = 0
                        let c = computeZxHeZhuCount(2);
                        pos[0].forEach(function(v) {
                            count += c[v];
                        })
                        return count;
                    }
                case 'L3-C-Sum': //后三组选和值
                case 'F3-C-Sum':
                    {
                        let count = 0;
                        let c = computeZxHeZhuCount(3);
                        pos[0].forEach(function(v) {
                            count += c[v];
                        })
                        return count
                    }
                case 'F2-C-Correct':
                    {
                        return pos[0].length * 9
                    }
                case 'L3-C-Correct': //后三组选包胆
                case 'F3-C-Correct':
                    {
                        return pos[0].length * 54;
                    }
                case 'F2-P':
                case 'N2-L2-P':
                case 'BSOE-F2': //前二大小单双
                case 'BSOE-L2':
                    {
                        return pos[0].length * pos[1].length;
                    }
                case 'Fixed-P': //定位胆
                case 'L3-Sum-DigitInOnes':
                case 'L3-S-Triple':
                case 'L3-S-Straight':
                case 'L3-S-Double':
                case 'F3-Sum-DigitInOnes':
                case 'F3-S-Triple':
                case 'F3-S-Straight':
                case 'F3-S-Double':
                case 'Unfixed-F3x1':
                case 'Unfixed-L3x1':
                case 'Unfixed-F4x1':
                case 'Unfixed-L4x1':
                case 'Unfixed-N5x1':
                    {
                        let count = 0;
                        for (let i = 0; i < pos.length; i++) {
                            count += pos[i].length;
                        }
                        return count;
                    }

                case 'N4-P': //四星复式
                    return pos[0].length * pos[1].length * pos[2].length * pos[3].length;
                case 'N5-P': //五星复式
                    return pos[0].length * pos[1].length * pos[2].length * pos[3].length * pos[4].length;
                case 'AC2-P':
                    {
                        let count = 0;
                        for (let i = 0; i < 5; i++) {
                            for (let j = i + 1; j < 5; j++) {
                                count += pos[i].length * pos[j].length
                            }
                        }
                        return count;
                    }
                case 'AC3-P':
                    {
                        let count = 0;
                        for (let i = 0; i < 5; i++) {
                            for (let j = i + 1; j < 5; j++) {
                                for (let k = j + 1; k < 5; k++) {
                                    count += pos[i].length * pos[j].length * pos[k].length
                                }
                            }
                        }
                        return count;
                    }
                case 'AC4-P':
                    {
                        let count = 0;
                        for (let i = 0; i < 5; i++) {
                            for (let j = i + 1; j < 5; j++) {
                                for (let k = j + 1; k < 5; k++) {
                                    for (let m = k + 1; m < 5; m++) {
                                        count += pos[i].length * pos[j].length * pos[k].length * pos[m].length
                                    }
                                }
                            }
                        }
                        return count;
                    }
                case 'AC2-P-Sum':
                case 'AC2-C':
                case 'AC2-C-Sum':
                    {
                        let _count = combination(this.hookCheck.length, 2) //方案數 = C 位置數 取二
                        let _ball = 0;
                        this.scheme = _count;

                        if (e.id == 'AC2-P-Sum') {
                            let c = computeAllHeZhuCount(2)
                            pos[0].forEach(function(v) {
                                _ball += c[v];
                            })
                        }
                        if (e.id == 'AC2-C') {
                            _ball = combination(pos[0].length, 2)
                        }
                        if (e.id == 'AC2-C-Sum') {
                            let c = computeZxHeZhuCount(2)
                            pos[0].forEach(function(v) {
                                _ball += c[v];
                            })
                        }
                        let count = _count * _ball;
                        return count
                    }
                case 'AC3-P-Sum':
                case 'AC3-C3':
                case 'AC3-C6':
                case 'AC3-C-Sum':
                    {
                        // let po0 = arr[0].length
                        let _count = combination(this.hookCheck.length, 3) //方案數 = C 位置數 取三
                        let _ball = 0
                        this.scheme = _count;

                        if (e.id == 'AC3-P-Sum') {
                            let c = computeAllHeZhuCount(3)
                            pos[0].forEach(function(v) {
                                _ball += c[v];
                            })
                        }
                        if (e.id == 'AC3-C3') {
                            _ball = combination(pos[1].length, 2) * 2
                        }
                        if (e.id == 'AC3-C6') {
                            _ball = combination(pos[1].length, 3)
                        }
                        if (e.id == 'AC3-C-Sum') {
                            let c = computeZxHeZhuCount(3)
                            pos[0].forEach(function(v) {
                                _ball += c[v];
                            })
                        }

                        let count = _count * _ball
                        return count;
                    }
                case 'AC4-C24':
                case 'AC4-C12':
                case 'AC4-C6':
                case 'AC4-C4':
                    {
                        let _count = combination(this.hookCheck.length, 4) //方案數 = C 位置數 取三
                        let _ball = 0
                        this.scheme = _count;

                        if (e.id == 'AC4-C24') {
                            _ball = combination(pos[0].length, 4)
                        }
                        if (e.id == 'AC4-C12') {
                            let balls0 = pos[0];
                            let balls1 = pos[1];
                            let quantity = 0;
                            for (let i = 0; i < balls0.length; i = i + 1) {
                                let isRepeat = false;
                                for (let j = 0; j < balls1.length; j = j + 1) {
                                    if (balls0[i] === balls1[j]) {
                                        isRepeat = true;
                                        break;
                                    }
                                }
                                if (isRepeat) {
                                    quantity += combination(balls1.length - 1, 2);
                                } else {
                                    quantity += combination(balls1.length, 2);
                                }
                            }
                            _ball = quantity
                        }
                        if (e.id == 'AC4-C6') {
                            _ball = combination(pos[0].length, 2)
                        }
                        if (e.id == 'AC4-C4') {
                            let balls0 = pos[0];
                            let balls1 = pos[1];
                            let quantity = 0;
                            for (let i = 0; i < balls0.length; i = i + 1) {
                                let isRepeat = false;
                                for (let j = 0; j < balls1.length; j = j + 1) {
                                    if (balls0[i] === balls1[j]) {
                                        isRepeat = true;
                                        break;
                                    }
                                }
                                if (isRepeat) {
                                    quantity += balls1.length - 1;
                                } else {
                                    quantity += balls1.length;
                                }
                            }
                            _ball = quantity
                        }
                        let count = _count * _ball
                        return count
                    }
                default:
                    return 1;
            }
        },
        //选取的号码
        checkNum(Arr, numidx) {
            let _t = this;
            this.forbet = [];
            let positions = ['', '', '', '', ''];
            let pos = [];
            let cnpos = [];
            let tplay = '';
            let g = this.gameMenu[this.offTitle].sub[this.OffSubTitle].classification
            let e = this.gameMenu[this.offTitle].sub[this.OffSubTitle].oddsArr[0]
            let numOfCheck = document.querySelectorAll('.playActive')
            if (e.playTypeS == 21 || e.playTypeS == 37 || e.playTypeS == 50 && numOfCheck.length > 0) { //包胆只能选一个号码
                Arr.forEach(function(v) { v.checked = false; })
            }
            if (numidx != undefined) { Arr[numidx].checked = !Arr[numidx].checked } //预防组件相冲
            for (let i = 0; i < g.length; i++) {
                let check = g[i].classificationArr.map(function(v) { if (v.checked) return v.play })
                if (this.offTitle == 1) { //大小单双  
                    cnpos[i] = check.filter(function(v) { return v != undefined }); //中文
                    for (let j = 0; j < check.length; j++) {
                        if (check[j] != undefined) { check[j] = ebsoe[j] } //中文置换代号
                    }
                }
                pos[i] = check.filter(function(v) { return v != undefined });
                if (pos[i].length > 0) {
                    if (this.offTitle == 1) tplay += g[i].classificationNum + ':' + cnpos[i].toString() + ' ';
                    else tplay += g[i].classificationNum + ':' + pos[i].toString() + ' ';
                }
                if (g[i].option_slide_idx == 5 && pos[i].length > 0) {
                    g[i].option_slide_idx = null
                }
            }

            let q = this.getQuantity(e, pos)
            // 豹子顺子对子系列
            if (e.playTypeS == 24 || e.playTypeS == 25 || e.playTypeS == 26 || e.playTypeS == 40 || e.playTypeS == 41 || e.playTypeS == 42) {
                pos = [];
            }
            // 任选系列加上打勾阵列
            if (e.playTypeS == 65 || e.playTypeS == 66 || e.playTypeS == 68 || e.playTypeS == 71 || e.playTypeS == 72 || e.playTypeS == 74 || e.playTypeS == 78 || e.playTypeS == 82 || e.playTypeS == 83 || e.playTypeS == 84 || e.playTypeS == 85) {
                pos.unshift(this.hookCheck)
            }
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
        rebatRate(nv, ov) {
            let _t = this;
            this.rebatRate = nv;
            //画面、阵列更新
            this.barrenderdata(this.gameMenu[this.offTitle].sub[this.OffSubTitle].oddsArr);

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

<style src="../k3/K3.css" scoped>

</style>
