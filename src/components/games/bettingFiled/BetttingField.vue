<script>
import { _betting } from "@/assets/src/forgame.js";
import { setInterval, clearInterval } from 'timers';

export default {
    props: {
        barMax: Number,
        forbet: Array,
        quantity: Number,
        rate: Number,
        time: Object,
        issueTrace: Boolean
    },
    data() {
        return {
            unitPrice: 2,
            barValue: 0,
            detailData: {
                play: '',
                name: '',
            },
            // 购物车测试用
            orderDetail: [],
            betSubInfo: [],
            panko: this.$store.state.panko,
            openPage: true,
            openSlide: false, //是否追單
            WinningStop: false, //中獎停止
            ChasingCondition: false, //追號條件
            WinorLose: false, // 贏or輸
            acLimit: 0,
            issueCount: 3, //追號期數           
            double: 1, //倍率
            isshowdDetailFb: false, //详细下注弹窗是否开启 
            mask: true,
            bettingmsg: false,
            warningOpen: false, //alert warning 弹窗
            successOpen:false,
            alertMsg:null,
            closemsg: false, //封盘显示弹窗
            closesecond: 5, //秒数自动关闭
            closetimer:null // timer
        };
    },
    methods: {
        alert(msg){
            this.alertMsg = msg
            this.warningOpen = true
        },
        alertSuc(msg){
            this.alertMsg = msg
            this.successOpen = true
        },
        betting() { //立即下注
            let _summaryAmt = 0;
            let _betMainInfo = [];
            let bet = this.forbet
            if (this.forbet.length == 0) {
                this.alert('请选择一注')
                return;
            }
            bet.forEach(e => {
                let b = e.betMainInfo
                b.unitPrice = parseInt(this.unitPrice); //写入单价
                _summaryAmt += parseInt(b.unitPrice) * parseInt(b.quantity); //计算总额
                _betMainInfo.push(b)

            });

            //更新vuex 状态
            this.$store.dispatch("setbetMainInfo", _betMainInfo)
            this.$store.dispatch('updatesummaryAmt', _summaryAmt)
            this.$store.dispatch("setbetSubInfo", this.betSubInfo);

            this.bettingmsg = true
            _betting(this)

        },
        openshopcar() {
            if (this.sumcount == 0) {
                this.alert('购物车是空的')
                return;
            }
            this.openPage = !this.openPage
        },
        toshopcar() {
            if (this.forbet.length == 0) {
                this.alert('请选择一注')
                return;
            }

            this.forbet.forEach(e => {
                e.betMainInfo.unitPrice = parseInt(this.unitPrice); //写入单价                 
                this.orderDetail.push(e)
            });

            this.$parent.childByValue()
            this.alertSuc('已加入购物篮')
        },
        shopbet() {
            let _betMainInfo = []
            this.orderDetail.forEach(function(v, i) {
                _betMainInfo.push(v.betMainInfo)
            })
            if (this.issueTrace) { //有追號
                let bet = this.$store.state.bet

                bet.preOrder = true;
                bet.autoCancel = this.WinningStop ? 1 : 0
                bet.aclSign = this.ChasingCondition ? 1 : 0

                if (this.ChasingCondition)
                    bet.acLimit = this.acLimit
                bet.issueNoCount = this.betSubInfo.length
                bet.summaryAmt = this.summary
                bet.betMainInfo = _betMainInfo
                bet.betSubInfo = this.betSubInfo

                this.$store.dispatch("updateBet", bet)

            } else { //無追號

                //更新vuex 状态
                this.$store.dispatch("setbetMainInfo", _betMainInfo)
                this.$store.dispatch('updatesummaryAmt', this.summary)
                this.$store.dispatch("setbetSubInfo", this.betSubInfo);
            }
            this.bettingmsg = true
            _betting(this)
        },
        removeItem(uid) {
            let bet = this.orderDetail.filter(function(v, i) {
                return v.uid != uid
            })
            this.orderDetail = bet
        },
        init() {
            this.$parent.childByValue()
            this.$parent.bundledatainit()
            this.orderDetail = []
            this.betMainInfo = []
            this.openPage = true
            this.openSlide = false
            this.double = 1
            this.bettingmsg = false
            //状态初始
            let bet = this.$store.state.bet
            bet.issueNoCount = 1
            bet.summaryAmt = 0
            bet.preOrder = false
            bet.betMainInfo = []
            bet.betSubInfo = [{ issueNo: this.$store.state.panko.openissueNo, multiple: 1 }]
            this.$store.dispatch("updateBet", bet)
        },
        setbetSubInfo() {
            if (this.openSlide) {
                let t = this
                let arr = []
                this.$store.state.issueNoTrace.filter(function(v, i) {
                    if (i < t.issueCount) arr.push({ issueNo: v.issueNo, multiple: 1 })
                })
                this.betSubInfo = arr
            } else
                this.betSubInfo = [{ issueNo: this.$store.state.panko.openissueNo, multiple: 1 }]
        },
        // 详细下注资讯
        showDetail(play, name) {
            this.isshowdDetailFb = true;
            this.detailData.play = play;
            this.detailData.name = name;
        },
        checkunitPrice() {            
            if (this.unitPrice == '' ||  parseInt(this.unitPrice) <1) this.unitPrice = 1          
        },     
        timer(){ //封盘显示timer
            this.closetimer = setInterval(()=>{
                this.closesecond--                
                if(this.closesecond==0){
                    this.stoptimer()
                    this.closemsg=false
                }
            },1000)
        },
        stoptimer(){
            clearInterval(this.closetimer)
            this.closesecond=5
        },
        
    },
    watch: {
        barValue(nv, ov) {
            this.$emit('update:rate', parseFloat(nv));
        },
        issueCount(nv, ov) {
            if (nv > this.maxIssueCount) {
                this.issueCount = this.maxIssueCount
                this.alert('最大追单期数:' + this.maxIssueCount)
            } else if (nv < 1) {
                this.issueCount = 1
            }
            this.double = 1
            this.setbetSubInfo()
        },
        openSlide(nv, ov) {
            this.setbetSubInfo()
        },
        double(nv, ov) {
            if (nv < 1) this.double = 1

            for (let i = 0; i < this.betSubInfo.length; i++) {
                this.betSubInfo[0].multiple = 1
                if (i > 0)
                    this.betSubInfo[i].multiple = this.betSubInfo[i - 1].multiple * this.double
            }
        },
        rate(nv, ov) {
            this.barValue = nv
        },
        '$store.state.panko': {
            handler(nv, ov) {
                this.betSubInfo = new Array({ issueNo: this.$store.state.panko.openissueNo, multiple: 1 })
            },
            deep: true
        },
        closemsg(nv, ov) {
            if (nv == true) {
                this.timer()               
            }
        },
        
    },
    computed: {
        balance() {
            return this.$store.state.balance;
        },
        sumcount() {
            let sum = 0;
            this.orderDetail.forEach(function(v, i) {
                sum += v.betMainInfo.quantity
            })
            return sum
        },
        summary() {
            let summary = 0;
            this.orderDetail.forEach(function(v, i) {
                summary += v.betMainInfo.quantity * v.betMainInfo.unitPrice
            })
            let multiple = 0
            this.betSubInfo.forEach(function(v, i) {
                multiple += isNaN(parseInt(v.multiple)) ? 0 : parseInt(v.multiple)
            })

            return summary * multiple
        },
        maxIssueCount() {
            return this.$store.state.issueNoTrace.length
        }
    }
};
</script>

<template src="./bettingField.html">
    
</template>

<style src="./bettingField.css" scoped>

</style>