<template>
  <div class="content service">
    <iframe :src="src"></iframe>
     <div class="lds-spinner" v-show="mask">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="mask" v-show="mask"></div>
  </div>
</template>


<script>
export default {
  components: {},
  data(){
    return{
       src:'',
       mask:true
    }   
  },
  mounted() {  
    let _this = this
    this.$axios(
      "siteinfo",
      {
        siteID: this.$global.siteID
      },
      function(resp) {
        let res = JSON.parse(resp.data);        
        _this.src = res.info.serviceURL;
        _this.mask = false
      }
    );
  }
};
</script>

<style scoped>
iframe{
  width: 100%;
  height: 100%
}
</style>
