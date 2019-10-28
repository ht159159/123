<template src="./proxyCenter.html"></template>

<script>
export default {

    data() {
    return {
      proxy: [
        {
          optionFont: "团队管理",
          href: "/agentCenter/teamManagement",
          name: "teamManagementIconBg"
        },
        {
          optionFont: "链结管理",
          href: "/agentCenter/linkManagement",
          name: "linkManagementIconBg"
        },
        {
          optionFont: "团队总览",
          href: "/agentCenter/teamOverview",
          name: "teamOverviewIconBg"
        },
        {
          optionFont: "团队报表",
          href: "/accountingCenter",
          name: "teamReportIconBg"
        },
        {
          optionFont: "团队投注",
          href: "/accountingCenter",
          name: "teamBetIconBg"
        },
        {
          optionFont: "交易明细",
          href: "/accountingCenter",
          name: "transactionDetailsIconBg"
        }
      ]
    };
  }
}
</script>

<style src="./proxyCenter.css"></style>