<template>
    <div id="app" :class="{'dontTouch':donotTouch}">
        <Title :menu="menu" />
        <router-view v-if="isRouterAlive" />
        <Footer v-if="$route.name != 'login'" />
    </div>
</template>

<script>
import Title from "@/components/title/Title.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
    components: {
        Footer,
        Title
    },
    data() {
        return {
            isRouterAlive: true,
            menu: [{
                    id: 0,
                    gameType: "官方玩法",
                    GT: "官",
                    router: 'official',
                    gameItem: [{
                            gameName: "时时彩",
                            src: require("@/assets/img/icon_index_hour.svg"),
                            srcOn: require("@/assets/img/icon_index_hour_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "十一选五",
                            src: require("@/assets/img/icon_index_11-5.svg"),
                            srcOn: require("@/assets/img/icon_index_11-5_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "低频彩",
                            src: require("@/assets/img/icon_index_low.svg"),
                            srcOn: require("@/assets/img/icon_index_low_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "六合彩",
                            src: require("@/assets/img/icon_index_6.svg"),
                            srcOn: require("@/assets/img/icon_index_6_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "赛车",
                            src: require("@/assets/img/icon_index_pk10.svg"),
                            srcOn: require("@/assets/img/icon_index_pk10_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "PC蛋蛋",
                            src: require("@/assets/img/icon_index_pcegg.svg"),
                            srcOn: require("@/assets/img/icon_index_pcegg_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "快三",
                            src: require("@/assets/img/icon_index_fastThree.svg"),
                            srcOn: require("@/assets/img/icon_index_fastThree_on.svg"),
                            sub: []
                        }
                    ]
                },
                {
                    id: 1,
                    gameType: "娛樂城玩法",
                    GT: "娱",
                    router: 'credit',
                    gameItem: [{
                            gameName: "时时彩",
                            src: require("@/assets/img/icon_index_hour.svg"),
                            srcOn: require("@/assets/img/icon_index_hour_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "赛车",
                            src: require("@/assets/img/icon_index_pk10.svg"),
                            srcOn: require("@/assets/img/icon_index_pk10_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "PC蛋蛋",
                            src: require("@/assets/img/icon_index_pcegg.svg"),
                            srcOn: require("@/assets/img/icon_index_pcegg_on.svg"),
                            sub: []
                        },
                        {
                            gameName: "快三",
                            src: require("@/assets/img/icon_index_fastThree.svg"),
                            srcOn: require("@/assets/img/icon_index_fastThree_on.svg"),
                            sub: []
                        }
                    ]
                }
            ],
        }
    }, 
    created() {
        window.scrollTo(0, 0);
        this.$socket.emit('join', { siteID: this.$global.siteID })
        if (this.getCookie("webs") == "") {
            var webs = {               
                loginID: null,
                balance: null,
                myip: null,
                Authorization: null,
                isMember: null,
                isTrial: null,
                memberID:null
            };
            this.setCookie("webs", JSON.stringify(webs), 0.5);
        } else {
            let {loginID,memberID,Authorization,balance} = JSON.parse(this.getCookie("webs"))     
                   
            if (loginID) { //更新vuex 状态
                this.$store.dispatch("updateloginID", loginID)
                this.$store.dispatch("setisLogin", true)
                this.$socket.emit('join', { siteID: this.$global.siteID ,memberID,token:Authorization})
            }
            if (balance)
                //更新vuex 状态
                this.$store.dispatch("updateBalance", balance)

        }

        this.axios.get("https://api.ipify.org?format=json").then(resp => {
            let _web = JSON.parse(this.getCookie("webs"))
            _web.myip = resp.data.ip;
            this.setCookie("webs", JSON.stringify(_web), 0.5);
        });

       

        //更新vuex 状态
        this.$store.dispatch("updateSiteID", this.$global.siteID)

        let _this = this;
        this.$axios("menu", { siteID: this.$global.siteID }, function(resp) {
            var res = JSON.parse(resp.data);
            var gamelist = res.data.filter(function(v) {
                return v.parent > 0;
            });

            var gamelistnorepeat = [];
            var h = {}; //定义一个hash表
            gamelist.forEach(function(v, i) {
                //这里是放不重复的array
                if (!h[v.gameID]) {
                    //存入hash表
                    h[v.gameID] = true;
                    //把当前数组元素存入到临时数组中
                    gamelistnorepeat.push(v);
                }
            });

            let menu = _this.menu
            let ssc = [],
                x115 = [],
                low = [],
                qxc = [],
                hk6 = [],
                pk10 = [],
                pc28 = [],
                k3 = []
            gamelistnorepeat.forEach(function(v, i) {
                if (v.gameType == 3) {
                    //ssc
                    ssc.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: 'ssc'
                    })
                }
                if (v.gameType == 5) {
                    //11x5
                    x115.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: '11x5'
                    })
                }
                if (v.gameType == 7) {
                    //low   
                    low.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: 'low'
                    })

                }
                if (v.gameType == 11) {
                    qxc.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: 'qxc'
                    })
                }

                if (v.gameType == 8) {
                    hk6.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: 'hk6'
                    })
                }
                if (v.gameType == 6) {
                    //pk10
                    pk10.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: 'pk10'
                    })

                }
                if (v.gameType == 9) {
                    pc28.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: 'bjkl8'
                    })
                }

                if (v.gameType == 4) {
                    k3.push({
                        subName: v.gameName,
                        gameCode: v.gameCode,
                        gameType: v.gameType,
                        routername: 'k3'
                    })
                }
            });
            menu[0].gameItem[0].sub = ssc
            menu[1].gameItem[0].sub = ssc
            menu[0].gameItem[1].sub = x115
            menu[0].gameItem[2].sub = low.concat(qxc)
            menu[0].gameItem[3].sub = hk6
            menu[0].gameItem[4].sub = pk10
            menu[1].gameItem[1].sub = pk10
            menu[0].gameItem[5].sub = pc28
            menu[1].gameItem[2].sub = pc28
            menu[0].gameItem[6].sub = k3
            menu[1].gameItem[3].sub = k3
            _this.menu = menu

        });
    },
    mounted() {

    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },       
    },
    computed: {
        donotTouch() {
            return this.$store.state.dontTouch
        }
    },
    watch: {
        '$route': {
            handler(to, from) {
                if (to.path.indexOf('official') > -1 || to.path.indexOf('credit') > -1) { //游戏页面处理

                    if (from.path == '/') { //有重整状况
                        to.meta.title = decodeURI(this.getCookie('currentGameName'))

                    } else {
                        this.menu[0].gameItem.forEach(function(e) {
                            let find = e.sub.find(function(i) {
                                return i.gameCode == to.params.id
                            })
                            if (find != undefined) {
                                to.meta.title = find.subName
                                return;
                            }
                        })
                    }


                    this.reload()
                }
            }


        }
    }
};
</script>

<style src="@/assets/css/reset.css">

</style>

<style src="@/assets/css/index.css">
#app {
    font-family: "Microsoft JhengHei","Heiti TC",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 9vmax;
}
</style>



