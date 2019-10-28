<script>
export default {
     props:{
         gameMenu:Array
     },
    data() {
        return {
            official: true,
            ylc: false,
            isShowFB: false,
            isshowPlayFb: false,
            offTitle: 0,
            OffSubTitle: 0,
            isCheck: "false",
        };

    },
    computed: {        
        
    },
    methods: {
        // 玩法弹窗开启
        IsShowFB() {
            if (this.isShowFB) {
                this.isShowFB = false;
                this.$store.dispatch("backGroundDontTouch",this.isShowFB);
                return;
            }
            this.isShowFB = true;

            this.$emit('childByValue')
            //回到顶部
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            this.$store.dispatch("backGroundDontTouch",this.isShowFB);
        },
        // 官方玩法与娱乐城玩法选择
        IsPlaySelect(PlaySelect) {
            if (PlaySelect == 'official') {
                this.official = true;
                this.ylc = false;
            } else if (PlaySelect == 'ylc') {
                this.official = false;
                this.ylc = true;
            }
        },
        // 官方玩法選擇
        clickOffical(idx, offidx) {
            this.offTitle = idx;
            this.OffSubTitle = offidx;
            //把值传出去给父组件
            this.$emit('clickOff', this.offTitle, this.OffSubTitle);
            this.isShowFB= false;
            this.$store.dispatch("backGroundDontTouch",this.isShowFB);
        },
        // 玩法说明弹窗开启
        showPlayFb(){
            if(this.isshowPlayFb){
                this.isshowPlayFb = false;
                this.$store.dispatch("backGroundDontTouch",this.isshowPlayFb);
                return;
            }
            this.isshowPlayFb = true;
            this.$store.dispatch("backGroundDontTouch",this.isshowPlayFb);
        },
    },
    mounted(){  
            //把值传出去给父组件
        this.$emit('clickOff', this.offTitle, this.OffSubTitle);
    }
}
</script>

<template src="./gameChoice.html">
    
</template>

<style src="./gameChoice.css" scoped>

</style>

