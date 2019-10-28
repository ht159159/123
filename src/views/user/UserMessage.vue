<template src="./UserMessage.html"></template>

<script>
export default {
  data() {
    return {
      siteID: this.$global.siteID,
      messageList: [],
      clickMsg: null,
      openStyle: {
        color: "#fff"
      }
    };
  },
  //點擊訊息
  methods: {
    msg(i) {
      this.clickMsg = i;
    }
  },
  mounted() {
    let _this = this;
    let _web = JSON.parse(this.getCookie("webs"));
    let loginID = _web.loginID;
    let Authorization = _web.Authorization;
    //會員訊息API
    this.$axios(
      "GetUserMessage",
      {
        jsonString: {
          siteID: this.siteID,
          loginID: loginID
        },
        token: Authorization
      },
      function(resp) {
        var res = JSON.parse(resp.data);
        var list = res.data;

        for (let i = 0; i < list.length; i++) {
          _this.messageList.push(list[i]);
        }
      }
    );
  }
};
</script>

<style src="./UserMessage.css"></style>