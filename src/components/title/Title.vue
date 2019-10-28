<template src="./Title.html"></template>
    
<script>
import { _getstatus } from "@/assets/src/forgame.js";
import { setTimeout } from "timers";
export default {
    name: "Title",
    props: {
        menu:Array
    },
    data() {
        return {
            sideBarSwitch: 0,
            sideGameType: 0,
            sideItemClicked: undefined,
            windowItemTitleNum: undefined,
            windowItemClicked: undefined,            
            mask: 0,
            noContent: "",
            refresh: 0,
            game: null,
      loginID: null,
      balance: null
        };
    },
    computed: {        
        isLogin() {
      this.loginID = this.$store.state.bet.loginID;
      this.balance = this.$store.state.balance;
            return this.$store.state.isLogin;
    }
        },
  created(){
        
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
                if (this.itemClicked == item) {
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
                    let margin = range * 6 + "vmax";
                    return "marginBottom:" + margin;
                }
            }
        },
        gamePage: function(router, item) {
            this.$router.push({
                path: "/" + router + "/" + item.routername + "/" + item.gameCode
            });
        },
        turnBack: function() {
            this.$router.go(-1);
        },       
        refreshbalance: function() {
            if (this.refresh == 1) {
                return;
            }
            this.refresh = 1;
            _getstatus(this);
            let _this = this;
            setTimeout(function() {
                 _this.refresh = 0;
            }, 2000);
        },
        searchStatusChange: function() {
            if(this.$store.state.searchStatus == false){
                this.$store.state.searchStatus= true
                this.$store.dispatch("setsearchStatus", this.$store.state.searchStatus)
            }else{
                this.$store.state.searchStatus= false
                this.$store.dispatch("setsearchStatus", this.$store.state.searchStatus)
            }
        }
    },
    watch: {        
        $route(to, from) {            
      this.sideBarSwitch = 0;
      this.mask = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Title.css" scoped>
</style>
