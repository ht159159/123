<script>
export default {
  props: {
    dataGroups:Array,
    scheme:Number,
  },

  data() {
    return {
      hookCheck:[],
      hkk:"test",
    };
  },
  watch:{
    hookCheck(){
      this.$emit('hook',this.hookCheck);
      this.$parent.checkNum(this.dataGroups);
    }
  },
  methods: {
    
  }
};
</script>

<template src='./special.html'></template>

<style src='./special.css' scoped>
</style>

