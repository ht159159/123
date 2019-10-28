<template src="./linkqrCode.html"></template>
<script>
import QRCode from "qrcodejs2";
import { Script } from "vm";
export default {
  name: "linkqrCode",
  data() {
    return {
      urlText: 0
    };
  },
  mounted() {
    this.Qrcode();
  },
  methods: {
    Qrcode() {
      let thisURL = window.location.href;
      let questionMark = thisURL.indexOf("?");
      let hashtag = thisURL.indexOf('#')
      let nextUrl = thisURL.substring(0,hashtag)+"#/agentCenter/linkMemberRegistered?"
      let endSite = thisURL.length;
      let linkCode = thisURL.substring(questionMark + 1, endSite);
      nextUrl = nextUrl+linkCode
      let qrcode = new QRCode("qrcode_box", {
        // width: 100, //二维码的宽度
        // height: 100, //二维码的高度
        text: nextUrl, // 二维码地址
        colorDark: "#000", //二维码颜色
        colorLight: "#fff" //二维码背景颜色
      });
    }
  }
};
</script>

<style src="./linkqrCode.css" scoped></style>
