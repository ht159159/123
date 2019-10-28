<template src="./Promo.html"></template>

<script>
export default {
  name: "promo",
  data() {
    return {
      siteID:this.$global.siteID,
      promoContent: undefined,
      promoList:[]
    };
  },
  mounted(){
    let _this = this
    this.$axios('Promotion',{ siteID: this.siteID },function(resp){
      
      let json = JSON.parse(resp.data)
      _this.promoList = json.data
    })
  },
  watch:{
    promoContent(nv,ov){
      if(nv==undefined)this.$store.dispatch("backGroundDontTouch", false);
      else this.$store.dispatch("backGroundDontTouch", true);
    }
  }
};
</script>


<style src='./Promo.css'>
</style>
