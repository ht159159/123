<template src="./linkManagement.html"></template>

<script>
export default {
  name: "linkManagement",
  data() {
    return {
      siteID: this.$global.siteID,
      loginID: this.$store.state.bet.loginID,
      urlMemberList: []
    };
  },
  mounted() {
    this.urlList();
  },
  methods: {
    urlList: function() {
      let t = this;
      let _webs = JSON.parse(this.getCookie("webs"));
      let _parm = {
        jsonString: {
          siteID: t.siteID,
          loginID: t.loginID
        },
        token: _webs.Authorization
      };
      t.$axios("T7UrlList", _parm, function(resp) {
        var json = JSON.parse(resp.data);
        console.log(json);
        t.urlMemberList = json.data;
      });
    },
    urlCreatePage: function(code) {
      let thisURL = window.location.href;
      let hashtag = thisURL.indexOf("#");
      let nextUrl =
        thisURL.substring(0, hashtag) +
        "#/agentCenter/linkMemberRegistered?" +
        code;
      window.location.href = nextUrl;
    },
    copylink: function(code) {
      const input = document.querySelector("#js-copyURL");
      let thisURL = window.location.href;
      let hashtag = thisURL.indexOf("#");
      let nextUrl =
        thisURL.substring(0, hashtag) +
        "#/agentCenter/linkMemberRegistered?" +
        code;
      input.setAttribute("value", nextUrl);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        alert("复制成功");
      }
    },
    openqrCode: function(code) {
      let thisURL = window.location.href;
      let hashtag = thisURL.indexOf("#");
      let nextUrl =
        thisURL.substring(0, hashtag) + "#/agentCenter/linkqrCode?" + code;
      window.location.href = nextUrl;
    },
    linkModify: function(Index) {
      let thisURL = window.location.href;
      let hashtag = thisURL.indexOf("#");
      let nextUrl =
        thisURL.substring(0, hashtag) + "#/agentCenter/linkModify?" + Index;
      window.location.href = nextUrl;
    }
  }
};
</script>

<style src="./linkManagement.css" scoped></style>