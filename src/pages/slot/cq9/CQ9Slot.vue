<template src="./CQ9Slot.html"></template>

<script>
export default {
  name: "cq9Slot",
  data() {
    return {
      siteID: this.$global.siteID,
      gamedata: [],
      hotGameData: [],
      topGameData: [],
      gameSelect: 0,
      platform: 43,
      searchStatus: false,
      searchText: ""
    };
  },
  mounted() {
    let t = this;
    let _webs = JSON.parse(this.getCookie("webs"));
    let gamedata = [];
    let hotGame = [];
    let topGame = [];
    let _parm = { siteID: this.siteID, platform: this.platform };
    let _parmRecommendGame = { siteID: this.siteID };
    let _parmTopGame = {
      siteID: this.siteID,
      loginID: this.$store.state.bet.loginID,
      token: _webs.Authorization
    };
    this.$axios("OverviewGameList", _parm, function(resp) {
      let json = JSON.parse(resp.data);
      let i;
      for (i = 0; i < json.data.length; i++) {
        gamedata.push({
          spid: json.data[i].spID,
          gameName: json.data[i].gameName,
          gameID: json.data[i].gameID,
          platformType: json.data[i].platformType,
          GameImgUrl:
            "https://image.aliapple.net/images/games/" +
            json.data[i].platformType +
            "/" +
            json.data[i].gameID +
            ".png"
        });
      }
      t.gamedata = gamedata;
    });
    this.$axios("RecommendGameList", _parmRecommendGame, function(resp) {
      let json = JSON.parse(resp.data);
      let i;
      for (i = 0; i < json.data.length; i++) {
        if (json.data[i].spID == 44) {
          hotGame.push({
            spid: json.data[i].spID,
            gameName: json.data[i].gameNameCN,
            gameID: json.data[i].gameID,
            mspID: json.data[i].mspID,
            GameImgUrl:
              "https://image.aliapple.net/images/games/" +
              json.data[i].mspID +
              "/" +
              json.data[i].gameID +
              ".png"
          });
        }
        t.hotGameData = hotGame;
      }
    });
    this.$axios("TopGame", _parmTopGame, function(resp) {
      let json = JSON.parse(resp.data);
      console.log(json);
      let i;
      for (i = 0; i < json.data.length; i++) {
        if (json.data[i].spID == 44) {
          topGame.push({
            spid: json.data[i].spID,
            gameName: json.data[i].gameNameCN,
            gameID: json.data[i].gameID,
            mspID: json.data[i].mspID,
            GameImgUrl:
              "https://image.aliapple.net/images/games/" +
              json.data[i].mspID +
              "/" +
              json.data[i].gameID +
              ".png"
          });
        }
      }
      t.topGameData = topGame;
    });
  },
  methods: {
    selectGame: function(num) {
      this.gameSelect = num;
    },
    clickgame: function(gameID) {
      let _webs = JSON.parse(this.getCookie("webs"));
      let _parm = {
        siteID: this.siteID,
        loginID: this.$store.state.bet.loginID,
        platform: this.platform,
        gameID: gameID,
        token: _webs.Authorization
      };
      this.$axios("GameGateway", _parm, function(resp) {
        let json = JSON.parse(resp.data);
        if (json.error._error) {
          alert(json.error._error);
          return;
        }
        window.open(json.info.openGameUrl);
      });
    }
  },
  computed: {
    searchFun() {
      this.searchStatus = this.$store.state.searchStatus;
      return this.searchStatus;
    },
    searchDataFun() {
      let searchText = this.searchText;
      let searchData = this.gamedata;
      let searchGameData = [];
      if (searchText != "") {
        let i;
        for (i = 0; i < searchData.length; i++) {
          if (searchData[i].gameName.indexOf(searchText) != -1) {
            searchGameData.push({
              spid: searchData[i].spid,
              gameName: searchData[i].gameName,
              gameID: searchData[i].gameID,
              platformType: searchData[i].platformType,
              GameImgUrl:
                "https://image.aliapple.net/images/games/" +
                searchData[i].platformType +
                "/" +
                searchData[i].gameID +
                ".png"
            });
          }
        }
      } else {
        searchGameData = this.gamedata;
      }
      return searchGameData;
    },
    searchHotFun() {
      let searchText = this.searchText;
      let searchData = this.hotGameData;
      let searchGameData = [];
      if (searchText != "") {
        let i;
        for (i = 0; i < searchData.length; i++) {
          if (searchData[i].gameName.indexOf(searchText) != -1) {
            searchGameData.push({
              spid: searchData[i].spid,
              gameName: searchData[i].gameName,
              gameID: searchData[i].gameID,
              mspID: searchData[i].mspID,
              GameImgUrl:
                "https://image.aliapple.net/images/games/" +
                searchData[i].mspID +
                "/" +
                searchData[i].gameID +
                ".png"
            });
          }
        }
      } else {
        searchGameData = this.hotGameData;
      }
      return searchGameData;
    },
    searchTopFun() {
      let searchText = this.searchText;
      let searchData = this.topGameData;
      let searchGameData = [];
      if (searchText != "") {
        let i;
        for (i = 0; i < searchData.length; i++) {
          if (searchData[i].gameName.indexOf(searchText) != -1) {
            searchGameData.push({
              spid: searchData[i].spid,
              gameName: searchData[i].gameName,
              gameID: searchData[i].gameID,
              mspID: searchData[i].mspID,
              GameImgUrl:
                "https://image.aliapple.net/images/games/" +
                searchData[i].mspID +
                "/" +
                searchData[i].gameID +
                ".png"
            });
          }
        }
      } else {
        searchGameData = this.topGameData;
      }
      return searchGameData;
    }
  }
};
</script>
<style src="./cq9.css" scoped>
</style>
