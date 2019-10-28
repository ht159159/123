<template src="./linkMemberRegistered.html"></template>
<script>
export default {
  name: "linkMemberRegistered",
  data() {
    return {
      siteID: this.$global.siteID,
      childrenMemberData: {
        childLoginID: null,
        childLoginPW: null,
        confirmChildPW: null
      }
    };
  },
  methods: {
    createTeamAccount: function() {
      let t = this;
      let thisURL = window.location.href;
      let questionMark = thisURL.indexOf("?");
      let hashtag = thisURL.indexOf('#')
      let nextUrl = thisURL.substring(0,hashtag)+"#/agentCenter/linkManagement"
      let endSite = thisURL.length;
      let linkCode = thisURL.substring(questionMark + 1, endSite);
      console.log(linkCode);
      if (
        this.childrenMemberData.childLoginID == "" ||
        this.childrenMemberData.childLoginID == null ||
        this.childrenMemberData.childLoginPW == "" ||
        this.childrenMemberData.childLoginPW == null
      ) {
        alert("请输入账号密码");
        return;
      }
      if (
        this.childrenMemberData.childLoginPW ==
        this.childrenMemberData.confirmChildPW
      ) {
        var _parm = {
          siteID: this.siteID,
          code: linkCode,
          childLoginID: this.childrenMemberData.childLoginID,
          childLoginPW: this.childrenMemberData.childLoginPW
        };
        t.$axios("T7CreateChildQRCode", _parm, function(resp) {
          var json = JSON.parse(resp.data);
          if (json.error._error) {
            alert(json.error._error);
          } else {
            alert("开设成功");
            window.location.href=nextUrl
          }
        });
      } else {
        alert("密码与确认密码不符合");
        return;
      }
    }
  }
};
</script>
<style src="./linkMemberRegistered.css" scoped></style>