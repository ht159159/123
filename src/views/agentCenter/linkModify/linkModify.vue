<template src="./linkModify.html"></template>

<script>
export default {
  name: "linkMemberRegistered",
  data() {
    return {
      siteID: this.$global.siteID,
      loginID: this.$store.state.bet.loginID,
      urlMemberList: [],
      linkNum: null,
      linkStatus: false,
      linkStatusNum: null,
      linkStatusName: null
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
        let json = JSON.parse(resp.data);
        console.log(json);
        let thisURL = window.location.href;
        let questionMark = thisURL.indexOf("?");
        let endSite = thisURL.length;
        t.linkNum = thisURL.substring(questionMark + 1, endSite);
        t.urlMemberList = json.data[t.linkNum];
        t.linkStatusNum = json.data[t.linkNum].status;
        if (t.linkStatusNum == 0) {
          t.linkStatusName = "停用";
        } else {
          t.linkStatusName = "正常";
        }
      });
    },
    clickStatus: function(num) {
      let t = this;
      t.linkStatus = !t.linkStatus;
      if (num == 0) {
        t.linkStatusName = "停用";
        t.linkStatusNum = 0;
      } else {
        t.linkStatusName = "正常";
        t.linkStatusNum = 1;
      }
    },
    updateUrl: function() {
      let _webs = JSON.parse(this.getCookie("webs"));
      var parm = {
        jsonString: {
          siteID: this.siteID,
          loginID: this.loginID,
          uid: this.urlMemberList.uid,
          name: this.urlMemberList.name,
          status: this.linkStatusNum
        },
        token: _webs.Authorization
      };
      this.$axios("T7UpdateUrl", parm, function(resp) {
        var json = JSON.parse(resp.data);
        if (json.error._error) {
          alert(json.error._error);
        } else {
          alert("成功");
          let t = this;
          let thisURL = window.location.href;
          let hashtag = thisURL.indexOf("#");
          let nextUrl =
            thisURL.substring(0, hashtag) + "#/agentCenter/linkManagement";
          window.location.href = nextUrl;
        }
      });
    }
  }
};
</script>

<style src="./linkModify.css" scoped></style>