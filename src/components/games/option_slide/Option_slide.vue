<script>
export default {
  props: {
    dataGroups: Array,
     _option_slide_idx:Number,
    sortIndex: Number
  },

  data() {
    return {
      //全大小单双清
      option_slide: ["全", "大", "小", "单", "双", "清"],
      optionSlideIdx: undefined,
    };
  },
  watch:{
    _option_slide_idx(nv){
      if(nv == null){
        this.optionSlideIdx = null;
      }
    }
  },
  methods: {
    //选择全大小单双清
    changeBgc(index, GameType) {
      // this.option_slide_checked = true;
      this.$emit('update:_option_slide_idx',index);
      switch (index) {
        //全
        case 0:
          for (let i = 0; i < GameType.length; i++) {
            GameType[i].checked = true;
          }
          break;
        //大
        case 1:
          for (let i = 0; i < GameType.length; i++) {
            GameType[i].checked = false;
            if (i >= Math.floor((GameType.length + 1) / 2)) {
              GameType[i].checked = true;
            }
          }
          break;
        //小
        case 2:
          for (let i = 0; i < GameType.length; i++) {
            GameType[i].checked = false;
            if (i < Math.floor((GameType.length + 1) / 2)) {
              GameType[i].checked = true;
            }
          }
          break;
        //单
        case 3:
          for (let i = 0; i < GameType.length; i++) {
            GameType[i].checked = false;            
            if (GameType[i].play % 2 != 0) {
              GameType[i].checked = true;
            }
          }
          break;
        //双
        case 4:
          for (let i = 0; i < GameType.length; i++) {
            GameType[i].checked = false;
            if (GameType[i].play % 2 == 0) {
              GameType[i].checked = true;
            }
          }
          break;
        //清
        case 5:
          for (let i = 0; i < GameType.length; i++) {
            GameType[i].checked = false;
          }
          break;
      }
      this.$parent.checkNum(GameType);
    }
  }
};
</script>

<template src='./option_slide.html'></template>

<style src='./option_slide.css' scoped>
</style>

