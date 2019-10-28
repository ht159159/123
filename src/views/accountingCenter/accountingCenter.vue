<template src="./accountingCenter.html"></template>

<script>
export default {
  data() {
    return {
      account: [
        {
          optionFont: "投注报表",
          href: "/betReport",
          name: "betReportIconBg"
        },
        {
          optionFont: "存提报表",
          href: "/accountingCenter_depositReport",
          name: "depositReportIconBg"
        },
        {
          optionFont: "转帐报表",
          href: "/accountingCenter_transferReport",
          name: "transferReportIconBg"
        },
        {
          optionFont: "帐变报表",
          href: "/accountingCenter",
          name: "accountChangeIconBg"
        }
      ]
    };
  }
};
</script>

<style src="./accountingCenter.css"></style>