import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index/Index.vue";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/login/login.vue")
    },
    {
      path: "/index",
      name: "index",
      component: Index
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/login/login.vue")
    },
    {
      path: "/promo",
      name: "promo",
      meta: {
        title: "优惠活动"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/promo/Promo.vue")
    },
    {
      path: "/user",
      name: "user",
      meta: {
        title: "会员中心",
        needLogin: true
      },
      children: [
        {
          path: "/user/changePassword",
          name: "changePassword",
          meta: {
            title: "修改密码"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/ChangePassword.vue")
        },
        {
          path: "/user/changeWithdrawPassword",
          name: "changeWithdrawPassword",
          meta: {
            title: "修改提款密码"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/ChangeWithdrawPassword.vue")
        },
        {
          path: "/user/bindingBankCard",
          name: "bindingBankCard",
          meta: {
            title: "绑定银行卡"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/BindingBankCard.vue")
        },
        {
          path: "/user/withdraw",
          name: "withdraw",
          meta: {
            title: "提现"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/Withdraw.vue")
        },
        {
          path: "/user/record",
          name: "record",
          meta: {
            title: "充提记录"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/Record.vue")
        },
        {
          path: "/user/betRecord",
          name: "betRecord",
          meta: {
            title: "个人投注"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/BetRecord.vue")
        }, {
          path: "/user/userMessage",
          name: "userMessage",
          meta: {
            title: "个人讯息"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/UserMessage.vue")
        }, {
          path: "/user/UserWalletTransfer",
          name: "UserWalletTransfer",
          meta: {
            title: "额度转换"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/UserWalletTransfer.vue")
          ,
        },
        {
          path: "/user/UserWalletTransfer/UserWalletTransferAccountType",
          name: "UserWalletTransferAccountType",
          meta: {
            title: "帐户类型修改"
          },
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/user/UserWalletTransferAccountType.vue")
        }
        
      ],

      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/user/User.vue")
    },
    {
      path: "/recharge",
      name: "recharge",
      props: true,
      meta: {
        title: "充值",
        needLogin: true
      },
      children: [
        {
          path: "/recharge/transfer",
          name: "transfer",
          meta: {
            title: "充值"
          },
          component: () => import(/* webpackChunkName: "about" */ "./views/recharge/RechargeTransfer.vue"),
          props: true,
        },

      ],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/recharge/Recharge.vue")
    },
    {
      path: "/service",
      name: "service",
      meta: {
        title: "客服"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Service.vue")
    },
    {
      path: "/accountingCenter",
      name: "accountingCenter",
      meta: {
        title: "帐务中心"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/accountingCenter/accountingCenter.vue")
    },
    {
      path: "/betReport",
      name: "betReport",
      meta: {
        title: "投注報表"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/accountingCenter/betReport.vue")
    },
    {
      path: "/accountingCenter_depositReport",
      name: "accountingCenter_depositReport",
      meta: {
        title: "存提报表"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/accountingCenter/accountingCenter_depositReport.vue")
    },
    {
      path: "/accountingCenter_transferReport",
      name: "accountingCenter_transferReport",
      meta: {
        title: "转帐报表"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/accountingCenter/accountingCenter_transferReport.vue")
    },
    {
      path: "/proxyCenter",
      name: "proxyCenter",
      meta: {
        title: "代理中心"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/proxyCenter/proxyCenter.vue")
    },
    {
      path: "/resultRecord",
      name: "resultRecord",
      meta: {
        title: "开奖记录",
        needLogin: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/resultRecord/ResultRecord.vue")
    },
    {
      path: "/official/hk6/:id",
      name: "hk6",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/official/hk6/Hk6.vue")
    },
    {
      path: "/official/k3/:id",
      name: "k3",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/official/k3/K3.vue")
    },
    {
      path: "/credit/k3/:id",
      name: "k3",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/credit/k3/k3.vue")
    },
    {
      path: "/official/pk10/:id",
      name: "pk10",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () => import(/* webpackChunkName: "about" */ "./pages/official/pk10/pk10.vue")
    },
    {
      path: "/credit/pk10/:id",
      name: "pk10",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () => import(/* webpackChunkName: "about" */ "./pages/credit/pk10/pk10.vue")
    },
    {
      path: "/official/ssc/:id",
      name: "ssc",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/official/ssc/SSC.vue")
    },
    {
      path: "/credit/ssc/:id",
      name: "ssc",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/credit/ssc/SSC.vue")
    },
    {
      path: "/official/bjkl8/:id",
      name: "bjkl8",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/official/bjkl8/bjkl8.vue")
    },
    {
      path: "/credit/bjkl8/:id",
      name: "bjkl8",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/credit/bjkl8/bjkl8.vue")
    },
    {
      path: "/official/qxc/:id",
      name: "qxc",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/official/qxc/qxc.vue")
    },
    {
      path: "/official/low/:id",
      name: "low",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/official/low/low.vue")
    },
    {
      path: "/official/11x5/:id",
      name: "11x5",
      meta: {
        title: "",
        needLogin: true,
        titleMenu: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/official/11x5/11x5.vue")
    },
    {
      path: "/slot/cq9/CQ9Slot",
      name: "CQ9Slot",
      meta: {
        title: "CQ9电子"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/slot/cq9/CQ9Slot.vue")
    },
    {
      path: "/d13/CQ9FISH",
      name: "CQ9FISH",
      meta: {
        title: "CQ9捕鱼"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/d13/cq9/CQ9FISH.vue")
    },
    {
      path: "/d13/LEGaming",
      name: "LEGaming",
      meta: {
        title: "乐游棋牌"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/d13/leg/LEGaming.vue")
    },
    {
      path: "/agentCenter/teamManagement",
      name: "teamManagement",
      meta: {
        title: "团队管理"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/teamManagement/teamManagement.vue")
    },
    {
      path: "/agentCenter/linkManagement",
      name: "linkManagement",
      meta: {
        title: "链结管理"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/linkManagement/linkManagement.vue")
    },
    {
      path: "/agentCenter/registered",
      name: "registered",
      meta: {
        title: "新增会员"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/registered/registered.vue")
    },
    {
      path: "/agentCenter/linkRegistered",
      name: "linkRegistered",
      meta: {
        title: "链结注册"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/linkRegistered/linkRegistered.vue")
    },
    {
      path: "/agentCenter/linkMemberRegistered",
      name: "linkMemberRegistered",
      meta: {
        title: "团队注册"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/linkMemberRegistered/linkMemberRegistered.vue")
    },
    {
      path: "/agentCenter/linkqrCode",
      name: "linkqrCode",
      meta: {
        title: "链结二维条码"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/linkqrCode/linkqrCode.vue")
    },
    {
      path: "/agentCenter/linkModify",
      name: "linkModify",
      meta: {
        title: "链结修改"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/linkModify/linkModify.vue")
    },
    {
      path: "/agentCenter/teamOverview",
      name: "teamOverview",
      meta: {
        title: "团队总览"
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/agentCenter/teamOverview/teamOverview.vue")
    }
  ]
});
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

router.beforeEach((to, from, next) => {
  //全局钩子函数
  document.documentElement.scrollTop = 0;
  to.matched.some(route => {
    // to.matched.forEach((route) => {
    if (route.meta.needLogin) {
      //通过此操作可以判断哪些页面需要登录
      let auth = JSON.parse(getCookie("webs")).Authorization

      if (auth != null && auth != '') {
        next();
        window.scrollTo(0, 0);
      } else {
        alert("请先登入");
        next({ name: "login" });
      }
    } else {
      next();
      window.scrollTo(0, 0);
    }
  });
});

export default router;
