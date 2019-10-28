<template src="./Index.html"></template>

<script>
// @ is an alias to /src
import Marquee from "@/components/Marquee.vue";
export default {
  name: "index",
  components: {
    Marquee
  },
  data() {
    return {
      mask: 0,
      siteID: this.$global.siteID,
      marqueelistTime: [],
      marqueelistNotice: [],
      notice: 0,
      messageSelected: undefined,
      gameType: 0,
      itemClicked: undefined,
      noContent: "yes",
      gameitem: [],
      game: this.$parent.menu,
      gameNav: 6,
      gameNavType: {
        d0: [],
        d1: [],
        d2: [],
        d10: [],
        d13: []
      }
    };
  },
  mounted() {
    let t = this;
    let _parm = { siteID: this.siteID };
    this.$axios("marquee", _parm, function(resp) {
      let json = JSON.parse(resp.data);
      json.data.forEach(function(v) {
        t.marqueelistNotice.push(v.title + ":" + v.content);
        let msgTime = v.msgTime.slice(0, 16).replace("T", " ");
        t.marqueelistTime.push(msgTime);
      });
    });
    this.platformList();
  },
  methods: {
    changeGameType: function(changeType, gameType) {
      if (gameType == "gameType") {
        this.gameType = changeType;
      } else if (gameType == "sideGameType") {
        this.sideGameType = changeType;
      }
      this.itemClicked = undefined;
      this.sideItemClicked = undefined;
    },
    itemClick: function(item, type) {
      if (type == "index") {
        if (item == this.itemClicked) {
          this.itemClicked = undefined;
          return;
        }
        this.itemClicked = item;
      }
      if (type == "side") {
        if (item == this.sideItemClicked) {
          this.sideItemClicked = undefined;
          return;
        }
        this.sideItemClicked = item;
      }
    },
    footerOnIMG: function(index) {
      if (this.footer[index].alias == this.webName) {
        let footerActiveIMG = this.footer[index].src.split(".");
        let footerActiveIMG_new =
          footerActiveIMG[0] + "_on." + footerActiveIMG[1];
        return footerActiveIMG_new;
      }
      return this.footer[index].src;
    },
    test: function(item) {
      if (this.itemClicked == item) {
        let num = this.game[this.gameType].gameItem[item].sub.length;
        let range = Math.ceil(num / 2);
        if (range == 0) {
          this.noContent = "no";
        } else {
          this.noContent = "yes";
          let margin = range * 6.4 + "vmax";
          return "marginBottom:" + margin;
        }
      }
    },
    clickGameType: function(num) {
      this.gameNav = num;
    },
    platformList: function() {
      let t = this;
      let _parm = { siteID: this.siteID };
      let d1 = [];
      let d2 = [];
      let d10 = [];
      let d13 = [];
      let gameID;
      let d0 = [];
      function overviewgamelist(
        parent,
        spID,
        gameType,
        status,
        spNameUS,
        spNameCN,
        spOrder
      ) {
        var parm = {
          siteID: this.siteID,
          platform: parent
        };
        this.$axios("overviewgamelist", parm, function(data) {
          var json = $.parseJSON(data);
          gameID = json.data;
          live(spID, parent, gameType, status, spNameUS, spNameCN, spOrder);
        });
      }
      function live(
        spID,
        parent,
        gameType,
        status,
        spNameUS,
        spNameCN,
        spOrder
      ) {
        switch (gameType) {
          case 2:
            if (gameID.length == 0) {
              d2.push({
                spid: spID,
                gameID: "",
                parent: parent,
                gameType: gameType,
                status: status,
                spNameUS: spNameUS,
                spNameCN: spNameCN,
                spOrder: spOrder
              });
            }
            for (i = 0; i < gameID.length; i++) {
              if (gameID[i].spID == spID && gameID[i].platformType == parent) {
                d2.push({
                  spid: spID,
                  gameID: gameID[i].gameID,
                  parent: parent,
                  gameType: gameType,
                  status: status,
                  spNameUS: spNameUS,
                  spNameCN: spNameCN,
                  spOrder: spOrder
                });
                return false;
              }
            }
            break;
          case 10:
            if (gameID.length == 0) {
              d10.push({
                spid: spID,
                gameID: "",
                parent: parent,
                gameType: gameType,
                status: status,
                spNameUS: spNameUS,
                spNameCN: spNameCN,
                spOrder: spOrder
              });
            }
            for (i = 0; i < gameID.length; i++) {
              if (gameID[i].spID == spID && gameID[i].platformType == parent) {
                d10.push({
                  spid: spID,
                  gameID: gameID[i].gameID,
                  parent: parent,
                  gameType: gameType,
                  status: status,
                  spNameUS: spNameUS,
                  spNameCN: spNameCN,
                  spOrder: spOrder
                });
                return false;
              }
            }
            break;
        }
        t.gameNavType.d2 = d2;
        t.gameNavType.d10 = d10;
      }
      this.$axios("SitePlatformList", _parm, function(resp) {
        let json = JSON.parse(resp.data);
        let i;
        for (i = 0; i < json.data.length; i++) {
          switch (json.data[i].gameType) {
            case 0:
              break;
            case 1:
              json.data[i].spNameUS = json.data[i].spNameUS.replace(/\s+/g, "");
              d1.push({
                spid: json.data[i].spID,
                parent: json.data[i].parent,
                gameType: json.data[i].gameType,
                status: json.data[i].status,
                spNameUS: json.data[i].spNameUS,
                spNameCN: json.data[i].spNameCN,
                spOrder: json.data[i].spOrder,
                gameNavTypeImgUrl:
                  "https://image.aliapple.net/images//platforms/logo/" +
                  json.data[i].spID +
                  ".png"
              });
              break;
            case 2:
              break;
            case 10:
              break;
            case 13:
              json.data[i].spNameUS = json.data[i].spNameUS.replace(/\s+/g, "");
              d13.push({
                spid: json.data[i].spID,
                parent: json.data[i].parent,
                gameType: json.data[i].gameType,
                status: json.data[i].status,
                spNameUS: json.data[i].spNameUS,
                spNameCN: json.data[i].spNameCN,
                spOrder: json.data[i].spOrder,
                gameNavTypeImgUrl:
                  "https://image.aliapple.net/images//platforms/logo/" +
                  json.data[i].spID +
                  ".png"
              });
              break;
            default:
              break;
          }
        }
        t.gameNavType.d1 = d1;
        t.gameNavType.d13 = d13;
      });
    }
  }
}

</script>

<style src="./Index.css"></style>